
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Shraddha Calendar</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-blue-200 transition-colors">Home</a></li>
              <li><a href="/monthly" className="hover:text-blue-200 transition-colors">Monthly View</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Settings</a></li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <ul className="space-y-3">
              <li><a href="/" className="block py-2 hover:bg-blue-500/20 px-3 rounded transition-colors">Home</a></li>
              <li><a href="/monthly" className="block py-2 hover:bg-blue-500/20 px-3 rounded transition-colors">Monthly View</a></li>
              <li><a href="#" className="block py-2 hover:bg-blue-500/20 px-3 rounded transition-colors">Events</a></li>
              <li><a href="#" className="block py-2 hover:bg-blue-500/20 px-3 rounded transition-colors">Settings</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
