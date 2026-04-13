import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Brand Name */}
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-8 block">
                        {t('hero_tag')}
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-dark mb-6 leading-tight">
                        {t('hero_title')}
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        {t('hero_subtitle')}
                    </p>

                    {/* Clean Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div 
                            onClick={() => navigate('/rentals')}
                            className="bg-white border border-gray-200 p-2 pl-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 flex-1 text-left">
                                <MapPin className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                                <span className="text-gray-400 font-medium">{t('hero_search_placeholder')}</span>
                            </div>
                            <button className="bg-dark hover:bg-dark-lighter text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2">
                                <Search size={18} />
                                <span className="hidden sm:inline">{t('hero_search_btn')}</span>
                            </button>
                        </div>
                        
                        {/* Quick Links */}
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('hero_popular')}:</span>
                            {['Hodan', 'Abdiaziz', 'Beachfront'].map((tag) => (
                                <button 
                                    key={tag}
                                    onClick={() => navigate('/rentals', { state: { category: tag } })}
                                    className="text-xs font-bold text-dark hover:text-primary transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
