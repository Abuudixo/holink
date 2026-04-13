import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'SO', name: 'Somaali' }
    ];

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
                        <Link to="/rentals" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors">{t('nav_rentals')}</Link>
                        <Link to="/contacts" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors">{t('nav_contacts')}</Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button 
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`p-2 rounded-full transition-all flex items-center gap-2 ${isLangOpen ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                <Globe size={20} />
                                <span className="text-xs font-bold">{language}</span>
                            </button>

                            {/* Dropdown */}
                            {isLangOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setIsLangOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/50 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 mb-1 border-b border-gray-50">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('nav_select_lang')}</span>
                                        </div>
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    toggleLanguage(lang.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors text-left"
                                            >
                                                {lang.name}
                                                {language === lang.code && <Check size={14} className="text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <Link 
                            to="/login"
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-primary/25"
                        >
                            {t('nav_login')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
