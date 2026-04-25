import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    Star, MapPin, Share2, Heart, ChevronLeft, ChevronRight, 
    Wifi, Coffee, Car, Wind, ShieldCheck, Calendar, Users, 
    ArrowLeft, CheckCircle2
} from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { useLanguage } from '../context/LanguageContext';
import { useInterest } from '../context/InterestContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { t } = useLanguage();
    const { listings } = useListings();
    const [listing, setListing] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    const { addInterest } = useInterest();
    const [interestSent, setInterestSent] = useState(false);

    const handleInterest = () => {
        addInterest(listing);
        setInterestSent(true);
        setTimeout(() => setInterestSent(false), 3000);
    };

    useEffect(() => {
        const found = listings.find(l => l.id === parseInt(id));
        if (found) {
            setListing(found);
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (!listing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Listing not found</h2>
                <Link to="/" className="text-primary font-bold flex items-center gap-2 hover:underline">
                    <ArrowLeft size={18} />
                    Back to home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <Link to="/rentals" className="flex items-center gap-2 text-gray-500 hover:text-dark transition-colors font-medium">
                        <ArrowLeft size={18} />
                        <span>{t('prod_back')}</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-dark transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-100">
                            <Share2 size={18} />
                            <span className="hidden sm:inline">{t('prod_share')}</span>
                        </button>
                        <button 
                            onClick={() => setIsLiked(!isLiked)}
                            className={`flex items-center gap-2 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-100 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-dark'}`}
                        >
                            <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
                            <span className="hidden sm:inline">{isLiked ? t('prod_saved') : t('prod_save')}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[300px] sm:h-[400px] lg:h-[550px]">
                    <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group">
                        <img 
                            src={listing.images[activeImage]} 
                            alt={listing.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <button 
                            onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : listing.images.length - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full text-dark shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => setActiveImage(prev => prev < listing.images.length - 1 ? prev + 1 : 0)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full text-dark shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
                        {listing.images.slice(1, 3).map((img, idx) => (
                            <div key={idx} className="relative rounded-3xl overflow-hidden cursor-pointer group" onClick={() => setActiveImage(idx + 1)}>
                                <img 
                                    src={img} 
                                    alt="Gallery" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-8">
                        <div className="border-b border-gray-100 pb-8">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {listing.tag && (
                                    <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {listing.tag}
                                    </span>
                                )}
                                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                                    <Star size={16} className="fill-primary text-primary" />
                                    {listing.rating}
                                    <span className="text-gray-400 font-medium ml-1">({listing.reviews} reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">{listing.title}</h1>
                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin size={18} className="text-primary" />
                                <span className="font-medium">{listing.location}</span>
                            </div>
                        </div>

                        {/* Host Info */}
                        <div className="flex items-center justify-between py-8 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={listing.host.avatar} alt={listing.host.name} className="w-14 h-14 rounded-full object-cover" />
                                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
                                        <ShieldCheck size={12} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-gray-900">{t('prod_hosted')} {listing.host.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium">Professional Host • Superhost</p>
                                </div>
                            </div>
                            <button className="px-6 py-2.5 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                {t('nav_contacts')}
                            </button>
                        </div>

                        {/* Description */}
                        <div className="py-8 border-b border-gray-100">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">{t('prod_about')}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg italic mb-6">
                                "{listing.description}"
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="py-8">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">{t('prod_offers')}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {listing.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-primary">
                                            {amenity === 'Wi-Fi' && <Wifi size={20} />}
                                            {amenity === 'Sauna' && <Users size={20} />}
                                            {amenity === 'Fireplace' && <Wind size={20} />}
                                            {amenity === 'Kitchen' && <Coffee size={20} />}
                                            {amenity === 'Free Parking' && <Car size={20} />}
                                            {amenity === 'Ocean View' && <MapPin size={20} />}
                                            {amenity === 'Infinity Pool' && <Users size={20} />}
                                            {amenity === 'Air Conditioning' && <Wind size={20} />}
                                            {amenity === 'Elevator' && <ChevronLeft size={20} />}
                                            {amenity === 'Hot Tub' && <CheckCircle2 size={20} />}
                                        </div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 px-8 py-3.5 border-2 border-dark text-dark rounded-2xl font-bold hover:bg-dark hover:text-white transition-all">
                                {t('prod_all_amenities')}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 bg-white border border-gray-100 rounded-[32px] p-8 shadow-2xl shadow-gray-200/50">
                            <div className="flex justify-between items-baseline mb-8">
                                <div>
                                    <span className="text-3xl font-display font-bold text-dark">${listing.price}</span>
                                    <span className="text-gray-500 font-medium ml-1">/{listing.unit}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-bold text-dark">
                                    <Star size={14} className="fill-primary text-primary" />
                                    {listing.rating}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="p-4 border border-gray-100 rounded-2xl bg-red-50/30">
                                    <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-100">
                                        <Calendar size={18} className="text-primary font-bold" />
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('prod_duration')}</p>
                                            <p className="text-sm font-bold text-dark">Select Dates</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users size={18} className="text-primary font-bold" />
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t('prod_guests')}</p>
                                            <p className="text-sm font-bold text-dark">1 {t('prod_guest')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleInterest}
                                disabled={interestSent}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-lg mb-4 ${
                                    interestSent 
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                                    : 'bg-primary hover:bg-primary-hover text-white shadow-primary/20'
                                }`}
                            >
                                {interestSent ? 'Interest Sent!' : t('prod_send_interest')}
                            </button>
                            <p className="text-center text-gray-400 text-xs font-medium">{t('prod_interest_sub')}</p>

                            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>${listing.price} x 5 {t('prod_nights')}</span>
                                    <span>${listing.price * 5}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>{t('prod_service_fee')}</span>
                                    <span>$45</span>
                                </div>
                                <div className="flex justify-between text-dark font-bold text-lg pt-4">
                                    <span>{t('prod_total')}</span>
                                    <span>${listing.price * 5 + 45}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
