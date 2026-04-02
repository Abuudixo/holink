import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 transition-all">
                        <img src={logo} alt="HoyLink Logo" className="h-16 md:h-20 w-auto object-contain" />
                    </Link>


                    {/* Center Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/rentals" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Rent Homes</Link>
                        <Link to="/contacts" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Contacts</Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <Globe size={20} />
                        </button>
                        <Link 
                            to="/login"
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-primary/25"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
