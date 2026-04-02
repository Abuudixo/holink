import React, { useState } from 'react';
import { Search, MapPin, Star, Heart, ArrowRight, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { listings } from '../data/listings';

const RentHomes = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [likes, setLikes] = useState({});

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredListings = listings.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header & Search */}
            <div className="bg-gray-50/50 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                            Explore <span className="text-primary italic">Luxurious</span> Homes
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Browse our curated selection of premium properties across the globe, from Nordic cabins to Mediterranean penthouses.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 w-full flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                                <Search className="text-primary mr-3" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Search by district or property name..."
                                    className="w-full outline-none text-gray-700 font-medium placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4 px-6 py-3 min-w-[180px] hidden lg:flex">
                                <MapPin className="text-gray-400" size={18} />
                                <span className="text-sm font-bold text-dark">Mogadishu</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                            <button className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-[1.5rem] font-bold transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                                Search
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-primary hover:text-primary transition-all">
                                <SlidersHorizontal size={16} />
                                Filters
                            </button>
                            {['Beachfront', 'Executive', 'Historic', 'Hodan', 'Abdiaziz'].map((cat) => (
                                <button key={cat} className="px-6 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-primary hover:text-primary transition-all">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                        {filteredListings.length} {filteredListings.length === 1 ? 'Home' : 'Homes'} available
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <span>Sort by:</span>
                        <button className="text-dark hover:text-primary transition-colors flex items-center gap-1">
                            Newest <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredListings.map((listing) => (
                        <div 
                            key={listing.id} 
                            onClick={() => navigate(`/product/${listing.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-md transition-shadow hover:shadow-xl">
                                <img 
                                    src={listing.image} 
                                    alt={listing.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <button 
                                    onClick={(e) => toggleLike(e, listing.id)}
                                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-lg active:scale-90"
                                >
                                    <Heart size={20} className={likes[listing.id] ? 'fill-red-500 text-red-500' : ''} />
                                </button>

                                {listing.tag && (
                                    <span className="absolute bottom-6 left-6 bg-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-dark shadow-lg">
                                        {listing.tag}
                                    </span>
                                )}
                            </div>

                            <div className="px-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-primary transition-colors">{listing.title}</h3>
                                    <div className="flex items-center gap-1 font-bold text-sm bg-gray-50 px-2 py-1 rounded-lg">
                                        <Star size={14} className="fill-primary text-primary" />
                                        {listing.rating}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                                    <MapPin size={14} />
                                    <span>{listing.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-display font-bold text-dark">${listing.price}</span>
                                        <span className="text-gray-400 text-xs font-medium">/{listing.unit}</span>
                                    </div>
                                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredListings.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-2">No homes found</h3>
                        <p className="text-gray-500">Try adjusting your search query or filters.</p>
                        <button onClick={() => setSearchQuery('')} className="mt-6 text-primary font-bold hover:underline">
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RentHomes;
