export interface Activity {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  lat: number;
  lng: number;
  description: string;
  participantNames: string[];
}

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Fotboll i Vasaparken",
    category: "Sport",
    location: "Vasaparken, Stockholm",
    date: "2026-03-01",
    time: "14:00",
    participants: 7,
    maxParticipants: 14,
    lat: 59.3400,
    lng: 18.0435,
    description: "Kom och spela lite avslappnad fotboll med oss! Vi samlas vid grusplanen och spelar 7 mot 7. Alla nivåer är välkomna - det viktigaste är att ha kul och röra på sig. Ta med eget vatten och passande skor. Vi spelar i cirka 90 minuter eller tills alla är nöjda!",
    participantNames: ["Erik Andersson", "Lisa Bergström", "Mohammed Ali", "Sara Nilsson", "Johan Svensson", "Emma Larsson", "David Eriksson"]
  },
  {
    id: 2,
    title: "Beachvolleyboll",
    category: "Sport",
    location: "Långholmen, Stockholm",
    date: "2026-03-02",
    time: "17:30",
    participants: 3,
    maxParticipants: 8,
    lat: 59.3214,
    lng: 18.0264,
    description: "Häng med på en afterwork-session med beachvolleyboll vid vattnet! Vi har boll och nät uppsatt. Perfekt för att varva ner efter jobbet och träffa nya vänner. Även nybörjare är hjärtligt välkomna. Vi brukar spela i ca 2 timmar och sedan ta en glass eller öl om vädret tillåter.",
    participantNames: ["Anna Pettersson", "Marcus Johansson", "Julia Karlsson"]
  },
  {
    id: 3,
    title: "Löpning i Hagaparken",
    category: "Sport",
    location: "Hagaparken, Solna",
    date: "2026-03-01",
    time: "09:00",
    participants: 5,
    maxParticipants: 20,
    lat: 59.3621,
    lng: 18.0326,
    description: "Starta helgen med en härlig morgonlöpning genom Hagaparken! Vi springer en slinga på cirka 5 km i lagom tempo (ca 6 min/km). Ingen kommer lämnas efter - vi håller ihop gruppen. Perfekt för dig som vill komma igång med löpning eller bara vill ha sällskap på morgonrundan. Samling vid stora fontänen.",
    participantNames: ["Karin Lindberg", "Peter Gustavsson", "Maria Olsson", "Anders Persson", "Sophie Lundgren"]
  },
  {
    id: 4,
    title: "Padel-match (Dubbel)",
    category: "Sport",
    location: "Padelcenter, Norrtull",
    date: "2026-03-03",
    time: "18:00",
    participants: 2,
    maxParticipants: 4,
    lat: 59.3489,
    lng: 18.0485,
    description: "Vi har bokat en padelbana och söker två till för en rolig dubbelmatch! Nivå: Medel - du bör kunna grunderna och ha spelat några gånger tidigare. Vi spelar i 90 minuter och delar på kostnaden för banan (150 kr/person). Racketar finns att hyra på plats om du inte har egna. Kom gärna 10 min tidigare för uppvärmning!",
    participantNames: ["Oskar Håkansson", "Linda Ström"]
  },
  {
    id: 5,
    title: "Yoga i det fria",
    category: "Friskvård",
    location: "Djurgården, Stockholm",
    date: "2026-03-04",
    time: "10:00",
    participants: 12,
    maxParticipants: 30,
    lat: 59.3275,
    lng: 18.1182,
    description: "Njut av en lugn och härlig yogasession i det fria! Vi träffas på gräsmattan vid Rosendals trädgård för 60 minuter hatha yoga med fokus på andning och mindfulness. Ta med egen yogamatta, filt och vatten. Klä dig i lager då det kan vara lite kyligt på morgonen. Passet är anpassat för alla nivåer och leds av en erfaren instruktör. Donation-based (50-100 kr).",
    participantNames: ["Helena Nordström", "Gustav Wikström", "Elin Forsberg", "Niklas Holmberg", "Camilla Åkesson", "Fredrik Malmberg", "Rebecka Sandberg", "Thomas Nyström", "Jenny Blomqvist", "Daniel Carlsson", "Malin Hedlund", "Viktor Englund"]
  },
  {
    id: 6,
    title: "Bordtennis-turnering",
    category: "Sport",
    location: "Kulturhuset, Stockholm",
    date: "2026-03-05",
    time: "15:00",
    participants: 4,
    maxParticipants: 8,
    lat: 59.3323,
    lng: 18.0651,
    description: "Spontan och rolig bordtennisturnering för alla som vill testa sina skills! Vi kör ett enkelt cupformat där alla får spela flera matcher. Turneringen tar cirka 2 timmar och det finns racketar att låna. Alla nivåer välkomna - det är mer skoj än seriöst! Priser till vinnare och förlorare. Fika och mingel efteråt.",
    participantNames: ["Christian Björk", "Amelie Söderberg", "Patrik Ekström", "Isabella Mårtensson"]
  }
];