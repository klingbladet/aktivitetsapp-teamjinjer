using AktivitetsApp.Api.DTOs;
using AktivitetsApp.Domain.Entities;
using AktivitetsApp.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AktivitetsApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
	private readonly AppDbContext _db;

	public UsersController(AppDbContext db)
	{
		_db = db;
	}

	// POST /api/users
	[HttpPost]
	public async Task<ActionResult<UserDto>> Create([FromBody] CreateUserRequest req)
	{
		var email = req.email.Trim().ToLower();

		var exists = await _db.Users.AnyAsync(u => u.Email.ToLower() == email);
		if (exists) return Conflict("Email already exists");

		var user = new User
		{
			DisplayName = req.displayName.Trim(),
			Email = email
		};

		_db.Users.Add(user);
		await _db.SaveChangesAsync();

		return CreatedAtAction(nameof(GetById), new { id = user.Id }, new UserDto
		{
			id = user.Id,
			displayName = user.DisplayName,
			email = user.Email
		});
	}

	// GET /api/users/1
	[HttpGet("{id:int}")]
	public async Task<ActionResult<UserDto>> GetById(int id)
	{
		var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
		if (user is null) return NotFound();

		return new UserDto { id = user.Id, displayName = user.DisplayName, email = user.Email };
	}
}