
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";

import Index from "./pages/Index";
import RoutesPage from "./pages/Routes";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
