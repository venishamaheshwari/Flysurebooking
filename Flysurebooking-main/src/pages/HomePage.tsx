import { motion } from 'framer-motion';
import { ArrowRight, Cloud, MoveDown, Navigation, Plane } from 'lucide-react';
import React from 'react';
import FlightSearchForm from '../components/search/FlightSearchForm';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section with Flight Search */}
      <section className="relative min-h-screen bg-gradient-hero text-white pt-24 pb-16">
        {/* Animated Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute left-[10%] top-[15%] text-white/10"
            animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          >
            <Cloud size={120} />
          </motion.div>
          <motion.div 
            className="absolute right-[15%] top-[25%] text-white/10"
            animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          >
            <Cloud size={80} />
          </motion.div>
          <motion.div 
            className="absolute left-[20%] bottom-[20%] text-white/10"
            animate={{ x: [0, 25, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          >
            <Cloud size={100} />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Travel Smarter with AI-Powered Insights</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Find the perfect flight, get personalized recommendations, and explore new destinations with ease.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FlightSearchForm />
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2">Explore More</span>
          <MoveDown size={20} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FlySmart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes travel planning smarter, easier, and more personalized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Chatbot Assistant */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Travel Assistant</h3>
              <p className="text-gray-600">
                Our smart AI chatbot answers all your travel questions and helps you find the perfect flights based on your preferences.
              </p>
            </div>

            {/* Multi-Currency Support */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl font-bold">$€¥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Currency Support</h3>
              <p className="text-gray-600">
                View and compare flight prices in your preferred currency with real-time exchange rates.
              </p>
            </div>

            {/* Layover Recommendations */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Layover Recommendations</h3>
              <p className="text-gray-600">
                Turn long layovers into mini-adventures with personalized recommendations for activities near the airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover trending destinations loved by travelers around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div 
                key={index} 
                className="card card-hover overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm text-white/90">{destination.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">Flights from $299</span>
                    <button className="text-secondary flex items-center text-sm font-medium hover:text-primary transition-colors">
                      <span>Explore</span>
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read testimonials from travelers who have used FlySmart to plan their journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="mt-4 text-yellow-400 flex">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the FlySmart App</h2>
              <p className="text-xl text-blue-100 mb-6">
                Download our mobile app for a seamless travel experience on the go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn bg-white text-primary hover:bg-blue-50 flex items-center justify-center py-3">
                  <span className="mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5227 7.39674C17.4373 7.47039 15.9287 8.31865 15.9287 10.1883C16.0295 12.3005 17.8119 13.0249 17.8525 13.0394C17.8322 13.1014 17.5128 14.2 16.6932 15.3281C16.0045 16.3082 15.2787 17.2887 14.158 17.3093C13.0782 17.3297 12.69 16.7223 11.4502 16.7223C10.2104 16.7223 9.78084 17.2887 8.76233 17.3297C7.66217 17.3712 6.81268 16.2432 6.11379 15.2689C4.68328 13.2684 3.57594 9.71288 5.04791 7.32634C5.77835 6.14553 7.04967 5.40925 8.42436 5.38878C9.46318 5.36848 10.4225 6.04703 11.0693 6.04703C11.7162 6.04703 12.8982 5.21904 14.1426 5.36848C14.6739 5.38878 16.0505 5.58653 16.9377 6.93062C16.8428 6.98716 17.6249 7.30189 17.5227 7.39674ZM14.902 4.32093C15.4769 3.62218 15.8645 2.65016 15.7474 1.67798C14.9117 1.71855 13.8825 2.24577 13.2757 2.94435C12.7363 3.55176 12.2586 4.5433 12.3961 5.4948C13.3169 5.57964 14.3271 5.01965 14.902 4.32093Z" fill="#222222"/>
                    </svg>
                  </span>
                  App Store
                </button>
                <button className="btn bg-white text-primary hover:bg-blue-50 flex items-center justify-center py-3">
                  <span className="mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.60001 20.4001C3.60001 20.8418 3.95817 21.2001 4.40001 21.2001H19.6C20.0418 21.2001 20.4 20.8418 20.4 20.4001V12.0001H3.60001V20.4001ZM10.8 15.6001H13.2V18.0001H10.8V15.6001ZM19.6 5.20006H16.36L14.868 3.70806C14.5894 3.42938 14.2037 3.27226 13.8 3.27226C13.3963 3.27226 13.0106 3.42938 12.732 3.70806L11.24 5.20006H4.40001C3.95817 5.20006 3.60001 5.55834 3.60001 6.00006V10.8001H20.4V6.00006C20.4 5.55834 20.0418 5.20006 19.6 5.20006ZM13.8 5.20006C13.5791 5.20006 13.4 5.02097 13.4 4.80006C13.4 4.57914 13.5791 4.40006 13.8 4.40006C14.0209 4.40006 14.2 4.57914 14.2 4.80006C14.2 5.02097 14.0209 5.20006 13.8 5.20006Z" fill="#222222"/>
                    </svg>
                  </span>
                  Google Play
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="FlySmart Mobile App" 
                className="rounded-xl shadow-xl max-w-full mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sample data for the homepage
const destinations = [
  {
    name: 'Paris',
    country: 'France',
    description: 'Experience the romance and charm of the City of Light.',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description: 'Explore the fascinating blend of tradition and innovation.',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'New York',
    country: 'United States',
    description: 'Discover the vibrant energy of the city that never sleeps.',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'Relax in tropical paradise surrounded by natural beauty.',
    image: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Enjoy breathtaking landscapes where mountains meet the sea.',
    image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Rome',
    country: 'Italy',
    description: 'Step back in time through ancient ruins and Renaissance art.',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Frequent Traveler',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'The AI assistant recommended an amazing restaurant during my 6-hour layover in Amsterdam. It completely transformed what would have been a boring wait!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    title: 'Business Traveler',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Being able to see prices in multiple currencies helped me make better decisions for my company travel budget. The interface is intuitive and the predictions are spot on.',
    rating: 4
  },
  {
    name: 'Priya Sharma',
    title: 'Family Vacation Planner',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Planning a trip for 5 family members was so much easier with FlySmart. The chatbot helped me find flights with good seating arrangements for our kids.',
    rating: 5
  }
];

export default HomePage;