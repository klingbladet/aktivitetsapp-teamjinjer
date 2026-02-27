using System;

using AktivitetsApp.Domain.Entities;

namespace AktivitetsApp.Infrastructure.Persistence;

public static class DbSeeder
{
	public static void Seed(AppDbContext db)
	{
		if (db.Users.Any() || db.Activities.Any())
			return;

		// =============================
		// Skapa test-user
		// =============================
		var user = new User
		{
			DisplayName = "Slava Test",
			Email = "slava@test.se"
		};

		db.Users.Add(user);
		db.SaveChanges();

		// =============================
		// Skapa aktiviteter
		// =============================
		var activities = new List<Activity>
		{
			new Activity {
				Title="Fotboll i Vasaparken",
				Category="Sport",
				Location="Vasaparken, Stockholm",
				Date=new DateOnly(2026,3,1),
				Time=new TimeOnly(14,0),
				MaxParticipants=14,
				Lat=59.3400m,
				Lng=18.0435m,
				Description="Kom och spela lite avslappnad fotboll! Alla nivåer är välkomna.",
				CreatedByUserId = user.Id
			},
			new Activity {
				Title="Beachvolleyboll",
				Category="Sport",
				Location="Långholmen, Stockholm",
				Date=new DateOnly(2026,3,2),
				Time=new TimeOnly(17,30),
				MaxParticipants=8,
				Lat=59.3214m,
				Lng=18.0264m,
				Description="Häng med på lite volleyboll vid vattnet. Vi har boll!",
				CreatedByUserId = user.Id
			},
			new Activity {
				Title="Löpning i Hagaparken",
				Category="Sport",
				Location="Hagaparken, Solna",
				Date=new DateOnly(2026,3,1),
				Time=new TimeOnly(9,0),
				MaxParticipants=20,
				Lat=59.3621m,
				Lng=18.0326m,
				Description="Morgonlöpning ca 5km i lugnt tempo.",
				CreatedByUserId = user.Id
			},
			new Activity {
				Title="Padel-match (Dubbel)",
				Category="Sport",
				Location="Padelcenter, Norrtull",
				Date=new DateOnly(2026,3,3),
				Time=new TimeOnly(18,0),
				MaxParticipants=4,
				Lat=59.3489m,
				Lng=18.0485m,
				Description="Vi söker två till för en rolig padelmatch. Nivå: Medel.",
				CreatedByUserId = user.Id
			},
			new Activity {
				Title="Yoga i det fria",
				Category="Friskvård",
				Location="Djurgården, Stockholm",
				Date=new DateOnly(2026,3,4),
				Time=new TimeOnly(10,0),
				MaxParticipants=30,
				Lat=59.3275m,
				Lng=18.1182m,
				Description="Ta med egen matta och njut av morgonyoga.",
				CreatedByUserId = user.Id
			},
			new Activity {
				Title="Bordtennis-turnering",
				Category="Sport",
				Location="Kulturhuset, Stockholm",
				Date=new DateOnly(2026,3,5),
				Time=new TimeOnly(15,0),
				MaxParticipants=8,
				Lat=59.3323m,
				Lng=18.0651m,
				Description="Snabb och rolig turnering, alla är välkomna.",
				CreatedByUserId = user.Id
			}
		};

		db.Activities.AddRange(activities);
		db.SaveChanges();

		// =============================
		// Lägg till deltagare (participants)
		// Vi simulerar deltagare enligt mock-data
		// =============================

		var random = new Random();

		foreach (var activity in activities)
		{
			int participantCount = random.Next(2, activity.MaxParticipants / 2);

			for (int i = 0; i < participantCount; i++)
			{
				db.ActivityMembers.Add(new ActivityMember
				{
					ActivityId = activity.Id,
					UserId = user.Id   // test-user går med flera gånger?
				});
			}
		}

		// Viktigt: eftersom samma user inte får gå med flera gånger
		// Lägg istället bara 1 join per activity:

		foreach (var activity in activities)
		{
			db.ActivityMembers.Add(new ActivityMember
			{
				ActivityId = activity.Id,
				UserId = user.Id
			});
		}

		db.SaveChanges();
	}
}