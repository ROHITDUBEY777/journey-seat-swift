
import React from 'react';
import { useBooking } from '@/context/BookingContext';

const SeatMap = () => {
  const { seats, toggleSeatSelection, booking } = useBooking();

  if (!booking.route) {
    return <div className="text-center py-8">Please select a route first</div>;
  }

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    const [row] = seat.id.split('-');
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, typeof seats>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Select Your Seats</h3>
        <p className="text-gray-600">Click on an available seat to select it</p>
        
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="bus-seat bus-seat-available w-5 h-5"></div>
            <span className="ml-2 text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="bus-seat bus-seat-selected w-5 h-5"></div>
            <span className="ml-2 text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="bus-seat bus-seat-unavailable w-5 h-5"></div>
            <span className="ml-2 text-sm">Unavailable</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Bus front */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-10 bg-gray-300 rounded-t-full flex items-center justify-center text-sm font-medium">
            Driver
          </div>
        </div>
        
        {/* Seat map */}
        <div className="border-2 border-gray-300 p-4 rounded-lg">
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div key={row} className="bus-layout mb-2">
              {/* Create a 5-column grid for each row */}
              {[1, 2, 3, 4, 5].map(position => {
                const seat = rowSeats.find(s => s.id.split('-')[1] === position.toString());
                
                // If position is 3, it's an aisle
                if (position === 3) {
                  return <div key={`${row}-aisle`} className="bus-seat bus-aisle"></div>;
                }
                
                // If seat doesn't exist (might happen for aisle), return empty cell
                if (!seat) return <div key={`${row}-${position}`} className="bus-seat bus-aisle"></div>;
                
                // Determine seat class based on availability and selection
                let seatClass = 'bus-seat ';
                if (!seat.isAvailable) {
                  seatClass += 'bus-seat-unavailable';
                } else if (seat.isSelected) {
                  seatClass += 'bus-seat-selected';
                } else {
                  seatClass += 'bus-seat-available';
                }
                
                return (
                  <div
                    key={seat.id}
                    className={seatClass}
                    onClick={() => seat.isAvailable && toggleSeatSelection(seat)}
                  >
                    {seat.number}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
