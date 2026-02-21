import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Filter, 
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Seeds', 'Fertilizers', 'Machinery', 'Pesticides', 'Tools'];

  const products = [
    { id: 1, name: 'Premium Hybrid Wheat Seeds', category: 'Seeds', price: '₹1,250', rating: 4.8, reviews: 124, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Organic NPK Fertilizer', category: 'Fertilizers', price: '₹850', rating: 4.5, reviews: 89, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Precision Hand Seeder', category: 'Tools', price: '₹3,400', rating: 4.9, reviews: 56, img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Potassium Rich Compost', category: 'Fertilizers', price: '₹450', rating: 4.2, reviews: 34, img: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=300&q=80' },
    { id: 5, name: 'High Yield Corn Hybrid', category: 'Seeds', price: '₹1,800', rating: 4.7, reviews: 210, img: 'https://images.unsplash.com/photo-1551731163-fdf924ea942e?auto=format&fit=crop&w=300&q=80' },
    { id: 6, name: 'Eco-Friendly Sprayer', category: 'Machinery', price: '₹12,500', rating: 4.6, reviews: 15, img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=300&q=80' },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="marketplace-page animate-fade-in">
      <div className="marketplace-header">
        <div className="title-section">
          <h1>Agro Marketplace</h1>
          <p>Get the best quality inputs delivered to your farm.</p>
        </div>
        <div className="header-actions">
          <div className="search-bar glass-card">
            <Search size={20} />
            <input type="text" placeholder="Search for seeds, tools..." />
          </div>
          <button className="cart-btn glass-card">
            <ShoppingCart size={20} />
            <span className="cart-count">2</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="category-scroll">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card glass-card">
            <div className="product-image">
              <img src={product.img} alt={product.name} />
              <button className="wishlist-btn"><Plus size={18} /></button>
            </div>
            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="rating-row">
                <Star size={14} fill="#F9C74F" color="#F9C74F" />
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="price-row">
                <span className="price">{product.price}</span>
                <button className="buy-btn">Add <Plus size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sellers Section */}
      <div className="sellers-teaser glass-card">
        <div className="teaser-content">
          <h2>Sell Your Produce</h2>
          <p>Connect directly with 500+ buyers and cooperatives. Get fair prices without middlemen.</p>
          <button className="premium-btn">Register as Seller <ArrowRight size={18} /></button>
        </div>
      </div>

      <style>{`
        .marketplace-page { display: flex; flex-direction: column; gap: 24px; }
        .marketplace-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-actions { display: flex; gap: 16px; }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px;
          width: 300px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          outline: none;
          color: var(--text-main);
          width: 100%;
          font-family: inherit;
        }

        .cart-btn {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--accent);
          color: var(--text-main);
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .category-pill {
          padding: 10px 24px;
          border-radius: 30px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-weight: 600;
          white-space: nowrap;
        }

        .category-pill.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }

        .product-card {
          overflow: hidden;
          transition: var(--transition);
        }

        .product-card:hover { transform: translateY(-5px); }

        .product-image {
          height: 180px;
          position: relative;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .product-info { padding: 20px; }
        .product-cat { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
        .product-info h3 { font-size: 1.1rem; margin: 4px 0 10px; color: var(--text-main); }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price { font-size: 1.25rem; font-weight: 700; color: var(--primary); }

        .buy-btn {
          background: var(--primary);
          color: white;
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sellers-teaser {
          margin-top: 20px;
          padding: 60px;
          background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
        }

        .teaser-content h2 { color: white; font-size: 2rem; margin-bottom: 15px; }
        .teaser-content p { color: rgba(255,255,255,0.9); margin-bottom: 30px; max-width: 600px; margin-inline: auto; }
        .teaser-content .premium-btn { display: inline-flex; align-items: center; gap: 10px; }
      `}</style>
    </div>
  );
};

export default Marketplace;
