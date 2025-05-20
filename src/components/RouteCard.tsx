
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking, Route } from '@/context/BookingContext';

type RouteCardProps = {
  route: Route;
};

const RouteCard = ({ route }: RouteCardProps) => {
  const navigate = useNavigate();
  const { setRoute } = useBooking();

  const handleSelectRoute = () => {
    setRoute(route);
    navigate('/seat-selection');
  };

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="bg-bus-primary text-white p-4 flex flex-col justify-center items-center md:items-start">
            <p className="text-sm font-medium">Bus</p>
            <p className="text-xl font-bold">${route.price}</p>
          </div>
          
          <div className="p-4 md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-bold text-gray-800">{route.departureTime}</p>
                <p className="text-sm text-gray-600">{route.from}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Arrival</p>
                <p className="font-bold text-gray-800">{route.arrivalTime}</p>
                <p className="text-sm text-gray-600">{route.to}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-bold text-gray-800">{route.duration}</p>
              </div>
              
              <div className="flex items-center justify-end">
                <Button
                  onClick={handleSelectRoute}
                  className="bg-bus-accent hover:bg-bus-secondary text-white"
                >
                  Select Seats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-4 py-2 text-sm">
        <div className="flex justify-between w-full">
          <p>{route.available} seats available</p>
          <p className="text-bus-primary">Free WiFi • AC • Power Outlets</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RouteCard;
