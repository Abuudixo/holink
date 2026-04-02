import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategorySection = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
            <div className="flex justify-center">

                {/* Homes Card */}
                <div className="group relative h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl shadow-gray-200/50">
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-e32870024041?auto=format&fit=crop&q=80&w=800"
                        alt="Modern House"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider mb-3 inline-block">
                            Mogadishu HouseStays
                        </span>
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Luxury Villas & Apartments</h3>
                        <p className="text-gray-200 mb-6 text-sm max-w-sm">Find the perfect home in Somalia's capital, from beachfront villas to modern city penthouses.</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CategorySection;
