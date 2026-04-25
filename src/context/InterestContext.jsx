import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInterestsDB, setInterestsDB } from '../utils/db';

const InterestContext = createContext();

export const useInterest = () => useContext(InterestContext);

export const InterestProvider = ({ children }) => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initInterests = async () => {
            try {
                const saved = await getInterestsDB();
                if (saved) {
                    setInterests(saved);
                } else {
                    // Initial mock interest
                    setInterests([
                        {
                            id: 1,
                            listingId: 1,
                            listingTitle: "Liido Beachfront Villa",
                            user: "Guest User",
                            date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                            status: "New"
                        }
                    ]);
                }
            } catch (e) {
                console.error('Failed to load interests:', e);
            } finally {
                setLoading(false);
            }
        };
        initInterests();
    }, []);

    useEffect(() => {
        if (!loading) {
            setInterestsDB(interests).catch(e => console.error('Failed to save interests:', e));
        }
    }, [interests, loading]);

    const addInterest = (listing) => {
        const newInterest = {
            id: Date.now(),
            listingId: listing.id,
            listingTitle: listing.title,
            user: "Guest User",
            date: new Date().toISOString(),
            status: "New"
        };
        setInterests(prev => [newInterest, ...prev]);
    };

    const markAsRead = (id) => {
        setInterests(prev => prev.map(interest => 
            interest.id === id ? { ...interest, status: 'Read' } : interest
        ));
    };

    return (
        <InterestContext.Provider value={{ interests, addInterest, markAsRead, loading }}>
            {children}
        </InterestContext.Provider>
    );
};
