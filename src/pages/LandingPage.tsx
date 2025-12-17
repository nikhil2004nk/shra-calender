import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import { CalendarDays, CalendarRange, Calendar as CalendarIcon } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageContainer className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Shraddha Calendar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your personal event and movie tracking calendar. Never miss an important date again.
          </p>
          </div>  
          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {/* Current Month Card */}
            <Link
              to="/current-month"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CalendarDays className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Month</h3>
              <p className="text-gray-600 mb-4">View this month's calendar with all events and movie releases</p>
              <span className="mt-auto text-blue-600 font-medium">View Now →</span>
            </Link>

            {/* Month Selection Card */}
            <Link
              to="/month-selection"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <CalendarRange className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">View Calendar</h3>
              <p className="text-gray-600 mb-4">Select any month from January to December to view events</p>
              <span className="mt-auto text-purple-600 font-medium">Choose Month →</span>
            </Link>

            {/* Monthly View Card */}
            <Link
              to="/monthly"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly View</h3>
              <p className="text-gray-600 mb-4">Detailed monthly view with all your events and movies</p>
              <span className="mt-auto text-green-600 font-medium">Explore →</span>
            </Link>
          </div>
      

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Events</h3>
            <p className="text-gray-600">
              Keep track of all your important events, meetings, and appointments in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-2xl">🎬</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Movie Releases</h3>
            <p className="text-gray-600">
              Never miss a movie release. Get notified about upcoming movies you're interested in.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600">
              Quickly find events and movies with our powerful search functionality.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
