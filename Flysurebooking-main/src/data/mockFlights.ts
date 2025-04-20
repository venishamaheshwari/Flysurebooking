import { Flight } from '../types/flight';

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    airline: {
      name: 'JetBlue Airways',
      code: 'B6',
      logo: 'https://content.airhex.com/content/logos/airlines_jetBlue_50_50_s.png',
    },
    flightNumber: 'B6 1234',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '08:15',
    arrivalTime: '11:30',
    duration: '6h 15m',
    price: 289,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Power'],
    farePrediction: 'Price likely to increase',
  },
  {
    id: 'f2',
    airline: {
      name: 'Delta Air Lines',
      code: 'DL',
      logo: 'https://content.airhex.com/content/logos/airlines_delta_50_50_s.png',
    },
    flightNumber: 'DL 459',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '10:45',
    arrivalTime: '14:20',
    duration: '6h 35m',
    price: 312,
    stops: [],
    amenities: ['Wi-Fi', 'Food', 'Entertainment', 'Power'],
  },
  {
    id: 'f3',
    airline: {
      name: 'American Airlines',
      code: 'AA',
      logo: 'https://content.airhex.com/content/logos/airlines_american-airlines_50_50_s.png',
    },
    flightNumber: 'AA 785',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '07:30',
    arrivalTime: '13:45',
    duration: '9h 15m',
    price: 256,
    stops: [
      {
        airport: 'DFW',
        duration: '2h 15m',
      }
    ],
    amenities: ['Wi-Fi', 'Entertainment'],
    farePrediction: 'Price likely to decrease',
  },
  {
    id: 'f4',
    airline: {
      name: 'United Airlines',
      code: 'UA',
      logo: 'https://content.airhex.com/content/logos/airlines_united_50_50_s.png',
    },
    flightNumber: 'UA 523',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '14:30',
    arrivalTime: '21:15',
    duration: '9h 45m',
    price: 225,
    stops: [
      {
        airport: 'ORD',
        duration: '3h 10m',
      }
    ],
    amenities: ['Wi-Fi', 'Power'],
  },
  {
    id: 'f5',
    airline: {
      name: 'Southwest Airlines',
      code: 'WN',
      logo: 'https://content.airhex.com/content/logos/airlines_southwest_50_50_s.png',
    },
    flightNumber: 'WN 337',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '06:15',
    arrivalTime: '16:20',
    duration: '13h 05m',
    price: 198,
    stops: [
      {
        airport: 'DEN',
        duration: '5h 30m',
        layoverActivities: true,
      }
    ],
    amenities: ['Wi-Fi'],
  },
  {
    id: 'f6',
    airline: {
      name: 'Alaska Airlines',
      code: 'AS',
      logo: 'https://content.airhex.com/content/logos/airlines_alaska-airlines_50_50_s.png',
    },
    flightNumber: 'AS 789',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '17:45',
    arrivalTime: '21:30',
    duration: '6h 45m',
    price: 345,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f7',
    airline: {
      name: 'Spirit Airlines',
      code: 'NK',
      logo: 'https://content.airhex.com/content/logos/airlines_spirit_50_50_s.png',
    },
    flightNumber: 'NK 234',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '21:30',
    arrivalTime: '07:15',
    duration: '8h 45m',
    price: 169,
    stops: [
      {
        airport: 'LAS',
        duration: '1h 25m',
      }
    ],
    amenities: [],
  },
  {
    id: 'f8',
    airline: {
      name: 'Frontier Airlines',
      code: 'F9',
      logo: 'https://content.airhex.com/content/logos/airlines_frontier_50_50_s.png',
    },
    flightNumber: 'F9 902',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
    },
    departureTime: '19:15',
    arrivalTime: '01:30',
    duration: '9h 15m',
    price: 148,
    stops: [
      {
        airport: 'PHX',
        duration: '2h 45m',
      }
    ],
    amenities: ['Food'],
  },
  
  // International mock flights
  {
    id: 'f9',
    airline: {
      name: 'British Airways',
      code: 'BA',
      logo: 'https://content.airhex.com/content/logos/airlines_british-airways_50_50_s.png',
    },
    flightNumber: 'BA 178',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'LHR',
      city: 'London',
    },
    departureTime: '21:30',
    arrivalTime: '09:45',
    duration: '7h 15m',
    price: 589,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f10',
    airline: {
      name: 'Lufthansa',
      code: 'LH',
      logo: 'https://content.airhex.com/content/logos/airlines_lufthansa_50_50_s.png',
    },
    flightNumber: 'LH 405',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'FRA',
      city: 'Frankfurt',
    },
    departureTime: '18:15',
    arrivalTime: '07:50',
    duration: '7h 35m',
    price: 645,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f11',
    airline: {
      name: 'Air France',
      code: 'AF',
      logo: 'https://content.airhex.com/content/logos/airlines_air-france_50_50_s.png',
    },
    flightNumber: 'AF 023',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'CDG',
      city: 'Paris',
    },
    departureTime: '19:30',
    arrivalTime: '08:45',
    duration: '7h 15m',
    price: 612,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f12',
    airline: {
      name: 'Emirates',
      code: 'EK',
      logo: 'https://content.airhex.com/content/logos/airlines_emirates_50_50_s.png',
    },
    flightNumber: 'EK 202',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'DXB',
      city: 'Dubai',
    },
    departureTime: '22:30',
    arrivalTime: '19:15',
    duration: '12h 45m',
    price: 945,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f13',
    airline: {
      name: 'Singapore Airlines',
      code: 'SQ',
      logo: 'https://content.airhex.com/content/logos/airlines_singapore-airlines_50_50_s.png',
    },
    flightNumber: 'SQ 025',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'SIN',
      city: 'Singapore',
    },
    departureTime: '23:55',
    arrivalTime: '06:30',
    duration: '18h 35m',
    price: 1245,
    stops: [
      {
        airport: 'FRA',
        duration: '1h 45m',
      }
    ],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f14',
    airline: {
      name: 'Japan Airlines',
      code: 'JL',
      logo: 'https://content.airhex.com/content/logos/airlines_japan-airlines_50_50_s.png',
    },
    flightNumber: 'JL 005',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'HND',
      city: 'Tokyo',
    },
    departureTime: '13:15',
    arrivalTime: '16:30',
    duration: '15h 15m',
    price: 1120,
    stops: [],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
  {
    id: 'f15',
    airline: {
      name: 'Qantas',
      code: 'QF',
      logo: 'https://content.airhex.com/content/logos/airlines_qantas_50_50_s.png',
    },
    flightNumber: 'QF 012',
    origin: {
      code: 'JFK',
      city: 'New York',
    },
    destination: {
      code: 'SYD',
      city: 'Sydney',
    },
    departureTime: '18:30',
    arrivalTime: '06:15',
    duration: '23h 45m',
    price: 1795,
    stops: [
      {
        airport: 'LAX',
        duration: '2h 15m',
      }
    ],
    amenities: ['Wi-Fi', 'Entertainment', 'Food', 'Power'],
  },
];