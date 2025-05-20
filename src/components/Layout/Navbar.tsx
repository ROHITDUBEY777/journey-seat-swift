
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-bus-primary">BusBooker</h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-bus-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/routes"
                className="text-gray-700 hover:text-bus-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Routes
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-bus-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-bus-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="flex items-center text-gray-700 hover:text-bus-primary px-3 py-2 rounded-md text-sm font-medium">
                  <User className="h-4 w-4 mr-1" />
                  {user?.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center bg-bus-accent hover:bg-bus-secondary text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center bg-bus-accent hover:bg-bus-secondary text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login / Sign Up
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-bus-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/routes"
              className="text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Routes
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="flex items-center text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-bus-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
