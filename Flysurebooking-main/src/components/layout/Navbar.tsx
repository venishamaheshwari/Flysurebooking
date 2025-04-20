import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, LogIn, ChevronDown } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import { useCurrencyContext } from '../../contexts/CurrencyContext';
import CurrencySelector from '../common/CurrencySelector';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { user, logout } = useUserContext();
  const { currency } = useCurrencyContext();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCurrency = () => setIsCurrencyOpen(!isCurrencyOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <span className={isScrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}>
              Fly<span className="text-accent">Sure</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/search" 
              className={`font-medium transition-colors ${
                isScrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
              }`}
            >
              Flights
            </Link>
            <div className="relative">
              <button 
                onClick={toggleCurrency}
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                }`}
              >
                <Globe size={16} />
                <span>{currency}</span>
                <ChevronDown size={16} />
              </button>
              
              {isCurrencyOpen && (
                <CurrencySelector onClose={() => setIsCurrencyOpen(false)} />
              )}
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    isScrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                  }`}
                >
                  <User size={16} />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                }`}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20">
          <div className="px-4 py-6 space-y-6">
            <Link 
              to="/search" 
              className="block text-lg font-medium text-gray-800 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            <div>
              <button
                onClick={toggleCurrency}
                className="flex items-center space-x-2 text-lg font-medium text-gray-800 hover:text-primary"
              >
                <Globe size={20} />
                <span>{currency}</span>
                <ChevronDown size={20} />
              </button>
              
              {isCurrencyOpen && (
                <div className="mt-2 space-y-2 pl-8">
                  <CurrencySelector onClose={() => setIsCurrencyOpen(false)} />
                </div>
              )}
            </div>
            
            {user ? (
              <div className="space-y-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-lg font-medium text-gray-800 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn btn-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 text-lg font-medium text-gray-800 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;