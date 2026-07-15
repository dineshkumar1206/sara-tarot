import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Hardcoded view imports for custom structure/design
import TarotConsultation from '../components/categories/TarotConsultation';
import SpiritualHealing from '../components/categories/SpiritualHealing';
import Crystals from '../components/categories/Crystals';
import MurugarCards from '../components/categories/MurugarCards';
import TarotClasses from '../components/categories/TarotClasses';
import CounselingClasses from '../components/categories/CounselingClasses';
import KaliPooja from '../components/categories/KaliPooja';

export default function ProductCategoryDetail({ cart = [], setCart, setIsCartOpen }) {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [dynamicCat, setDynamicCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories on category param change
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading(true);
      try {
        const catRes = await axios.get(`${API_BASE_URL}/api/categories`);
        setCategories(catRes.data);
        
        // Find if category parameter matches slug in the categories table
        const matched = catRes.data.find(c => c.slug === category);
        if (matched) {
          setDynamicCat(matched);
          // Fetch products of this matched category
          const prodRes = await axios.get(`${API_BASE_URL}/api/products`);
          const filtered = prodRes.data.filter(p => p.category && p.category.toLowerCase() === matched.name.toLowerCase());
          setProducts(filtered);
        } else {
          setDynamicCat(null);
        }
      } catch (err) {
        console.error('Failed to fetch categories / products in detail view:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndProducts();
  }, [category]);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    const existingItem = cart.find((c) => c.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
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

  // Render original components for existing hardcoded slugs
  switch (category) {
    case 'tarot-consultation':
      return <TarotConsultation cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'spiritual-healing':
      return <SpiritualHealing cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'crystals':
      return <Crystals cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'murugar-cards':
      return <MurugarCards cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'tarot-classes':
      return <TarotClasses cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'counseling-classes':
      return <CounselingClasses cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'kali-pooja':
      return <KaliPooja cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    default:
      // Render beautiful dynamic category view if found in the database
      if (loading) {
        return (
          <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#dfba6b' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', tracking: '1px' }}>Loading Collection...</p>
          </div>
        );
      }

      if (dynamicCat) {
        return (
          <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* Breadcrumbs */}
              <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
                <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
                <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
                <span style={{ color: '#dfba6b' }}>{dynamicCat.name}</span>
              </div>

              {/* Header Section */}
              <div style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
                <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                  {dynamicCat.type === 'crystal' ? 'Blassed & Programmed Crystals' : 'Divine Spiritual Guidance'}
                </span>
                <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
                  {dynamicCat.name}
                </h1>
                <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: 0 }}>
                  {dynamicCat.desc || 'Explore our blessed services and product offerings meticulously programmed by Sara to bring alignment, protection, and positive transformations.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap' }}>
                {/* Items Listing Column */}
                <div style={{ flex: '2 1 600px' }}>
                  <h3 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    Available Bookings / Offerings
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {products.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem 0', color: 'rgba(243, 240, 234, 0.6)' }}>
                        No offerings available at the moment. Please check back later.
                      </div>
                    ) : (
                      products.map((item) => (
                        <div 
                          key={item.id}
                          style={{
                            backgroundColor: '#130f24',
                            border: '1px solid rgba(223, 186, 107, 0.15)',
                            borderRadius: '4px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1.5rem',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.4)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.15)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {item.image && (
                            <div style={{ width: '120px', height: '120px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(223, 186, 107, 0.2)' }}>
                              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                          <div style={{ flex: '1 1 280px' }}>
                            <div style={{ color: '#dfba6b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                              {item.type}
                            </div>
                            <h4 style={{ color: '#f3f0ea', fontSize: '1.35rem', margin: '4px 0 8px 0', fontWeight: '500' }}>
                              {item.name}
                            </h4>
                            <p style={{ color: 'rgba(243, 240, 234, 0.75)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                              {item.desc}
                            </p>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '0.75rem', minWidth: '150px' }}>
                            <div style={{ color: '#dfba6b', fontSize: '1.75rem', fontWeight: '600' }}>
                              ₹{item.price.toLocaleString('en-IN')}
                            </div>
                            <button
                              onClick={() => handleAddToCart(item)}
                              style={{
                                backgroundColor: '#dfba6b',
                                color: '#0f0c1b',
                                border: 'none',
                                padding: '0.6rem 1.5rem',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f3f0ea';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#dfba6b';
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      }

      return (
        <div style={{ backgroundColor: '#0f0c1b', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f3f0ea', fontFamily: "'Inter', sans-serif" }}>
          <h2 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2rem', marginBottom: '1rem' }}>Category Not Found</h2>
          <Link to="/" style={{ color: '#dfba6b', textDecoration: 'none', border: '1px solid #dfba6b', padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Back to Home</Link>
        </div>
      );
  }
}
