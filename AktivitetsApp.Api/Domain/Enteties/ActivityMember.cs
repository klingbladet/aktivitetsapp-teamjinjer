namespace AktivitetsApp.Domain.Entities;

public class ActivityMember
{
	public int ActivityId { get; set; }
	public Activity Activity { get; set; } = null!;

	public int UserId { get; set; }
	public User User { get; set; } = null!;

	public DateTime JoinedAtUtc { get; set; } = DateTime.UtcNow;
}
	