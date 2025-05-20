
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const popularCities = [
  'New York', 
  'Boston', 
  'Washington DC', 
  'Philadelphia', 
  'Chicago', 
  'Los Angeles',
  'Miami',
  'Atlanta',
  'Dallas',
  'Houston'
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/routes');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Bus</h2>
      <form onSubmit={handleSearch}>
        <div className="space-y-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
            <Select value={fromCity} onValueChange={setFromCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select departure city" />
              </SelectTrigger>
              <SelectContent>
                {popularCities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <Select value={toCity} onValueChange={setToCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination city" />
              </SelectTrigger>
              <SelectContent>
                {popularCities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-bus-accent hover:bg-bus-secondary text-white"
            disabled={!fromCity || !toCity || !date}
          >
            Search Buses
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
