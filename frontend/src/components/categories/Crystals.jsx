import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const CRYSTAL_CATEGORIES = [
  {
    name: 'Rashi',
    desc: 'Specially energized crystals harmonized for your specific zodiac sign to bring balance and positive cosmic vibrations.',
    image: '/rashi.png'
  },
  {
    name: 'Dhanyog',
    desc: 'Attracts wealth, financial abundance, and prosperity into your home and business environment.',
    image: '/dhanyog.png'
  },
  {
    name: 'Bracelet',
    desc: 'Beautifully crafted bead bracelets for daily energetic protection, emotional peace, and spiritual support.',
    image: '/bracelet.png'
  },
  {
    name: 'Karungali',
    desc: 'Made from authentic black ebony wood to absorb negative energy, bring good luck, and shield against evil eye.',
    image: '/karungali.png'
  },
  {
    name: 'Rudraksh',
    desc: 'Sacred natural beads representing peace, health, and spiritual focus. Ideal for meditation and prayer.',
    image: '/rudraksh.png'
  },
  {
    name: 'Yantra',
    desc: 'Sacred geometric plates designed to channel positive energy, shield against negativity, and bring success.',
    image: '/yantra.png'
  },
  {
    name: 'Pyrite',
    desc: 'The golden stone of luck, abundance, and business growth. Ideal for work tables and wealth manifestation.',
    image: '/pyrite.png'
  }
];

const POLICY_DATA = {
  intro: 'Crystal Delivery Details:',
  points: [
    'All crystals are physically cleansed and spiritually energized in India prior to dispatch.',
    'Shipped with sacred prasadham and instructions on crystal care and reprogramming.',
    'Dispatched within 3-5 working days of booking confirmation.'
  ]
};

export default function Crystals({ cart = [], setCart, setIsCartOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subcategoryParam) {
      setSelectedCategory(subcategoryParam);
    } else {
      setSelectedCategory(null);
    }
  }, [subcategoryParam]);

  useEffect(() => {
    const fetchCrystals = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        const crystalCatNames = CRYSTAL_CATEGORIES.map(c => c.name.toLowerCase());
        const crystalItems = res.data.filter(item => 
          item.category && crystalCatNames.includes(item.category.toLowerCase())
        );
        setItems(crystalItems);
      } catch (err) {
        console.error('Failed to load crystals from database. Using fallback seed data.', err);
        // Map local fallback items
        const fallbacks = CRYSTAL_CATEGORIES.map((cat, idx) => ({
          id: `fallback-${idx}`,
          name: `${cat.name} Crystal Product`,
          price: 1500 + idx * 100,
          type: 'Blessed & Energized',
          category: cat.name,
          desc: cat.desc,
          image: cat.image,
          inclusions: ['Cleansed & energized', 'Sacred prasadham included']
        }));
        setItems(fallbacks);
      } finally {
        setLoading(false);
      }
    };
    fetchCrystals();
  }, []);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    const existingItem = cart.find((c) => c.id === item.id || c.id === `crystal-${item.id}`);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          (c.id === item.id || c.id === `crystal-${item.id}`)
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id || `crystal-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: item.name,
          price: item.price,
          image: item.image || '/saraa-logo.jpeg',
          quantity: 1
        }
      ]);
    }

    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  const handleOpenPopup = (itemId, e) => {
    e.stopPropagation();
    setActiveItemId(itemId);
  };

  const handleClosePopup = () => {
    setActiveItemId(null);
  };

  // Filter items based on active category selection (default to all items)
  const filteredItems = selectedCategory
    ? items.filter(item => item.category && item.category.toLowerCase() === selectedCategory.toLowerCase())
    : items;

  const currentItem = items.find((item) => item.id === activeItemId);

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
          {selectedCategory ? (
            <>
              <span 
                onClick={() => setSearchParams({})} 
                style={{ color: 'rgba(243, 240, 234, 0.5)', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Crystals
              </span>
              <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
              <span style={{ color: '#dfba6b' }}>{selectedCategory}</span>
            </>
          ) : (
            <span style={{ color: '#dfba6b' }}>Crystals</span>
          )}
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
          <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            SACRED GEOMETRY & ENERGY TOOLS
          </span>
          <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            {selectedCategory ? `${selectedCategory} Collection` : 'Crystals'}
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: '0 0 2rem 0' }}>
            {(() => {
              const catData = CRYSTAL_CATEGORIES.find(c => c.name.toLowerCase() === (selectedCategory || '').toLowerCase());
              return catData ? catData.desc : 'A curated selection of natural crystal categories, hand-selected, cleansed, and programmed with specific intentions by Sara to support your healing and manifest your desires.';
            })()}
          </p>

          {/* Elegant Horizontal Category Selector Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => setSearchParams({})}
              style={{
                backgroundColor: selectedCategory === null ? '#dfba6b' : 'rgba(223, 186, 107, 0.05)',
                color: selectedCategory === null ? '#0f0c1b' : '#dfba6b',
                border: '1px solid rgba(223, 186, 107, 0.3)',
                padding: '0.6rem 1.25rem',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.05)';
                }
              }}
            >
              All Crystals
            </button>
            {CRYSTAL_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSearchParams({ subcategory: cat.name })}
                style={{
                  backgroundColor: selectedCategory === cat.name ? '#dfba6b' : 'rgba(223, 186, 107, 0.05)',
                  color: selectedCategory === cat.name ? '#0f0c1b' : '#dfba6b',
                  border: '1px solid rgba(223, 186, 107, 0.3)',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat.name) {
                    e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat.name) {
                    e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.05)';
                  }
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid (Full Width) */}
        <div style={{ width: '100%' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
              <span style={{ color: '#dfba6b', fontSize: '15px', letterSpacing: '1px' }}>Loading products...</span>
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', border: '1px dashed rgba(223, 186, 107, 0.15)', borderRadius: '4px' }}>
                  <p style={{ color: 'rgba(243, 240, 234, 0.6)', margin: 0 }}>No products available in this category yet.</p>
                </div>
              ) : (
                /* Cards Grid Layout */
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: '2rem' 
                }}>
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id}
                      onClick={(e) => handleOpenPopup(item.id, e)}
                      style={{
                        backgroundColor: '#130f24',
                        border: '1px solid rgba(223, 186, 107, 0.15)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.5)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Card Image */}
                      {item.image && (
                        <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                           <img 
                             src={item.image} 
                             alt={item.name} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                             onError={(e) => {
                               e.target.onerror = null; 
                               e.target.src = '/saraa-logo.jpeg';
                             }}
                           />
                           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #130f24, transparent)' }} />
                        </div>
                      )}
                      
                      {/* Card Content */}
                      <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ color: '#dfba6b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '4px' }}>
                            {item.type}
                          </div>
                          <h4 style={{ color: '#f3f0ea', fontSize: '1.15rem', margin: '0 0 0.5rem 0', fontWeight: '500', lineHeight: '1.3' }}>
                            {item.name}
                          </h4>
                          <p style={{ color: 'rgba(243, 240, 234, 0.7)', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1rem 0' }}>
                            {item.desc}
                          </p>
                        </div>
                        
                        <div>
                          <div style={{ color: '#dfba6b', fontSize: '1.4rem', fontWeight: '600', margin: '0.75rem 0' }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                            <button 
                              onClick={(e) => handleOpenPopup(item.id, e)}
                              style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                color: '#dfba6b',
                                border: '1px solid rgba(223, 186, 107, 0.4)',
                                padding: '0.6rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              Details
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                              }}
                              style={{
                                flex: 1,
                                backgroundColor: '#dfba6b',
                                color: '#0f0c1b',
                                border: 'none',
                                padding: '0.6rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* --- DETAILS MODAL POPUP --- */}
      {activeItemId && currentItem && (
        <div 
          onClick={handleClosePopup}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 8, 20, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Modal Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#130f24',
              border: '1px solid rgba(223, 186, 107, 0.25)',
              borderRadius: '8px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              padding: '2.5rem',
              boxSizing: 'border-box',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Elegant Cross Closing Button */}
            <button 
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#dfba6b',
                fontSize: '2rem',
                fontWeight: '300',
                cursor: 'pointer',
                lineHeight: '1',
                padding: '4px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              &times;
            </button>

            {/* Content Split Layout */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              
              {/* Left Column: Image */}
              {currentItem.image && (
                <div style={{ flex: '1 1 350px' }}>
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.name} 
                    style={{ 
                      width: '100%', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(223, 186, 107, 0.15)', 
                      objectFit: 'cover', 
                      height: '100%',
                      minHeight: '300px',
                      maxHeight: '400px'
                    }}
                  />
                </div>
              )}

              {/* Right Column: Text & Pricing Info */}
              <div style={{ flex: '1 2 400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '600' }}>
                    {currentItem.type}
                  </span>
                  <h2 style={{ color: '#f3f0ea', fontSize: '1.8rem', fontWeight: '300', margin: '0.5rem 0 0.75rem 0', lineHeight: '1.3' }}>
                    {currentItem.name}
                  </h2>
                  <div style={{ color: '#dfba6b', fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                    ₹{currentItem.price.toLocaleString('en-IN')}
                  </div>
                  
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(223, 186, 107, 0.15)', margin: '1rem 0' }} />
                  
                  <p style={{ color: 'rgba(243, 240, 234, 0.8)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {currentItem.desc}
                  </p>

                  <h4 style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    What this product includes:
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0 0 2rem 0', color: 'rgba(243, 240, 234, 0.75)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                    {Array.isArray(currentItem.inclusions) && currentItem.inclusions.map((inc, index) => (
                      <li key={index} style={{ marginBottom: '0.4rem' }}>{inc}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={(e) => {
                    handleAddToCart(currentItem);
                    handleClosePopup();
                  }}
                  style={{
                    backgroundColor: '#dfba6b',
                    color: '#0f0c1b',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: '2px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Add To Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
