import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config';

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

// ==========================================
// FRAMER MOTION CONFIG
// ==========================================
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  }
};

export default function Products({ cart = [], setCart, setIsCartOpen }) {
  const navigate = useNavigate();
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?category=Kali Pooja`);
        const mapped = res.data.map(p => ({
          id: p.id,
          title: p.name,
          price: p.price,
          tagline: p.type || 'Blessed & Energized',
          image: p.image || '/saraa-logo.jpeg',
          description: p.desc || '',
          inclusions: Array.isArray(p.inclusions) ? p.inclusions : []
        }));
        setServicesData(mapped);
      } catch (err) {
        console.error('Failed to fetch Kali Pooja products for homepage. Using fallback.', err);
        const fallbacks = SERVICES_DATA.map(s => ({
          ...s,
          inclusions: Array.isArray(s.inclusions) ? s.inclusions : []
        }));
        setServicesData(fallbacks);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddToCart = (service, e) => {
    e.stopPropagation(); 
    if (setCart) {
      const existingItem = cart.find((item) => item.id === service.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === service.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([
          ...cart,
          {
            id: service.id,
            name: service.title,
            price: service.price,
            image: service.image,
            quantity: 1
          }
        ]);
      }
    }
    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  const handleOpenPopup = (serviceId, e) => {
    e.stopPropagation(); 
    setActiveServiceId(serviceId);
  };

  const handleClosePopup = () => {
    setActiveServiceId(null);
  };

  const currentService = servicesData.find(s => s.id === activeServiceId);

  return (
    <div id="products-section" className="relative bg-[#0f0c1b] min-h-screen text-[#f3f0ea] font-['Inter',sans-serif]">
      
      {/* --- SERVICE GRID PAGE --- */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-[1240px] mx-auto py-12 px-8"
      >
        <motion.div variants={fadeInUpVariants} className="text-center mb-14">
          <h1 className="text-[#dfba6b] text-4xl font-light uppercase tracking-[2px] mb-2">
            Amavasya Monthly Pooja
          </h1>
          <p className="text-[#f3f0ea]/60 text-base tracking-[0.5px]">
            Select a sacred ritual to invoke divine blessings, protection, and transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10">
          {loading ? (
            <div className="col-span-full text-center py-20 text-[#dfba6b]">
              Loading pooja offerings...
            </div>
          ) : servicesData.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[#f3f0ea]/60 border border-dashed border-[#dfba6b]/25 rounded">
              No pooja offerings found.
            </div>
          ) : (
            servicesData.map((service) => (
              <motion.div 
                key={service.id}
                variants={fadeInUpVariants}
                onClick={(e) => handleOpenPopup(service.id, e)}
                className="bg-[#130f24] border border-[#dfba6b]/15 rounded cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out hover:border-[#dfba6b]/50 hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="w-full h-[220px] overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/saraa-logo.jpeg';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#130f24] to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#f3f0ea] text-xl font-medium leading-tight m-0 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#dfba6b] text-[13.5px] italic tracking-[0.5px] m-0 mb-4">
                      {service.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="text-[#dfba6b] text-2xl font-semibold my-4">
                      Rs. {service.price.toLocaleString('en-IN')}
                    </div>

                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={(e) => handleOpenPopup(service.id, e)}
                        className="flex-1 bg-transparent text-[#dfba6b] border border-[#dfba6b]/40 p-[0.7rem] text-[13px] font-semibold uppercase tracking-[1px] cursor-pointer transition-all duration-200 hover:bg-[#dfba6b]/10 hover:border-[#dfba6b]"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={(e) => handleAddToCart(service, e)}
                        className="flex-1 bg-[#dfba6b] text-[#0f0c1b] border-none p-[0.7rem] text-[13px] font-semibold uppercase tracking-[1px] cursor-pointer hover:bg-[#c9a65b] transition-colors duration-200"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* See More button */}
        <motion.div variants={fadeInUpVariants} className="flex justify-center mt-14">
          <button
            onClick={() => navigate('/products/kali-pooja')}
            className="bg-transparent text-[#dfba6b] border border-[#dfba6b]/50 rounded-sm py-[0.9rem] px-[2.2rem] text-[13px] font-semibold uppercase tracking-[1.5px] cursor-pointer transition-all duration-300 ease hover:bg-[#dfba6b]/10 hover:border-[#dfba6b] hover:-translate-y-0.5"
          >
            See More
          </button>
        </motion.div>
      </motion.div>

      {/* --- DETAILS MODAL POPUP --- */}
      {activeServiceId && currentService && (
        <div 
          onClick={handleClosePopup}
          className="fixed inset-0 bg-[#0a0814]/85 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
        >
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#130f24] border border-[#dfba6b]/25 rounded-lg max-w-[900px] w-full max-h-[90vh] overflow-y-auto relative p-10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Elegant Cross Closing Button */}
            <button 
              onClick={handleClosePopup}
              className="absolute top-4 right-6 bg-transparent border-none text-[#dfba6b] text-4xl font-light cursor-pointer leading-none p-1 transition-transform duration-200 hover:scale-110"
            >
              &times;
            </button>

            {/* Content Split Layout */}
            <div className="flex flex-row flex-wrap gap-10 mt-2">
              
              {/* Left Column: Image */}
              <div className="flex-[1_1_350px]">
                <img 
                  src={currentService.image} 
                  alt={currentService.title} 
                  className="w-full rounded border border-[#dfba6b]/15 object-cover h-full min-h-[300px] max-h-[400px]"
                />
              </div>

              {/* Right Column: Text & Pricing Info */}
              <div className="flex-[1_2_400px] flex flex-col justify-between">
                <div>
                  <span className="text-[#dfba6b] uppercase text-xs tracking-[2px] font-semibold">
                    Amavasya Special Ritual
                  </span>
                  <h2 className="text-[#f3f0ea] text-3xl font-light mt-2 mb-3 leading-tight">
                    {currentService.title}
                  </h2>
                  <div className="text-[#dfba6b] text-3xl font-semibold mb-5">
                    Rs. {currentService.price.toLocaleString('en-IN')}
                  </div>
                  
                  <hr className="border-none border-t border-[#dfba6b]/15 my-4" />
                  
                  <p className="text-[#f3f0ea]/80 leading-relaxed text-[15px] mb-6">
                    {currentService.description}
                  </p>

                  <h4 className="text-[#dfba6b] uppercase text-[13.5px] tracking-[1px] mb-2">
                    What this offering includes:
                  </h4>
                  <ul className="pl-5 m-0 mb-8 text-[#f3f0ea]/75 leading-loose text-sm list-disc">
                    {currentService.inclusions.map((inc, index) => (
                      <li key={index} className="mb-1">{inc}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={(e) => {
                    handleAddToCart(currentService, e);
                    handleClosePopup(); 
                  }}
                  className="bg-[#dfba6b] text-[#0f0c1b] border-none py-4 px-8 text-[15px] font-semibold uppercase tracking-[1.5px] cursor-pointer w-full rounded-sm transition-opacity duration-200 hover:opacity-90"
                >
                  Book Pooja (Add to Cart)
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}