import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ArrowDownUp, Plane, AlertCircle } from 'lucide-react';
import FlightCard from '../components/search/FlightCard';
import { mockFlights } from '../data/mockFlights';
import { Flight } from '../types/flight';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    nonstop: false,
    airlines: [] as string[],
    maxDuration: 24,
  });

  // Parse search params from URL
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departDate = searchParams.get('departDate') 
    ? new Date(searchParams.get('departDate') as string) 
    : new Date();
  const returnDate = searchParams.get('returnDate')
    ? new Date(searchParams.get('returnDate') as string)
    : new Date();
  const tripType = searchParams.get('tripType') || 'round-trip';
  const passengers = Number(searchParams.get('passengers')) || 1;
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  // Simulate API fetch
  useEffect(() => {
    const fetchFlights = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock data based on search
      const filtered = mockFlights.filter(flight => 
        flight.origin.code === origin &&
        flight.destination.code === destination
      );
      
      setFlights(filtered);
      setFilteredFlights(filtered);
      setLoading(false);
    };
    
    fetchFlights();
  }, [origin, destination]);

  // Apply filters
  useEffect(() => {
    let result = [...flights];
    
    // Filter by price
    result = result.filter(flight => flight.price <= filters.maxPrice);
    
    // Filter by stops
    if (filters.nonstop) {
      result = result.filter(flight => flight.stops.length === 0);
    }
    
    // Filter by airlines
    if (filters.airlines.length > 0) {
      result = result.filter(flight => 
        filters.airlines.includes(flight.airline.name)
      );
    }
    
    // Filter by duration
    result = result.filter(flight => {
      const duration = parseInt(flight.duration.split('h')[0]);
      return duration <= filters.maxDuration;
    });
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'duration') {
        const durationA = parseInt(a.duration.split('h')[0]);
        const durationB = parseInt(b.duration.split('h')[0]);
        return durationA - durationB;
      } else {
        // Sort by departure time
        const depTimeA = a.departureTime.replace(':', '');
        const depTimeB = b.departureTime.replace(':', '');
        return parseInt(depTimeA) - parseInt(depTimeB);
      }
    });
    
    setFilteredFlights(result);
  }, [flights, filters, sortBy]);

  // Extract unique airlines for filter
  const airlines = [...new Set(flights.map(flight => flight.airline.name))];

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Search Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">
                {origin} to {destination}
              </h1>
              <p className="text-gray-600">
                {formatDate(departDate)} {tripType === 'round-trip' ? `- ${formatDate(returnDate)}` : ''}
                 • {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'} • {cabinClass}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="mt-4 md:mt-0 btn btn-outline text-sm"
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h2>

              <div className="space-y-6">
                {/* Price Filter */}
                <div>
                  <h3 className="font-medium mb-2">Price</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Max ${filters.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Stops Filter */}
                <div>
                  <h3 className="font-medium mb-2">Stops</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.nonstop}
                      onChange={(e) => handleFilterChange('nonstop', e.target.checked)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Nonstop only</span>
                  </label>
                </div>

                {/* Airlines Filter */}
                <div>
                  <h3 className="font-medium mb-2">Airlines</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {airlines.map((airline) => (
                      <label key={airline} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.airlines.includes(airline)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('airlines', [...filters.airlines, airline]);
                            } else {
                              handleFilterChange(
                                'airlines',
                                filters.airlines.filter(a => a !== airline)
                              );
                            }
                          }}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span>{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="font-medium mb-2">Duration</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Max {filters.maxDuration} hours</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="1"
                    value={filters.maxDuration}
                    onChange={(e) => handleFilterChange('maxDuration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                {!loading && (
                  <p className="text-gray-600">
                    {filteredFlights.length} flights found
                  </p>
                )}
              </div>

              {/* Sort and Filter Buttons */}
              <div className="flex space-x-2">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    className="btn btn-outline flex items-center space-x-1"
                    onClick={() => {
                      // Cycle through sort options
                      if (sortBy === 'price') setSortBy('duration');
                      else if (sortBy === 'duration') setSortBy('departure');
                      else setSortBy('price');
                    }}
                  >
                    <ArrowDownUp size={16} />
                    <span>
                      Sort by: {sortBy === 'price' ? 'Price' : sortBy === 'duration' ? 'Duration' : 'Departure'}
                    </span>
                  </button>
                </div>

                {/* Mobile Filter Button */}
                <button
                  className="lg:hidden btn btn-outline flex items-center space-x-1"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Mobile Filters */}
            {filterOpen && (
              <div className="lg:hidden bg-white rounded-xl shadow-sm p-4 mb-4">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                <div className="space-y-6">
                  {/* Price Filter */}
                  <div>
                    <h3 className="font-medium mb-2">Price</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Max ${filters.maxPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Stops Filter */}
                  <div>
                    <h3 className="font-medium mb-2">Stops</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.nonstop}
                        onChange={(e) => handleFilterChange('nonstop', e.target.checked)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span>Nonstop only</span>
                    </label>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <h3 className="font-medium mb-2">Duration</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Max {filters.maxDuration} hours</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      step="1"
                      value={filters.maxDuration}
                      onChange={(e) => handleFilterChange('maxDuration', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="btn btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <Plane size={48} className="text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Finding the best flights for you...</h3>
                  <p className="text-gray-500">
                    This may take a moment as we search for the best options.
                  </p>
                </div>
              </div>
            ) : filteredFlights.length > 0 ? (
              <div className="space-y-4">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="flex flex-col items-center">
                  <AlertCircle size={48} className="text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any flights matching your criteria. Try adjusting your filters or search for different dates.
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="btn btn-primary"
                  >
                    Modify Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;