import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Users, Plane, ChevronDown, ChevronUp } from 'lucide-react';
import { useCurrencyContext } from '../contexts/CurrencyContext';
import { mockFlights } from '../data/mockFlights';
import { Flight } from '../types/flight';
import LayoverRecommendation from '../components/layover/LayoverRecommendation';

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatCurrency } = useCurrencyContext();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchFlightDetails = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundFlight = mockFlights.find(f => f.id === id) || null;
      setFlight(foundFlight);
      setLoading(false);
    };
    
    fetchFlightDetails();
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };
  
  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Plane size={48} className="text-primary mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Loading flight details...</h3>
        </div>
      </div>
    );
  }
  
  if (!flight) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Flight not found</h3>
            <p className="text-gray-600 mb-4">We couldn't find the flight you're looking for.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Sample layover recommendations for demo
  const layoverRecommendations = [
    {
      type: 'attraction',
      name: 'Central Museum',
      description: 'World-class art and cultural exhibits in the heart of the city.',
      distance: '15 min',
      timeNeeded: '2-3 hours',
      image: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      type: 'food',
      name: 'Local Food Market',
      description: 'Sample authentic local cuisine in this bustling food hall.',
      distance: '10 min',
      timeNeeded: '1-2 hours',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      type: 'shopping',
      name: 'City Center Mall',
      description: 'Shop for souvenirs and local crafts in this convenient location.',
      distance: '5 min',
      timeNeeded: '1-3 hours',
      image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  // Check if this flight has a long layover
  const hasLongLayover = flight.stops.some(stop => parseInt(stop.duration.split('h')[0]) >= 5);
  
  // For demo, just use the first stopover with a long layover
  const longLayover = flight.stops.find(stop => parseInt(stop.duration.split('h')[0]) >= 5);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to search results</span>
        </button>
        
        {/* Flight Summary Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Header with airline info */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center">
                  <img 
                    src={flight.airline.logo}
                    alt={flight.airline.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{flight.airline.name}</h2>
                  <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{formatCurrency(flight.price)}</span>
                <p className="text-sm text-gray-500">per person</p>
              </div>
            </div>
          </div>
          
          {/* Main Flight Details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              {/* Departure Info */}
              <div className="mb-6 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Departure</p>
                <div className="flex items-end space-x-3">
                  <h3 className="text-3xl font-bold">{flight.departureTime}</h3>
                  <div>
                    <p className="font-medium">{flight.origin.code}</p>
                    <p className="text-sm text-gray-500">{flight.origin.city}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Oct 15, 2025
                </p>
              </div>
              
              {/* Flight Path */}
              <div className="flex flex-col items-center justify-center mb-6 md:mb-0">
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {flight.duration}
                </p>
                <div className="w-32 md:w-64 h-px bg-gray-300 relative">
                  {flight.stops.length > 0 && flight.stops.map((stop, index) => (
                    <div 
                      key={index}
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-accent rounded-full"
                      style={{ left: `${(index + 1) * 100 / (flight.stops.length + 1)}%` }}
                    >
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-accent">
                        {stop.airport}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {flight.stops.length === 0 
                    ? 'Nonstop' 
                    : `${flight.stops.length} stop${flight.stops.length > 1 ? 's' : ''}`}
                </p>
              </div>
              
              {/* Arrival Info */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Arrival</p>
                <div className="flex items-end space-x-3">
                  <h3 className="text-3xl font-bold">{flight.arrivalTime}</h3>
                  <div>
                    <p className="font-medium">{flight.destination.code}</p>
                    <p className="text-sm text-gray-500">{flight.destination.city}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Oct 15, 2025
                </p>
              </div>
            </div>
            
            {/* Stops Details */}
            {flight.stops.length > 0 && (
              <div className="mb-6 border-t border-b border-gray-100 py-4">
                <h3 className="font-medium mb-2">Layover Details</h3>
                {flight.stops.map((stop, index) => (
                  <div key={index} className="flex items-start space-x-3 mb-2 last:mb-0">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{stop.airport}</p>
                      <p className="text-sm text-gray-500">{stop.duration} layover</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Amenities Section */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Amenities & Services</h3>
              <div className="flex flex-wrap gap-2">
                {flight.amenities.length > 0 ? (
                  flight.amenities.map((amenity, index) => (
                    <span key={index} className="inline-flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No amenities available for this flight</p>
                )}
              </div>
            </div>
            
            {/* Toggle Details Button */}
            <button 
              className="flex items-center text-primary hover:text-primary-light transition-colors"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <ChevronUp size={20} className="mr-1" />
                  <span>Hide details</span>
                </>
              ) : (
                <>
                  <ChevronDown size={20} className="mr-1" />
                  <span>Show more details</span>
                </>
              )}
            </button>
            
            {/* Expanded Details */}
            {showDetails && (
              <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                <div>
                  <h3 className="font-medium mb-2">Baggage Allowance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carry-on</span>
                      <span>1 bag, 8 kg max</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Checked baggage</span>
                      <span>1 bag, 23 kg max</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-gray-600">
                    Free cancellation within 24 hours of booking. After that, a fee of $150 applies for changes or cancellations.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Aircraft</h3>
                  <p className="text-sm text-gray-600">
                    Boeing 787-9 Dreamliner
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Booking Section */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <label htmlFor="passengers" className="text-sm font-medium">
                    Passengers:
                  </label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-gray-600 flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>
                    {passengers} {passengers === 1 ? 'passenger' : 'passengers'}:
                  </span>
                  <span className="font-bold ml-2">
                    {formatCurrency(flight.price * passengers)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleBooking}
                className="btn btn-primary px-8 py-3"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
        
        {/* Layover Recommendations Section - Only show if applicable */}
        {hasLongLayover && longLayover && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Make the Most of Your Layover</h2>
            <LayoverRecommendation
              airport={longLayover.airport}
              city="Denver"
              duration={longLayover.duration}
              recommendations={layoverRecommendations}
            />
          </div>
        )}
        
        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg mb-3">Travel Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Arrive at the airport at least 2 hours before departure</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Check in online 24 hours before your flight for the best seat selection</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Pack liquids in containers of 100ml or less in a clear, resealable bag</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Keep important documents easily accessible in your carry-on</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg mb-3">About Your Destination</h3>
            <p className="text-gray-600 mb-4">
              {flight.destination.city} offers a vibrant mix of culture, cuisine, and attractions for every traveler. The best time to visit is between June and September when the weather is most pleasant.
            </p>
            <button className="text-primary hover:text-primary-light transition-colors flex items-center">
              <span>Learn more about {flight.destination.city}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;