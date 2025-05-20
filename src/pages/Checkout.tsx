
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import BookingSummary from '@/components/BookingSummary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useBooking } from '@/context/BookingContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { booking, setPassengerInfo, confirmBooking } = useBooking();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!booking.route || booking.selectedSeats.length === 0) {
      navigate('/routes');
    }
  }, [booking, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    setPassengerInfo({
      name,
      email,
      phone,
    });
    
    try {
      const bookingNumber = await confirmBooking();
      navigate('/confirmation', { state: { bookingNumber } });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your booking",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  if (!booking.route || booking.selectedSeats.length === 0) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600">Enter passenger details to complete your reservation</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Passenger Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Your e-ticket will be sent to this email
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="Enter name on card" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-bus-primary hover:bg-bus-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Confirm & Pay'}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By confirming, you agree to our Terms & Conditions and Privacy Policy
                  </p>
                </form>
              </Card>
            </div>
            
            <div>
              <BookingSummary showButton={false} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
