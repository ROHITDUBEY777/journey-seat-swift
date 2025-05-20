
import React, { forwardRef } from 'react';
import { Booking } from '@/context/BookingContext';
import { Download, Ticket } from 'lucide-react';

interface ETicketProps {
  booking: Booking;
  bookingNumber: string;
}

const ETicket = forwardRef<HTMLDivElement, ETicketProps>(
  ({ booking, bookingNumber }, ref) => {
    if (!booking.route) return null;

    return (
      <div 
        ref={ref} 
        className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto"
        style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
      >
        <div className="border-b-2 border-dashed border-gray-300 pb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-bus-primary mr-2" />
              <h2 className="text-xl font-bold text-bus-primary">Bus E-Ticket</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Booking Reference</p>
              <p className="text-xl font-bold text-bus-primary">{bookingNumber}</p>
            </div>
          </div>
          
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">From</p>
              <p className="font-medium text-lg">{booking.route.from}</p>
            </div>
            <div className="flex items-center px-4">
              <div className="h-0.5 w-16 bg-gray-300 relative">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-bus-primary"></div>
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-bus-primary"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">To</p>
              <p className="font-medium text-lg">{booking.route.to}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Departure</p>
              <p className="font-medium">{booking.route.departureTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Arrival</p>
              <p className="font-medium">{booking.route.arrivalTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium">{booking.route.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium">May 20, 2025</p>
            </div>
          </div>
        </div>
        
        <div className="py-4 border-b-2 border-dashed border-gray-300">
          <div className="mb-4">
            <p className="text-xs text-gray-500">Passenger</p>
            <p className="font-medium">{booking.passenger.name}</p>
            <p className="text-sm text-gray-500">{booking.passenger.email}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500">Seats</p>
            <p className="font-medium">
              {booking.selectedSeats.map(seat => seat.number).join(', ')}
            </p>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="font-bold text-bus-primary text-lg">${booking.totalPrice}</p>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>Please arrive 30 minutes before departure.</p>
            <p>This ticket must be presented at boarding.</p>
          </div>
        </div>
      </div>
    );
  }
);

ETicket.displayName = 'ETicket';

export default ETicket;
