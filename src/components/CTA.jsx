import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-dark text-white rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{t('cta_title')}</h2>
                    <p className="text-gray-400 mb-10 text-lg">{t('cta_subtitle')}</p>
                    <div className="flex justify-center">
                        <button 
                            onClick={() => navigate('/rentals')}
                            className="bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 lg:px-12 lg:py-5 rounded-2xl transition-all transform active:scale-95 shadow-xl shadow-primary/25"
                        >
                            {t('cta_btn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
