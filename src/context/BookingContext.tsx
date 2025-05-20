
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Route = {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  available: number;
};

export type Seat = {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
};

export type Booking = {
  route: Route | null;
  selectedSeats: Seat[];
  passenger: {
    name: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
};

type BookingContextType = {
  booking: Booking;
  availableRoutes: Route[];
  seats: Seat[];
  setRoute: (route: Route) => void;
  toggleSeatSelection: (seat: Seat) => void;
  setPassengerInfo: (info: Booking['passenger']) => void;
  resetBooking: () => void;
  confirmBooking: () => Promise<string>;
};

const defaultBooking: Booking = {
  route: null,
  selectedSeats: [],
  passenger: {
    name: '',
    email: '',
    phone: '',
  },
  totalPrice: 0,
};

// Mock data for routes
const mockRoutes: Route[] = [
  {
    id: '1',
    from: 'New York',
    to: 'Boston',
    departureTime: '08:00 AM',
    arrivalTime: '12:30 PM',
    price: 45,
    duration: '4h 30m',
    available: 32,
  },
  {
    id: '2',
    from: 'New York',
    to: 'Washington DC',
    departureTime: '09:15 AM',
    arrivalTime: '01:45 PM',
    price: 55,
    duration: '4h 30m',
    available: 28,
  },
  {
    id: '3',
    from: 'New York',
    to: 'Philadelphia',
    departureTime: '10:30 AM',
    arrivalTime: '12:30 PM',
    price: 35,
    duration: '2h',
    available: 40,
  },
  {
    id: '4',
    from: 'Boston',
    to: 'New York',
    departureTime: '02:00 PM',
    arrivalTime: '06:30 PM',
    price: 45,
    duration: '4h 30m',
    available: 25,
  },
  {
    id: '5',
    from: 'Washington DC',
    to: 'New York',
    departureTime: '07:30 AM',
    arrivalTime: '12:00 PM',
    price: 55,
    duration: '4h 30m',
    available: 30,
  },
  {
    id: '6',
    from: 'Philadelphia',
    to: 'New York',
    departureTime: '06:45 AM',
    arrivalTime: '08:45 AM',
    price: 35,
    duration: '2h',
    available: 38,
  },
  {
    id: '7',
    from: 'Boston',
    to: 'Washington DC',
    departureTime: '09:00 AM',
    arrivalTime: '05:30 PM',
    price: 75,
    duration: '8h 30m',
    available: 22,
  },
  {
    id: '8',
    from: 'Washington DC',
    to: 'Boston',
    departureTime: '10:15 AM',
    arrivalTime: '06:45 PM',
    price: 75,
    duration: '8h 30m',
    available: 18,
  },
  {
    id: '9',
    from: 'New York',
    to: 'Chicago',
    departureTime: '07:00 AM',
    arrivalTime: '08:00 PM',
    price: 120,
    duration: '13h',
    available: 15,
  },
  {
    id: '10',
    from: 'Chicago',
    to: 'New York',
    departureTime: '08:30 AM',
    arrivalTime: '09:30 PM',
    price: 120,
    duration: '13h',
    available: 12,
  },
  {
    id: '11',
    from: 'Philadelphia',
    to: 'Washington DC',
    departureTime: '11:00 AM',
    arrivalTime: '01:30 PM',
    price: 40,
    duration: '2h 30m',
    available: 35,
  },
  {
    id: '12',
    from: 'Washington DC',
    to: 'Philadelphia',
    departureTime: '03:45 PM',
    arrivalTime: '06:15 PM',
    price: 40,
    duration: '2h 30m',
    available: 42,
  },
  {
    id: '13',
    from: 'Boston',
    to: 'Philadelphia',
    departureTime: '12:30 PM',
    arrivalTime: '05:30 PM',
    price: 65,
    duration: '5h',
    available: 27,
  },
  {
    id: '14',
    from: 'Philadelphia',
    to: 'Boston',
    departureTime: '01:15 PM',
    arrivalTime: '06:15 PM',
    price: 65,
    duration: '5h',
    available: 24,
  },
  {
    id: '15',
    from: 'New York',
    to: 'Baltimore',
    departureTime: '04:00 PM',
    arrivalTime: '07:30 PM',
    price: 50,
    duration: '3h 30m',
    available: 33,
  },
];

// Generate mock seat data
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const totalRows = 10;
  const seatsPerRow = 5;
  
  for (let row = 1; row <= totalRows; row++) {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      // Skip the aisle seat (position 3)
      if (seatNum === 3) continue;
      
      const seatId = `${row}-${seatNum}`;
      const seatNumber = `${row}${String.fromCharCode(64 + seatNum)}`;
      
      // Make some seats unavailable randomly
      const isAvailable = Math.random() > 0.2;
      
      seats.push({
        id: seatId,
        number: seatNumber,
        isAvailable,
        isSelected: false,
      });
    }
  }
  
  return seats;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<Booking>(defaultBooking);
  const [availableRoutes] = useState<Route[]>(mockRoutes);
  const [seats] = useState<Seat[]>(generateSeats());

  const setRoute = (route: Route) => {
    setBooking((prev) => ({
      ...prev,
      route,
      selectedSeats: [],
      totalPrice: 0,
    }));
  };

  const toggleSeatSelection = (seat: Seat) => {
    if (!seat.isAvailable || !booking.route) return;

    const updatedSeats = seats.map((s) =>
      s.id === seat.id ? { ...s, isSelected: !s.isSelected } : s
    );
    
    const selectedSeats = updatedSeats.filter((s) => s.isSelected);
    const totalPrice = selectedSeats.length * (booking.route?.price || 0);
    
    setBooking((prev) => ({
      ...prev,
      selectedSeats,
      totalPrice,
    }));
  };

  const setPassengerInfo = (info: Booking['passenger']) => {
    setBooking((prev) => ({
      ...prev,
      passenger: info,
    }));
  };

  const resetBooking = () => {
    setBooking(defaultBooking);
  };

  const confirmBooking = async (): Promise<string> => {
    // This would normally call an API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookingNumber = Math.floor(100000 + Math.random() * 900000).toString();
        resolve(bookingNumber);
      }, 1500);
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        availableRoutes,
        seats,
        setRoute,
        toggleSeatSelection,
        setPassengerInfo,
        resetBooking,
        confirmBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
