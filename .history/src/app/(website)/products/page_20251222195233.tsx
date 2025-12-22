import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Heart, ShoppingBag } from 'lucide-react';

// MOCK DATA - Replace with your actual props/API data
const products = [
  {
    id: 1,
    name: "Midnight Oud",
    category: "Men",
    price: "2,500 BDT",
    isFeatured: true, // Req 1: Featured Logic
    isNew: true,      // Will be ignored per Req 2
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    // Req 5: Multiple Images Support
    gallery: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d60f?auto=format&fit=crop&q=80&w=800",
    ]
  },
  {
    id: 2,
    name: "Rose Amber",
    category: "Women",
    price: "3,200 BDT",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 3,
    name: "Royal Musk",
    category: "Unisex",
    price: "4,500 BDT",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d60f?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d60f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 4,
    name: "Ocean Breeze",
    category: "Men",
    price: "1,800 BDT",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"]
  },
];

const categories = ["All", "Men", "Women", "Unisex", "Attar", "Gift Sets"];

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle opening lightbox
  const openLightbox = (product) => {
    setCurrentProduct(product);
    setCurrentImageIndex(0); // Start at first image
    setLightboxOpen(true);
  };

  // Handle Lightbox Navigation
  const nextImage = (e) => {
    e.stopPropagation();
    if (currentProduct && currentProduct.gallery.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProduct.gallery.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (currentProduct && currentProduct.gallery.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProduct.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      
      {/* --- Req 6: Responsive Categories (flex-wrap fixes scrolling issue) --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
              activeCategory === cat
                ? "bg-black text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
          >
            {/* Image Container */}
            {/* Req 3: Remove Link, Added onClick for Lightbox */}
            <div 
              className="relative h-72 overflow-hidden cursor-zoom-in"
              onClick={() => openLightbox(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient (Optional effect) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* --- Req 1: Featured Badge (Gold) --- */}
              {product.isFeatured && (
                <div className="absolute top-3 left-3 bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-md z-10">
                  Featured
                </div>
              )}

              {/* --- Req 2: Removed "New" Badge --- */}
              {/* --- Req 4: Removed Product Name from Image --- */}

              {/* Action Buttons (Appears on Hover) */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors" title="View">
                   <Eye size={18} />
                </button>
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors" title="Wishlist">
                   <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Product Details (Below Image) */}
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-yellow-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-black font-semibold text-xl">{product.price}</p>
              
              <button className="mt-4 w-full py-2 bg-gray-900 text-white rounded hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2">
                <ShoppingBag size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Lightbox Viewer (Custom Implementation) --- */}
      {lightboxOpen && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          {/* Close Button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] flex flex-col md:flex-row items-center justify-center gap-8">
            
            {/* Main Image Area */}
            <div className="relative flex-1 h-full w-full flex items-center justify-center">
              
              {/* --- Req 5: Multi-image Navigation (Left) --- */}
              {currentProduct.gallery.length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-2 md:-left-12 p-2 text-white hover:text-yellow-400 transition-colors z-20"
                >
                  <ChevronLeft size={40} />
                </button>
              )}

              <img 
                src={currentProduct.gallery[currentImageIndex]} 
                alt="Product View" 
                className="max-h-full max-w-full object-contain rounded-md shadow-2xl"
              />

              {/* --- Req 5: Multi-image Navigation (Right) --- */}
              {currentProduct.gallery.length > 1 && (
                <button 
                  onClick={nextImage}
                  className="absolute right-2 md:-right-12 p-2 text-white hover:text-yellow-400 transition-colors z-20"
                >
                  <ChevronRight size={40} />
                </button>
              )}
            </div>

            {/* Thumbnail Navigation for Multiple Images */}
            {currentProduct.gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {currentProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === idx ? 'bg-yellow-500 w-6' : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductGallery;