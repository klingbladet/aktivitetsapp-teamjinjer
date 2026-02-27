namespace AktivitetsApp.Api.DTOs
{
	public class CreateActivityRequest
	{
		public string title { get; set; } = "";
		public string category { get; set; } = "";
		public string location { get; set; } = "";
		public string date { get; set; } = "";  // "yyyy-MM-dd"
		public string time { get; set; } = "";  // "HH:mm"
		public int maxParticipants { get; set; }
		public double lat { get; set; }
		public double lng { get; set; }
		public string description { get; set; } = "";
		public int? createdByUserId { get; set; }
	}
}