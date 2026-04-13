import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contacts = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-gray-50/50 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                        {t('contact_title')}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {t('contact_subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left - Contact Info */}
                    <div className="lg:col-span-5">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-dark mb-8">{t('contact_info')}</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email us</p>
                                            <p className="text-lg font-bold text-dark">support@hoylink.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Call us</p>
                                            <p className="text-lg font-bold text-dark">+1 (555) 000-HOYLINK</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Visit us</p>
                                            <p className="text-lg font-bold text-dark">{t('rent_location')}, Hodan, {t('rent_location')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-display font-bold text-dark mb-8">Follow Our Journey</h3>
                                <div className="flex gap-4">
                                    {[Github, Twitter, Linkedin].map((Icon, i) => (
                                        <a key={i} href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                            <MessageCircle size={48} fill="currentColor" fillOpacity="0.1" />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-dark mb-4">Chat with us on WhatsApp</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 text-lg">
                            Get instant support and property details directly on your phone. Our team is online and ready to help.
                        </p>
                        
                        <a 
                            href="https://wa.me/15550004695" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-green-500/20"
                        >
                            <MessageCircle size={24} />
                            Start Chatting
                        </a>
                        
                        <p className="mt-8 text-sm text-gray-400 font-medium">
                            Average response time: <span className="text-green-500 font-bold">Under 5 minutes</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contacts;
