using AktivitetsApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AktivitetsApp.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

	public DbSet<User> Users => Set<User>();
	public DbSet<Activity> Activities => Set<Activity>();
	public DbSet<ActivityMember> ActivityMembers => Set<ActivityMember>();

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<User>(e =>
		{
			e.Property(x => x.DisplayName).HasMaxLength(80).IsRequired();
			e.Property(x => x.Email).HasMaxLength(200).IsRequired();
			e.HasIndex(x => x.Email).IsUnique();
		});

		modelBuilder.Entity<Activity>(e =>
		{
			e.Property(x => x.Title).HasMaxLength(200).IsRequired();
			e.Property(x => x.Category).HasMaxLength(50).IsRequired();
			e.Property(x => x.Location).HasMaxLength(200).IsRequired();
			e.Property(x => x.Description).HasMaxLength(2000).IsRequired();

			e.Property(x => x.Lat).HasPrecision(9, 6);
			e.Property(x => x.Lng).HasPrecision(9, 6);

			e.HasIndex(x => x.Date);
			e.HasIndex(x => x.Category);
			e.HasIndex(x => new { x.Lat, x.Lng });

			e.HasOne(x => x.CreatedByUser)
			 .WithMany(u => u.CreatedActivities)
			 .HasForeignKey(x => x.CreatedByUserId)
			 .OnDelete(DeleteBehavior.SetNull);

			e.ToTable(t =>
			{
				t.HasCheckConstraint("CK_Activities_MaxParticipants_Positive", "[MaxParticipants] > 0");
				t.HasCheckConstraint("CK_Activities_Lat", "[Lat] >= -90 AND [Lat] <= 90");
				t.HasCheckConstraint("CK_Activities_Lng", "[Lng] >= -180 AND [Lng] <= 180");
			});
		});

		modelBuilder.Entity<ActivityMember>(e =>
		{
			e.HasKey(x => new { x.ActivityId, x.UserId });

			e.HasOne(x => x.Activity)
			 .WithMany(a => a.Members)
			 .HasForeignKey(x => x.ActivityId)
			 .OnDelete(DeleteBehavior.Cascade);

			e.HasOne(x => x.User)
			 .WithMany(u => u.Memberships)
			 .HasForeignKey(x => x.UserId)
			 .OnDelete(DeleteBehavior.Cascade);

			e.HasIndex(x => x.UserId);
		});

		base.OnModelCreating(modelBuilder);
	}
}