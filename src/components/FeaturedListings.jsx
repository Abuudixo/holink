import React, { useState } from 'react';
import { Heart, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { listings } from '../data/listings';


const FeaturedListings = () => {
    const [likes, setLikes] = useState({});
    const navigate = useNavigate();

    const toggleLike = (id) => {
        setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="bg-gray-50/50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 px-3 py-1 bg-red-50 rounded-lg inline-block">Handpicked</span>
                        <h2 className="text-3xl md:text-3xl font-display font-bold text-gray-900">Featured Listings</h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                        View all listings
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <div 
                            key={listing.id} 
                            onClick={() => navigate(`/product/${listing.id}`)}
                            className="bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Like Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleLike(listing.id); }}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                                >
                                    <Heart size={16} className={likes[listing.id] ? 'fill-red-500 text-red-500' : ''} />
                                </button>

                                {/* Tag */}
                                {listing.tag && (
                                    <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                        {listing.tag}
                                    </span>
                                )}
                            </div>

                            <div className="px-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-display font-bold text-gray-900 truncate pr-2">{listing.title}</h3>
                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                                        <Star size={12} className="fill-primary text-primary" />
                                        {listing.rating}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs mb-3">{listing.location}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-primary font-bold text-lg">${listing.price}</span>
                                    <span className="text-gray-400 text-xs">/ {listing.unit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="md:hidden w-full mt-8 flex items-center justify-center gap-2 text-primary font-bold text-sm border border-primary/20 p-3 rounded-xl">
                    View all listings
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default FeaturedListings;
