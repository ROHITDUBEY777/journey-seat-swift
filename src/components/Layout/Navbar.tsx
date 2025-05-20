
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
            <button className="bg-bus-accent hover:bg-bus-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
              Login / Sign Up
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-bus-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
