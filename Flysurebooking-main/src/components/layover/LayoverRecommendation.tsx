import React from 'react';
import { Clock, MapPin, Coffee, Mouse as Museum, ShoppingBag } from 'lucide-react';

interface Recommendation {
  type: 'attraction' | 'food' | 'shopping';
  name: string;
  description: string;
  distance: string;
  timeNeeded: string;
  image: string;
}

interface LayoverRecommendationProps {
  airport: string;
  city: string;
  duration: string;
  recommendations: Recommendation[];
}

const LayoverRecommendation: React.FC<LayoverRecommendationProps> = ({
  airport,
  city,
  duration,
  recommendations
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'attraction': return <Museum className="text-blue-500" size={18} />;
      case 'food': return <Coffee className="text-orange-500" size={18} />;
      case 'shopping': return <ShoppingBag className="text-pink-500" size={18} />;
      default: return <MapPin className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
        <h3 className="font-bold text-lg flex items-center">
          <MapPin size={20} className="mr-2" />
          Layover in {city}
        </h3>
        <p className="text-sm opacity-90 flex items-center mt-1">
          <Clock size={16} className="mr-1" />
          {duration} layover at {airport}
        </p>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          You have enough time to explore during your layover. Here are some recommendations within 30 minutes of the airport:
        </p>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={rec.image} 
                  alt={rec.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  {getIcon(rec.type)}
                  <h4 className="font-medium">{rec.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {rec.distance} from airport
                  </span>
                  <span className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {rec.timeNeeded}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 btn btn-outline text-blue-600 hover:bg-blue-50 border-blue-200">
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default LayoverRecommendation;