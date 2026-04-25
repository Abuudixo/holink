import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Image as ImageIcon } from 'lucide-react';

const ListingModal = ({ isOpen, onClose, onSave, listing }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        unit: 'month',
        rentCategory: 'Short term',
        tag: '',
        image: '',
        images: [],
        description: '',
        amenities: []
    });

    useEffect(() => {
        if (listing) {
            setFormData({
                title: listing.title || '',
                location: listing.location || '',
                price: listing.price || '',
                unit: listing.unit || 'month',
                rentCategory: listing.rentCategory || 'Short term',
                tag: listing.tag || '',
                image: listing.image || '',
                images: listing.images || [],
                description: listing.description || '',
                amenities: listing.amenities || []
            });
        } else {
            setFormData({
                title: '',
                location: '',
                price: '',
                unit: 'month',
                rentCategory: 'Short term',
                tag: '',
                image: '',
                images: [],
                description: '',
                amenities: []
            });
        }
    }, [listing, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const compressImage = (base64Str, maxWidth = 800, maxHeight = 800) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Compress to 70% quality
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = [];
            let processed = 0;

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    // Compress before adding to state
                    const compressed = await compressImage(reader.result);
                    newImages.push(compressed);
                    processed++;
                    if (processed === files.length) {
                        setFormData(prev => {
                            const updatedImages = [...prev.images, ...newImages];
                            return { 
                                ...prev, 
                                images: updatedImages,
                                image: prev.image || newImages[0] 
                            };
                        });
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        setFormData(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            let nextMainImage = prev.image;
            
            // If we removed the main image, pick the next available one
            if (prev.image === prev.images[index]) {
                nextMainImage = newImages.length > 0 ? newImages[0] : '';
            }
            
            return {
                ...prev,
                images: newImages,
                image: nextMainImage
            };
        });
    };

    const setAsMain = (img) => {
        setFormData(prev => ({ ...prev, image: img }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: Number(formData.price)
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-display font-bold text-dark">
                        {listing ? 'Edit Property' : 'Add New Property'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-dark mb-2 ml-1">Property Title</label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="e.g. Liido Beachfront Villa"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-dark mb-2 ml-1">Location</label>
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="e.g. Abdiaziz, Mogadishu"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2 ml-1">Price</label>
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="1500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2 ml-1">Unit</label>
                                    <select 
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                    >
                                        <option value="month">Per Month</option>
                                        <option value="night">Per Night</option>
                                        <option value="week">Per Week</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-dark mb-2 ml-1">Category</label>
                                <select 
                                    name="rentCategory"
                                    value={formData.rentCategory}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                >
                                    <option value="Short term">Short term</option>
                                    <option value="Long term">Long term</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-dark mb-2 ml-1">Tag (Optional)</label>
                                <input 
                                    type="text" 
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="e.g. Corporate Pick"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-dark mb-2 ml-1">Property Gallery</label>
                                <div className="space-y-4">
                                    {/* Upload Area */}
                                    <div 
                                        onClick={() => document.getElementById('imageUpload').click()}
                                        className="relative h-32 border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group overflow-hidden"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors mb-2 shadow-sm">
                                            <Upload size={18} />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wider">Add photos from computer</span>
                                        <input 
                                            id="imageUpload"
                                            type="file" 
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>

                                    {/* Gallery Preview Grid */}
                                    {formData.images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {formData.images.map((img, idx) => {
                                                const isMain = img === formData.image;
                                                return (
                                                    <div key={idx} className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${isMain ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'}`}>
                                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                                        
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            {!isMain && (
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => setAsMain(img)}
                                                                    className="p-1.5 bg-white text-dark rounded-lg hover:bg-primary hover:text-white transition-all shadow-lg"
                                                                    title="Set as Main"
                                                                >
                                                                    <ImageIcon size={14} />
                                                                </button>
                                                            )}
                                                            <button 
                                                                type="button"
                                                                onClick={() => removeImage(idx)}
                                                                className="p-1.5 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                                                title="Remove"
                                                                disabled={formData.images.length === 0}
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>

                                                        {isMain && (
                                                            <span className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg">
                                                                Main
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* URL Input (Optional fallback) */}
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <ImageIcon size={16} />
                                        </div>
                                        <input 
                                            type="text" 
                                            name="image"
                                            value={formData.image && formData.image.startsWith('data:') ? '' : formData.image}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setFormData(prev => ({ 
                                                    ...prev, 
                                                    image: val,
                                                    images: val && !prev.images.includes(val) ? [val, ...prev.images] : prev.images
                                                }));
                                            }}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-[10px] font-bold uppercase"
                                            placeholder="...or paste image URL"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-bold text-dark mb-2 ml-1">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="Describe the property..."
                            required
                        ></textarea>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all transform active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
                        >
                            <Save size={20} />
                            {listing ? 'Update Property' : 'Save Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListingModal;
