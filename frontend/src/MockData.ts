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
    description: "Kom och spela lite avslappnad fotboll! Alla nivåer är välkomna."
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
    description: "Häng med på lite volleyboll vid vattnet. Vi har boll!"
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
    description: "Morgonlöpning ca 5km i lugnt tempo."
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
    description: "Vi söker två till för en rolig padelmatch. Nivå: Medel."
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
    description: "Ta med egen matta och njut av morgonyoga."
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
    description: "Snabb och rolig turnering, alla är välkomna."
  }
];
