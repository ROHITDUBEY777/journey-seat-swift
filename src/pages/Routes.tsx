
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import RouteCard from '@/components/RouteCard';
import { useBooking } from '@/context/BookingContext';

const Routes = () => {
  const { availableRoutes } = useBooking();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Available Routes</h1>
            <p className="text-gray-600">Select your preferred bus route</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-bus-primary focus:ring-bus-primary">
                  <option>New York</option>
                  <option>Boston</option>
                  <option>Washington DC</option>
                  <option>Philadelphia</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-bus-primary focus:ring-bus-primary">
                  <option>Boston</option>
                  <option>New York</option>
                  <option>Washington DC</option>
                  <option>Philadelphia</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-bus-primary focus:ring-bus-primary" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex items-end">
                <button className="bg-bus-primary hover:bg-bus-secondary text-white px-6 py-2 rounded-md">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div>
            {availableRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Routes;
