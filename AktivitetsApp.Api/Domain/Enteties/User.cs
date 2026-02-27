namespace AktivitetsApp.Domain.Entities;

public class User
{
	public int Id { get; set; }

	public string DisplayName { get; set; } = null!;
	public string Email { get; set; } = null!;

	public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

	public List<Activity> CreatedActivities { get; set; } = new();
	public List<ActivityMember> Memberships { get; set; } = new();
}