import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CategorySection = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const categories = [
        {
            title: t('cat_short_title'),
            description: t('cat_short_desc'),
            icon: <Clock className="text-primary" size={24} />,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
            category: 'Short term'
        },
        {
            title: t('cat_long_title'),
            description: t('cat_long_desc'),
            icon: <Calendar className="text-primary" size={24} />,
            image: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=800",
            category: 'Long term'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
            <div className="text-center mb-16">
                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-red-50 rounded-lg inline-block">{t('cat_title')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900">{t('cat_header')}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                {categories.map((cat, idx) => (
                    <div 
                        key={idx}
                        onClick={() => navigate('/rentals', { state: { category: cat.category } })}
                        className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-10 w-full">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                {cat.icon}
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white mb-4">{cat.title}</h3>
                            <p className="text-gray-200 mb-8 text-lg max-w-sm leading-relaxed">{cat.description}</p>
                            
                            <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                                <span>{t('cat_browse')}</span>
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
