
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our user and auth context
export type User = {
  id: string;
  name: string;
  email: string;
  bookings: BookingInfo[];
};

export type BookingInfo = {
  id: string;
  routeId: string;
  routeName: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  seatNumbers: string[];
  price: number;
  date: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Create a mock user
const mockUser: User = {
  id: '1',
  name: 'Ritvik Kowshik',
  email: 'ritvik@example.com',
  bookings: [
    {
      id: 'booking-1',
      routeId: 'route-1',
      routeName: 'New York to Boston',
      departureDate: '2025-05-25',
      departureTime: '10:00 AM',
      arrivalTime: '2:00 PM',
      seatNumbers: ['A1', 'A2'],
      price: 75.00,
      date: '2025-05-20',
    },
    {
      id: 'booking-2',
      routeId: 'route-3',
      routeName: 'Boston to Washington DC',
      departureDate: '2025-06-10',
      departureTime: '08:30 AM',
      arrivalTime: '3:45 PM',
      seatNumbers: ['B5'],
      price: 85.50,
      date: '2025-05-15',
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check local storage on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('busBookerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, we would call an API here
    if (email === 'ritvik@example.com' && password === '123456') {
      localStorage.setItem('busBookerUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, we would call an API here
    if (email === 'ritvik@example.com') {
      // Already exists
      return false;
    }
    
    // For now, we'll only accept registering the mock user
    // In a real app, we'd create a new user entry
    if (name && email && password) {
      const newUser = {
        ...mockUser,
        name,
        email
      };
      
      localStorage.setItem('busBookerUser', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('busBookerUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
