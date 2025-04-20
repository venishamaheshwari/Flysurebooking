import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Circle, ArrowRight, Wifi, Coffee, Video, Plug } from 'lucide-react';
import { useCurrencyContext } from '../../contexts/CurrencyContext';
import { Flight } from '../../types/flight';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();
  const { formatCurrency } = useCurrencyContext();
  
  const viewFlightDetails = () => {
    navigate(`/flight/${flight.id}`);
  };

  return (
    <div className="card card-hover transition-all duration-300 hover:border-primary hover:border">
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Airline Info */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <img 
                src={flight.airline.logo}
                alt={flight.airline.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold">{flight.airline.name}</h3>
              <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-xl font-bold text-primary">{formatCurrency(flight.price)}</span>
            <p className="text-sm text-gray-500">per person</p>
          </div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        {/* Flight Details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          {/* Departure */}
          <div className="text-center mb-2 md:mb-0">
            <p className="text-2xl font-bold">{flight.departureTime}</p>
            <p className="text-sm text-gray-600">{flight.origin.code}</p>
            <p className="text-xs text-gray-500">{flight.origin.city}</p>
          </div>

          {/* Flight Path Visualization */}
          <div className="flex-1 mx-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{flight.duration}</span>
            </div>
            <div className="w-full flex items-center">
              <Circle size={8} className="text-primary" />
              <div className="flex-1 h-0.5 bg-gray-300 mx-1 relative">
                {flight.stops.length > 0 && flight.stops.map((stop, index) => (
                  <div 
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2 h-2 w-2 bg-accent rounded-full"
                    style={{ left: `${(index + 1) * 100 / (flight.stops.length + 1)}%` }}
                  />
                ))}
              </div>
              <Circle size={8} className="text-primary" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {flight.stops.length === 0 
                ? 'Nonstop' 
                : `${flight.stops.length} stop${flight.stops.length > 1 ? 's' : ''}`}
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-2xl font-bold">{flight.arrivalTime}</p>
            <p className="text-sm text-gray-600">{flight.destination.code}</p>
            <p className="text-xs text-gray-500">{flight.destination.city}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {flight.amenities.map((amenity, index) => {
            const Icon = () => {
              switch (amenity) {
                case 'Wi-Fi': return <Wifi size={14} />;
                case 'Food': return <Coffee size={14} />;
                case 'Entertainment': return <Video size={14} />;
                case 'Power': return <Plug size={14} />;
                default: return null;
              }
            };
            
            return (
              <span key={index} className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                <Icon />
                <span className="ml-1">{amenity}</span>
              </span>
            );
          })}
        </div>

        {/* Layover Info - if applicable */}
        {flight.stops.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-xs text-gray-700 flex items-center">
              <Clock size={14} className="mr-1 text-gray-500" />
              {flight.stops.map((stop, index) => (
                <span key={index}>
                  {index > 0 && <span className="mx-1">•</span>}
                  <span>{stop.duration} layover in <b>{stop.airport}</b></span>
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Show layover recommendations if any stop is over 5 hours */}
        {flight.stops.some(stop => parseInt(stop.duration.split('h')[0]) >= 5) && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
            <p className="text-xs text-blue-700 flex items-center font-medium">
              <span className="mr-1">✨</span>
              Long layover detected! Get layover activity recommendations
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            {/* Show fare prediction badge if available */}
            {flight.farePrediction && (
              <span className={`text-xs py-1 px-2 rounded ${
                flight.farePrediction === 'Price likely to decrease' 
                  ? 'bg-green-100 text-green-800' 
                  : flight.farePrediction === 'Price likely to increase'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {flight.farePrediction}
              </span>
            )}
          </div>
          
          <button 
            onClick={viewFlightDetails}
            className="btn btn-primary flex items-center space-x-1"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;