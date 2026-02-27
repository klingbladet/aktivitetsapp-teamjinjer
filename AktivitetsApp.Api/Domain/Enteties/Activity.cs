namespace AktivitetsApp.Domain.Entities;

public class Activity
{
	public int Id { get; set; }

	public string Title { get; set; } = null!;
	public string Category { get; set; } = null!;
	public string Location { get; set; } = null!;

	public DateOnly Date { get; set; }
	public TimeOnly Time { get; set; }

	public int MaxParticipants { get; set; }

	public decimal Lat { get; set; }
	public decimal Lng { get; set; }

	public string Description { get; set; } = null!;

	// Vem skapade aktiviteten (valfritt)
	public int? CreatedByUserId { get; set; }
	public User? CreatedByUser { get; set; }

	public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

	// Deltagare (many-to-many via ActivityMember)
	public List<ActivityMember> Members { get; set; } = new();
}