const DB_NAME = 'HoyLinkDB';
const LISTINGS_STORE = 'listings';
const INTERESTS_STORE = 'interests';
const DB_VERSION = 2; // Incremented version to add new store

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(LISTINGS_STORE)) {
                db.createObjectStore(LISTINGS_STORE);
            }
            if (!db.objectStoreNames.contains(INTERESTS_STORE)) {
                db.createObjectStore(INTERESTS_STORE);
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const setListings = async (listings) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(LISTINGS_STORE, 'readwrite');
        const store = transaction.objectStore(LISTINGS_STORE);
        const request = store.put(listings, 'current_listings');

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getListings = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(LISTINGS_STORE, 'readonly');
        const store = transaction.objectStore(LISTINGS_STORE);
        const request = store.get('current_listings');

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const setInterestsDB = async (interests) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INTERESTS_STORE, 'readwrite');
        const store = transaction.objectStore(INTERESTS_STORE);
        const request = store.put(interests, 'current_interests');

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getInterestsDB = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INTERESTS_STORE, 'readonly');
        const store = transaction.objectStore(INTERESTS_STORE);
        const request = store.get('current_interests');

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

/**
 * Migrates data from localStorage to IndexedDB if it exists.
 */
export const migrateFromLocalStorage = async () => {
    const localData = localStorage.getItem('hoylink_listings');
    if (localData) {
        try {
            const listings = JSON.parse(localData);
            await setListings(listings);
            localStorage.removeItem('hoylink_listings');
            console.log('Successfully migrated data to IndexedDB');
            return listings;
        } catch (e) {
            console.error('Migration failed:', e);
        }
    }
    return null;
};
