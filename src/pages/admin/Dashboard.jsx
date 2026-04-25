import React from 'react';
import { Home, Users, DollarSign, TrendingUp, Calendar, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useListings } from '../../context/ListingsContext';
import { useInterest } from '../../context/InterestContext';

const Dashboard = () => {
    const { interests } = useInterest();
    const { listings, loading } = useListings();

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
                <p className="text-gray-400 font-display font-bold uppercase tracking-[0.2em] text-[10px]">Loading Dashboard</p>
            </div>
        );
    }

    const stats = [
        { title: 'Total Listings', value: listings.length.toString(), icon: Home, trend: '+12%', color: 'from-blue-500 to-blue-600' },
        { title: 'Active Users', value: '2,845', icon: Users, trend: '+5.4%', color: 'from-purple-500 to-purple-600' },
        { title: 'Revenue (MTD)', value: '$45,231', icon: DollarSign, trend: '+14%', color: 'from-emerald-500 to-emerald-600' },
        { title: 'New Bookings', value: '186', icon: Calendar, trend: '+2.1%', color: 'from-orange-500 to-orange-600' }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} text-white shadow-inner`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
                                    <TrendingUp size={14} />
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                                <p className="text-3xl font-display font-bold text-dark">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-dark">Recent Properties</h2>
                        <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {listings.slice(0, 4).map((listing) => (
                            <div key={listing.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50">
                                <img 
                                    src={listing.image} 
                                    alt={listing.title} 
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-dark truncate">{listing.title}</h3>
                                    <p className="text-xs text-gray-500 truncate">{listing.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-dark">${listing.price}</p>
                                    <p className="text-xs text-gray-500">/{listing.unit}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        Active
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Interests */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-dark flex items-center gap-2">
                            <MessageCircle size={20} className="text-primary" />
                            Recent Interests
                        </h2>
                        {interests.length > 0 && (
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                {interests.filter(i => i.status === 'New').length} New
                            </span>
                        )}
                    </div>
                    
                    <div className="space-y-4 flex-grow overflow-y-auto">
                        {interests.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No interests yet.</p>
                        ) : (
                            interests.slice(0, 5).map((interest) => (
                                <div key={interest.id} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors relative group cursor-pointer">
                                    {interest.status === 'New' && (
                                        <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
                                    )}
                                    <p className="text-sm font-bold text-dark pr-6">{interest.listingTitle}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                        <span className="font-medium text-gray-700">{interest.user}</span>
                                        <span>{new Date(interest.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <button className="w-full mt-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg text-xs font-bold transition-colors">
                                        View Details
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
