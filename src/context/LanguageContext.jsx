import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Get language from localStorage or default to EN
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('hoylink_lang');
        return saved || 'EN';
    });

    useEffect(() => {
        localStorage.setItem('hoylink_lang', language);
    }, [language]);

    const toggleLanguage = (langCode) => {
        if (translations[langCode]) {
            setLanguage(langCode);
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
