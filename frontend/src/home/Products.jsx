import React from 'react';

const SERVICES_DATA = [
  {
    id: 'basic-growth',
    title: 'Basic Kali Pooja for Growth',
    price: 2001,
    tagline: 'With Prasadham included',
    image: '/card-1.jpg',
    description: 'A powerful monthly Amavasya pooja dedicated to removing stagnation and inviting positive energy, success, and spiritual/material growth into your life.',
    inclusions: ['Personalized Sankalpam (Intent)', 'Archana and Aarti', 'Sacred Prasadham couriered to your address']
  },
  {
    id: 'relationship',
    title: 'Relationship Problems Pooja',
    price: 3001,
    tagline: 'Heal and harmonize your bonds',
    image: '/card-2.jpg',
    description: 'Specially performed during Amavasya to clear misunderstandings, dissolve negative energies between couples or family members, and restore peace and affection.',
    inclusions: ['Specific prayers for relationship healing', 'Dosha Nivaran mantras', 'Blessed thread/Prasadham']
  },
  {
    id: 'business-kali',
    title: 'Business Kali Pooja',
    price: 5001,
    tagline: 'With Prasadham included',
    image: '/card-3.jpg',
    description: 'Designed for entrepreneurs, business owners, and professionals. This ritual invokes Goddess Kali to eliminate corporate evil-eyes, overcome financial blocks, and attract wealth.',
    inclusions: ['Vyapaar Vridhi Sankalpam', 'Obstacle removal rituals', 'Energized Business Prasadham kit']
  },
  {
    id: 'black-magic-single',
    title: 'Black Magic Protection Pooja (Individual)',
    price: 30000,
    tagline: 'With complete protection materials & prasadham',
    image: '/card-4.jpg',
    description: 'A deeply intensive, protective ritual tailored for one individual struggling with severe negativity, unexplained psychological weight, or dark energy interference.',
    inclusions: ['Individual specialized protection shield (Kavach)', 'Purification rituals using premium samagri', 'Complete customized protection items & Prasadham']
  },
  {
    id: 'black-magic-family',
    title: 'Black Magic Protection Pooja (Family)',
    price: 50000,
    tagline: 'Complete protection shield for the whole family',
    image: '/card-5.jpg',
    description: 'An expansive and powerful household-level ritual that cleanses your entire living space and creates an unbreakable protective aura around all family members.',
    inclusions: ['Full family lineage protection Sankalpam', 'Home negative energy purging rituals', 'Comprehensive protective items & Prasadham pack for all members']
  }
];

export default function Products({ cart = [], setCart, currentView = { page: 'list', serviceId: null }, setCurrentView }) {

  const handleAddToCart = (service, e) => {
    e.stopPropagation(); 
    if (setCart) {
      setCart([...cart, service]);
    }
  };

  const handleOpenPopup = (serviceId, e) => {
    e.stopPropagation(); 
    if (setCurrentView) {
      setCurrentView({ page: 'detail', serviceId: serviceId });
    }
  };

  const handleClosePopup = () => {
    if (setCurrentView) {
      setCurrentView({ page: 'list', serviceId: null });
    }
  };

  const currentService = SERVICES_DATA.find(s => s.id === currentView.serviceId);

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      
      {/* --- SERVICE GRID PAGE --- */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ color: '#dfba6b', fontSize: '2.5rem', fontWeight: '300', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
            Amavasya Monthly Pooja
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.6)', fontSize: '1rem', letterSpacing: '0.5px' }}>
            Select a sacred ritual to invoke divine blessings, protection, and transformation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}>
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id}
              onClick={(e) => handleOpenPopup(service.id, e)}
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
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #130f24, transparent)' }} />
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: '#f3f0ea', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '500', lineHeight: '1.3' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#dfba6b', fontSize: '0.85rem', fontStyle: 'italic', margin: '0 0 1rem 0', letterSpacing: '0.5px' }}>
                    {service.tagline}
                  </p>
                </div>

                <div>
                  <div style={{ color: '#dfba6b', fontSize: '1.5rem', fontWeight: '600', margin: '1rem 0' }}>
                    Rs. {service.price.toLocaleString('en-IN')}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      onClick={(e) => handleOpenPopup(service.id, e)}
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        color: '#dfba6b',
                        border: '1px solid rgba(223, 186, 107, 0.4)',
                        padding: '0.7rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      onClick={(e) => handleAddToCart(service, e)}
                      style={{
                        flex: 1,
                        backgroundColor: '#dfba6b',
                        color: '#0f0c1b',
                        border: 'none',
                        padding: '0.7rem',
                        fontSize: '0.8rem',
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
      </div>

      {/* --- DETAILS MODAL POPUP --- */}
      {currentView.page === 'detail' && currentService && (
        <div 
          onClick={handleClosePopup} // Closes popup when clicking overlay background
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 8, 20, 0.85)', // Dark premium blur overlay
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000, // Appears over the sticky Navbar layer
            padding: '1rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Modal Container */}
          <div 
            onClick={(e) => e.stopPropagation()} // Disables overlay clicking inside card body
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
              <div style={{ flex: '1 1 350px' }}>
                <img 
                  src={currentService.image} 
                  alt={currentService.title} 
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

              {/* Right Column: Text & Pricing Info */}
              <div style={{ flex: '1 2 400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '600' }}>
                    Amavasya Special Ritual
                  </span>
                  <h2 style={{ color: '#f3f0ea', fontSize: '1.8rem', fontWeight: '300', margin: '0.5rem 0 0.75rem 0', lineHeight: '1.3' }}>
                    {currentService.title}
                  </h2>
                  <div style={{ color: '#dfba6b', fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                    Rs. {currentService.price.toLocaleString('en-IN')}
                  </div>
                  
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(223, 186, 107, 0.15)', margin: '1rem 0' }} />
                  
                  <p style={{ color: 'rgba(243, 240, 234, 0.8)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {currentService.description}
                  </p>

                  <h4 style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    What this offering includes:
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0 0 2rem 0', color: 'rgba(243, 240, 234, 0.75)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                    {currentService.inclusions.map((inc, index) => (
                      <li key={index} style={{ marginBottom: '0.4rem' }}>{inc}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={(e) => {
                    handleAddToCart(currentService, e);
                    handleClosePopup(); // Closes popup instantly upon successful booking
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
                  Book Pooja (Add to Cart)
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}