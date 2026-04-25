import React, { createContext, useContext, useState, useEffect } from 'react';
import { listings as initialListings } from '../data/listings';
import { getListings, setListings, migrateFromLocalStorage } from '../utils/db';

const ListingsContext = createContext();

export const useListings = () => useContext(ListingsContext);

export const ListingsProvider = ({ children }) => {
    const [listings, setListingsState] = useState(initialListings);
    const [loading, setLoading] = useState(true);

    // Initial Load & Migration
    useEffect(() => {
        const initDB = async () => {
            try {
                // 1. Check for migration
                const migrated = await migrateFromLocalStorage();
                if (migrated) {
                    setListingsState(migrated);
                    setLoading(false);
                    return;
                }

                // 2. Load from IndexedDB
                const saved = await getListings();
                if (saved) {
                    setListingsState(saved);
                }
            } catch (e) {
                console.error('Failed to load from IndexedDB:', e);
            } finally {
                setLoading(false);
            }
        };

        initDB();
    }, []);

    // Save on Change
    useEffect(() => {
        if (!loading) {
            setListings(listings).catch(e => console.error('Failed to save to IndexedDB:', e));
        }
    }, [listings, loading]);

    const addListing = (newListing) => {
        const listing = {
            ...newListing,
            id: Date.now(),
            tag: newListing.tag || 'New',
            rating: newListing.rating || 0,
            reviews: newListing.reviews || 0,
            images: newListing.images && newListing.images.length > 0 ? newListing.images : [newListing.image],
            amenities: newListing.amenities || [],
            host: newListing.host || {
                name: 'Admin User',
                avatar: 'https://i.pravatar.cc/150?u=admin',
                rating: 5.0
            }
        };
        setListingsState(prev => [listing, ...prev]);
    };

    const editListing = (id, updatedData) => {
        setListingsState(prev => prev.map(listing => 
            listing.id === id ? { ...listing, ...updatedData } : listing
        ));
    };

    const deleteListing = (id) => {
        setListingsState(prev => prev.filter(listing => listing.id !== id));
    };

    return (
        <ListingsContext.Provider value={{ listings, addListing, editListing, deleteListing, loading }}>
            {children}
        </ListingsContext.Provider>
    );
};
