
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking, Route } from '@/context/BookingContext';

const FeaturedRoutes = () => {
  const navigate = useNavigate();
  const { availableRoutes, setRoute } = useBooking();

  const handleSelectRoute = (route: Route) => {
    setRoute(route);
    navigate('/seat-selection');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Routes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular bus routes with competitive prices and convenient schedules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRoutes.slice(0, 6).map((route) => (
            <Card key={route.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-bus-primary text-white">
                <CardTitle className="flex justify-between items-center">
                  <span>{route.from}</span>
                  <span className="text-sm">➔</span>
                  <span>{route.to}</span>
                </CardTitle>
                <CardDescription className="text-gray-200">
                  {route.duration} journey
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Departure</p>
                    <p>{route.departureTime}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Arrival</p>
                    <p>{route.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Available</p>
                    <p>{route.available} seats</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-gray-50 border-t">
                <p className="text-xl font-bold text-bus-primary">${route.price}</p>
                <Button 
                  onClick={() => handleSelectRoute(route)}
                  className="bg-bus-accent hover:bg-bus-secondary text-white"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            onClick={() => navigate('/routes')}
            variant="outline" 
            className="border-bus-primary text-bus-primary hover:bg-bus-primary hover:text-white"
          >
            View All Routes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoutes;
