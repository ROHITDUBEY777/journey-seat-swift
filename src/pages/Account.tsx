
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Bus, Ticket } from 'lucide-react';

const Account = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-bus-light p-6 rounded-full">
                    <User className="h-12 w-12 text-bus-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.bookings && user.bookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Route</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Seats</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.routeName}</TableCell>
                          <TableCell>{booking.departureDate}</TableCell>
                          <TableCell>{booking.departureTime}</TableCell>
                          <TableCell>{booking.seatNumbers.join(', ')}</TableCell>
                          <TableCell>${booking.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bus className="h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No bookings yet</h3>
                    <p className="text-gray-500 mt-1">
                      Your booking history will appear here once you make a booking.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
