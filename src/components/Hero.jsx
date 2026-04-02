import React, { useState } from 'react';
import { MapPin, Calendar, LayoutGrid, Search } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-gradient-to-b from-orange-50/50 to-white pt-20 pb-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-100/30 to-transparent skew-x-12 opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Quick & Seamless Rentals
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-display font-black text-gray-900 mb-6 leading-tight tracking-tight">
                    Mogadishu <span className="text-primary italic">HouseStays</span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-700 mb-6">
                    Luxury Homes & Apartments
                </h2>

                <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-12 font-medium">
                    Discover premium rentals in the most vibrant neighborhoods of the Somalia capital. Find your home with confidence.
                </p>




            </div>
        </div>
    );
};

export default Hero;
