
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToPopularRoutes = () => {
    const routesSection = document.querySelector('#popular-routes');
    if (routesSection) {
      routesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-bus-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Travel with Comfort & Safety
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Book your bus tickets easily and enjoy a seamless journey to your destination. 
              Choose from hundreds of routes across the country.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={scrollToPopularRoutes}
                className="bg-bus-accent hover:bg-bus-secondary text-white px-6 py-3 rounded-md text-base font-medium"
              >
                View Popular Routes
              </button>
              <button 
                onClick={() => navigate('/routes')}
                className="bg-white text-bus-primary hover:bg-gray-100 px-6 py-3 rounded-md text-base font-medium"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-xl p-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
