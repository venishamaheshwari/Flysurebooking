export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  name: string;
  code: string;
  logo: string;
}

export interface Stopover {
  airport: string;
  duration: string;
  layoverActivities?: boolean;
}

export interface Flight {
  id: string;
  airline: Airline;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
  };
  destination: {
    code: string;
    city: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: Stopover[];
  amenities: string[];
  farePrediction?: string;
}