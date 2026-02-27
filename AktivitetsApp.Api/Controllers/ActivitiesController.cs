using AktivitetsApp.Api.DTOs;
using AktivitetsApp.Domain.Entities;
using AktivitetsApp.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace AktivitetsApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
	private readonly AppDbContext _db;

	public ActivitiesController(AppDbContext db)
	{
		_db = db;
	}

	// GET /api/activities?search=...&category=...
	[HttpGet]
	public async Task<ActionResult<List<ActivityDto>>> GetAll([FromQuery] string? search, [FromQuery] string? category)
	{
		var q = _db.Activities
			.AsNoTracking()
			.Include(m => m.Members)
			.AsQueryable();

		if (!string.IsNullOrWhiteSpace(search))
		{
			var s = search.Trim().ToLower();

			q = q.Where(a =>
			a.Title.ToLower().Contains(s) ||
			a.Location.ToLower().Contains(s));

		}


		if (!string.IsNullOrWhiteSpace(category) && category != "Alla")
		{
			var c = category.Trim();
			q = q.Where(a => a.Category == c);
		}

		var items = await q
			.OrderBy(a => a.Date)
			.ThenBy(a => a.Time)
			.ToListAsync();

		return items.Select(ToDto).ToList();
	}

	//GET /api/activities
	[HttpPost]
	public async Task<ActionResult<ActivityDto>> Create([FromBody] CreateActivityRequest req)
	{
		if (req.maxParticipants <= 0)
		{
			return BadRequest("maxParticipants must be >0");
		}

		if (!DateOnly.TryParseExact(req.date, "yyyy-MM--dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
		{
			return BadRequest("date must be in format yyyy-");
		}

		if (!TimeOnly.TryParseExact(req.time, "HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out var time))
		{
			return BadRequest("time must be in format HH:mm");
		}
		if (req.lat < -90 || req.lat > 90) return BadRequest("lat must be between -90 and 90");
		if (req.lng < -180 || req.lng > 180) return BadRequest("lng must be between -180 and 180");

		// (Valfritt) verifiera att createdByUserId finns
		if (req.createdByUserId is int userId)
		{
			var exists = await _db.Users.AnyAsync(u => u.Id == userId);
			if (!exists) return BadRequest("createdByUserId does not exist");
		}

		var activity = new Activity
		{
			Title = req.title,
			Category = req.category,
			Location = req.location,
			Date = date,
			Time = time,
			MaxParticipants = req.maxParticipants,
			Lat = (decimal)req.lat,
			Lng = (decimal)req.lng,
			Description = req.description,
			CreatedByUserId = req.createdByUserId
		};

		_db.Activities.Add(activity);
		await _db.SaveChangesAsync();

		// Ladda Members (tom) för korrekt DTO
		await _db.Entry(activity).Collection(a => a.Members).LoadAsync();

		return CreatedAtAction(nameof(GetById), new { id = activity.Id }, ToDto(activity));


	}

	// POST /api/activities/{id}/join?userId=1
	[HttpPost("{id:int}/join")]
	public async Task<IActionResult> Join(int id, [FromQuery] int userId)
	{
		var activity = await _db.Activities
			.Include(a => a.Members)
			.FirstOrDefaultAsync(a => a.Id == id);

		if (activity is null) return NotFound("Activity not found");

		var userExists = await _db.Users.AnyAsync(u => u.Id == userId);
		if (!userExists) return BadRequest("User not found");

		var alreadyJoined = activity.Members.Any(m => m.UserId == userId);
		if (alreadyJoined) return Conflict("User already joined");

		var currentCount = activity.Members.Count;
		if (currentCount >= activity.MaxParticipants)
			return Conflict("Activity is full");

		_db.ActivityMembers.Add(new ActivityMember
		{
			ActivityId = id,
			UserId = userId
		});

		await _db.SaveChangesAsync();
		return NoContent();
	}


	// POST /api/activities/{id}/leave?userId=1
	[HttpPost("{id:int}/leave")]
	public async Task<IActionResult> Leave(int id, [FromQuery] int userId)
	{
		var membership = await _db.ActivityMembers
			.FirstOrDefaultAsync(m => m.ActivityId == id && m.UserId == userId);

		if (membership is null) return NotFound("Membership not found");

		_db.ActivityMembers.Remove(membership);
		await _db.SaveChangesAsync();
		return NoContent();
	}

	[HttpGet("{id:int}")]
	public async Task<ActionResult<ActivityDto>> GetById(int id)
	{
		var activity = await _db.Activities
			.AsNoTracking()
			.Include(a => a.Members)
			.FirstOrDefaultAsync(a => a.Id == id);

		if (activity == null)
			return NotFound();

		return ToDto(activity);
	}

	private static ActivityDto ToDto(Activity a)
	{
		return new ActivityDto
		{
			id = a.Id,
			title = a.Title,
			category = a.Category,
			location = a.Location,
			date = a.Date.ToString("yyyy-MM-dd"),
			time = a.Time.ToString("HH:mm"),
			participants = a.Members?.Count ?? 0,
			maxParticipants = a.MaxParticipants,
			lat = (double)a.Lat,
			lng = (double)a.Lng,
			description = a.Description
		};
	}

}

