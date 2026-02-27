namespace AktivitetsApp.Domain.Entities;

public class Category
{
	public int Id { get; set; }
	public string Name { get; set; } = null!;

	public List<Activity> Activities { get; set; } = new();
}