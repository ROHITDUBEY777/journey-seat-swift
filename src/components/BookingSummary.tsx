
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

type BookingSummaryProps = {
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
};

const BookingSummary = ({ 
  showButton = true, 
  buttonText = 'Continue', 
  onButtonClick 
}: BookingSummaryProps) => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  if (!booking.route) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>No booking information available</p>
        </CardContent>
      </Card>
    );
  }

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Route</h4>
          <p className="text-lg font-medium">
            {booking.route.from} to {booking.route.to}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
          <p>Departure: {booking.route.departureTime}</p>
          <p>Arrival: {booking.route.arrivalTime}</p>
        </div>

        {booking.selectedSeats.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Selected Seats</h4>
            <p>
              {booking.selectedSeats.map(seat => seat.number).join(', ')}
              {' '}
              ({booking.selectedSeats.length} {booking.selectedSeats.length === 1 ? 'seat' : 'seats'})
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span>Ticket Price</span>
            <span>${booking.route.price} × {booking.selectedSeats.length}</span>
          </div>
          
          <div className="flex justify-between items-center font-medium text-lg mt-2">
            <span>Total Amount</span>
            <span className="text-bus-primary">${booking.totalPrice}</span>
          </div>
        </div>
      </CardContent>

      {showButton && (
        <CardFooter>
          <Button
            onClick={handleButtonClick}
            disabled={booking.selectedSeats.length === 0}
            className="w-full bg-bus-primary hover:bg-bus-secondary"
          >
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingSummary;
