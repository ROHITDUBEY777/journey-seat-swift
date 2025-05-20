
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ETicket from '@/components/ETicket';
import { generateTicket } from '@/utils/ticketGenerator';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();
  const { toast } = useToast();
  
  const bookingNumber = location.state?.bookingNumber;
  const eTicketRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!bookingNumber || !booking.route) {
      navigate('/');
    }
  }, [bookingNumber, booking, navigate]);
  
  const handleReturnHome = () => {
    resetBooking();
    navigate('/');
  };
  
  const handleDownloadTicket = async () => {
    try {
      await generateTicket(eTicketRef);
      toast({
        title: "Success!",
        description: "E-Ticket has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating ticket:", error);
      toast({
        title: "Error",
        description: "Failed to download E-Ticket. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!bookingNumber || !booking.route) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Card className="border-t-8 border-green-500">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 bg-green-100 rounded-full p-3 inline-block">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl md:text-3xl">Booking Confirmed!</CardTitle>
              <p className="text-gray-500 mt-2">
                Your booking has been successfully processed
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Booking Reference</p>
                <p className="text-2xl font-bold text-bus-primary">{bookingNumber}</p>
              </div>
              
              <div className="border-t border-b py-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Trip Details</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{booking.route.from}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{booking.route.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-medium">{booking.route.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="font-medium">{booking.route.arrivalTime}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Passenger</h3>
                  <p className="mt-1">{booking.passenger.name}</p>
                  <p className="text-sm text-gray-500">{booking.passenger.email}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Seats</h3>
                  <p className="mt-1">
                    {booking.selectedSeats.map(seat => seat.number).join(', ')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Payment</h3>
                  <div className="flex justify-between mt-1">
                    <p>Total Paid</p>
                    <p className="font-bold text-bus-primary">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <Button 
                  variant="outline" 
                  className="border-bus-primary text-bus-primary"
                  onClick={handleDownloadTicket}
                >
                  <Download className="h-4 w-4 mr-2" /> Download E-Ticket
                </Button>
                
                <div>
                  <Button 
                    onClick={handleReturnHome}
                    className="bg-bus-primary hover:bg-bus-secondary w-full"
                  >
                    Return to Home
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  A confirmation email has been sent to {booking.passenger.email}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hidden E-Ticket component for PDF generation */}
          <div className="hidden">
            <ETicket ref={eTicketRef} booking={booking} bookingNumber={bookingNumber} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
