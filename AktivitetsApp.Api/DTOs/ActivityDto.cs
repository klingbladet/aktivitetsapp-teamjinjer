namespace AktivitetsApp.Api.DTOs
{
	public class ActivityDto
	{
		public int id { get; set; }
		public string title { get; set; } = "";
		public string category { get; set; } = "";
		public string location { get; set; } = "";
		public string date { get; set; } = "";   // "yyyy-MM-dd"
		public string time { get; set; } = "";   // "HH:mm"
		public int participants { get; set; }
		public int maxParticipants { get; set; }
		public double lat { get; set; }
		public double lng { get; set; }
		public string description { get; set; } = "";
	}
}