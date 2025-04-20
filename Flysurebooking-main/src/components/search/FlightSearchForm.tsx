import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRight, Map, RotateCcw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

type TripType = 'round-trip' | 'one-way' | 'multi-city';

const FlightSearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date>(addDays(new Date(), 7));
  const [returnDate, setReturnDate] = useState<Date>(addDays(new Date(), 14));
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');

  const popularDestinations = [
    { code: 'JFK', name: 'New York' },
    { code: 'LHR', name: 'London' },
    { code: 'CDG', name: 'Paris' },
    { code: 'DXB', name: 'Dubai' },
    { code: 'SIN', name: 'Singapore' },
    { code: 'HND', name: 'Tokyo' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const searchParams = new URLSearchParams({
      origin,
      destination,
      departDate: departDate.toISOString(),
      returnDate: returnDate.toISOString(),
      passengers: passengers.toString(),
      cabinClass,
      tripType,
    });
    
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleSwapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="flight-search-glass w-full max-w-4xl mx-auto p-6">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            tripType === 'round-trip' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('round-trip')}
        >
          Round Trip
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            tripType === 'one-way' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('one-way')}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            tripType === 'multi-city' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('multi-city')}
        >
          Multi-City
        </button>
      </div>

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label htmlFor="origin" className="label">From</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Plane size={18} />
              </div>
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="City or Airport"
                className="input pl-10"
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="destination" className="label">To</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Map size={18} />
              </div>
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City or Airport"
                className="input pl-10"
                required
              />
              <button 
                type="button"
                onClick={handleSwapLocations}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                aria-label="Swap origin and destination"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="depart-date" className="label">Depart</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Calendar size={18} />
              </div>
              <DatePicker
                id="depart-date"
                selected={departDate}
                onChange={(date: Date) => setDepartDate(date)}
                minDate={new Date()}
                className="input pl-10 w-full"
                required
              />
            </div>
          </div>
          
          {tripType === 'round-trip' && (
            <div>
              <label htmlFor="return-date" className="label">Return</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Calendar size={18} />
                </div>
                <DatePicker
                  id="return-date"
                  selected={returnDate}
                  onChange={(date: Date) => setReturnDate(date)}
                  minDate={departDate}
                  className="input pl-10 w-full"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="passengers" className="label">Travelers & Class</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Users size={18} />
              </div>
              <div className="flex">
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="input pl-10 rounded-r-none border-r-0"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="input rounded-l-none"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Eco</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full btn btn-primary py-3 text-lg">
          Search Flights
        </button>
      </form>
      
      <div className="mt-6">
        <h4 className="text-sm text-gray-600 mb-2">Popular Destinations</h4>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((city) => (
            <button
              key={city.code}
              onClick={() => setDestination(city.code)}
              className="px-3 py-1 bg-white rounded-full text-xs shadow-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <span>{city.name}</span>
              <span className="text-gray-500">({city.code})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;