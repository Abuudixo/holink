import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useListings } from '../../context/ListingsContext';
import ListingModal from '../../components/admin/ListingModal';

const AdminListings = () => {
    const { listings, addListing, editListing, deleteListing, loading } = useListings();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingListing, setEditingListing] = useState(null);

    const filteredListings = listings.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Initializing Database...</p>
            </div>
        );
    }

    const handleAddClick = () => {
        setEditingListing(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (listing) => {
        setEditingListing(listing);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            deleteListing(id);
        }
    };

    const handleSaveListing = (formData) => {
        if (editingListing) {
            editListing(editingListing.id, formData);
        } else {
            addListing(formData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search properties..." 
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 text-sm font-medium shadow-sm transition-colors">
                        <Filter size={18} />
                        Filters
                    </button>
                </div>
                <button 
                    onClick={handleAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 transition-colors w-full sm:w-auto justify-center"
                >
                    <Plus size={18} />
                    Add Listing
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-bold">Property</th>
                                <th scope="col" className="px-6 py-4 font-bold">Category</th>
                                <th scope="col" className="px-6 py-4 font-bold">Price</th>
                                <th scope="col" className="px-6 py-4 font-bold">Rating</th>
                                <th scope="col" className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredListings.map((listing) => (
                                <tr key={listing.id} className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={listing.image} alt={listing.title} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                                            <div>
                                                <div className="font-bold text-dark">{listing.title}</div>
                                                <div className="text-xs text-gray-500">{listing.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {listing.rentCategory}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-dark">${listing.price}</div>
                                        <div className="text-xs text-gray-400">/{listing.unit}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-bold text-dark">
                                            <span className="text-primary">★</span> {listing.rating || '0.0'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleEditClick(listing)}
                                                className="p-2.5 text-gray-400 hover:text-primary transition-all rounded-xl hover:bg-primary/10"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(listing.id)}
                                                className="p-2.5 text-gray-400 hover:text-red-500 transition-all rounded-xl hover:bg-red-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredListings.length === 0 && (
                    <div className="text-center py-20 bg-gray-50/30">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-dark mb-1">No properties found</h3>
                        <p className="text-gray-500 text-sm">Try adjusting your search or add a new listing.</p>
                    </div>
                )}
                
                <div className="bg-white px-8 py-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                        Showing <span className="font-bold text-dark">{filteredListings.length}</span> properties
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-30 cursor-not-allowed" disabled>
                            Previous
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-dark transition-all" disabled>
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ListingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveListing}
                listing={editingListing}
            />
        </div>
    );
};

export default AdminListings;
