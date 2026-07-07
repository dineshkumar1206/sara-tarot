import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CATEGORIES_DATA = {
  'tarot-consultation': {
    title: 'Tarot Reading Private Consultation',
    subtitle: 'PERSONALIZED CELESTIAL GUIDANCE',
    description: 'Get deep clarity, practical solutions, and spiritual remedies for your life. All consultations are personalized and conducted by Sara via voice note or live call.',
    themeColor: '#B8467A',
    items: [
      {
        id: 'tarot-1-question',
        name: 'One Question Consultation',
        price: 500,
        type: 'Voice Note Only',
        desc: 'Submit 1 specific question. You will receive a detailed audio voice note explaining your cards and solutions.'
      },
      {
        id: 'tarot-30-mins',
        name: '30 Minutes Session',
        price: 2500,
        type: 'Live Call or Voice Note',
        desc: 'Covers up to 3 questions, detailed solutions, and interactive guidance.'
      },
      {
        id: 'tarot-1-hour',
        name: '1 Hour Session',
        price: 4000,
        type: 'Live Call or Voice Note',
        desc: 'Covers up to 7 questions, deep-dive solutions, remedies, and astrological chart guidance.'
      },
      {
        id: 'tarot-angel-messages',
        name: 'Angel Messages',
        price: 1500,
        type: 'Voice Note Only',
        desc: 'Receive special angel guidance and messages for 2 specific questions.'
      },
      {
        id: 'tarot-murugan-messages',
        name: 'Murugan Message Reading',
        price: 1500,
        type: 'Voice Note Only',
        desc: 'Specific guidance and messages for 2 questions via Sara Murugan Cards.'
      },
      {
        id: 'tarot-relationship',
        name: 'Relationship Specific Session',
        price: 3800,
        type: 'Live Call or Voice Note',
        desc: 'Specialized focus on relationship dynamics, healing, and compatibility analysis.'
      },
      {
        id: 'tarot-past-present-future',
        name: 'Past, Present & Future Reading',
        price: 6500,
        type: 'Live Call or Voice Note',
        desc: 'Comprehensive life spread analyzing your past influences, current state, and future paths.'
      },
      {
        id: 'tarot-past-life',
        name: 'Past Life Reading Session',
        price: 8000,
        type: 'Live Call or Voice Note',
        desc: 'Explore your past life karmas, lessons, and how they impact your current lifetime.'
      },
      {
        id: 'tarot-healing-session',
        name: 'Spiritual Healing Session (40 Mins)',
        price: 7000,
        type: 'Duration: 40 minutes',
        desc: 'Energy healing session tailored for relationships, money attraction, career, mental peace, or protection.'
      },
      {
        id: 'tarot-special-guidance',
        name: 'Special Spiritual Guidance & Remedies',
        price: 5000,
        type: 'Live Call or Zoom Call',
        desc: 'Holistic spiritual guidance combined with active remedies for wellness.'
      }
    ],
    policy: {
      intro: 'Dear Sir/Madam, please review our consultation guidelines below:',
      points: [
        'WhatsApp Call or Zoom Call options are available.',
        'Appointments will be given within 10 days from when the date of your payment is confirmed by you.',
        'Express Booking: If you want to get an appointment within 24 hours, you can pay an extra Rs. 1,000 for your selected session.'
      ]
    }
  },
  'spiritual-healing': {
    title: 'Spiritual Healing',
    subtitle: 'RESTORE ENERGY AND HARMONY',
    description: 'Experience deep energy cleansing and aura healing. Clear mental blockages, dissolve negative energies, and invite wealth, love, and protection into your life.',
    themeColor: '#4A90E2',
    items: [
      {
        id: 'healing-relationship',
        name: 'Relationship Healing Session',
        price: 7000,
        type: 'Duration: 40 minutes',
        desc: 'Clears toxic residue, heals emotional wounds, and opens heart chakra channels to restore relationship peace.'
      },
      {
        id: 'healing-money',
        name: 'Money Attraction Healing',
        price: 7000,
        type: 'Duration: 40 minutes',
        desc: 'Removes financial blockages, aligns root and solar plexus chakra frequencies to attract career growth and wealth.'
      },
      {
        id: 'healing-peace',
        name: 'Mental Peace & Aura Cleansing',
        price: 7000,
        type: 'Duration: 40 minutes',
        desc: 'Dissolves stress, anxiety, and external negative vibes. Restores sleep cycles and mental clarity.'
      },
      {
        id: 'healing-protection',
        name: 'Protection Healing Shield',
        price: 7000,
        type: 'Duration: 40 minutes',
        desc: 'Builds a protective auric shield to neutralize negative thoughts, evil eyes, and external psychic attacks.'
      }
    ],
    policy: {
      intro: 'Spiritual Healing Guidelines:',
      points: [
        'Conducted online via Zoom or WhatsApp video/audio call.',
        'Includes pre-session energy scan and post-session guidelines.',
        'Appointments scheduled within 10 days of payment confirmation. Express slots available (+Rs. 1,000).'
      ]
    }
  },
  'crystals': {
    title: 'Blessed & Energized Crystals',
    subtitle: 'SACRED GEOMETRY & ENERGY TOOLS',
    description: 'A curated selection of natural crystals, hand-selected, cleansed, and programmed with specific intentions by Sara to support your healing and manifest your desires.',
    themeColor: '#9B51E0',
    items: [
      {
        id: 'crystal-pyrite',
        name: 'Golden Pyrite Cluster',
        price: 1800,
        type: 'Blessed and Energized',
        desc: 'The ultimate stone for wealth, abundance, and business opportunities. Place it on your work desk or home locker.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=400&q=80'
      },
      {
        id: 'crystal-amethyst',
        name: 'Raw Amethyst Geode',
        price: 1500,
        type: 'Blessed and Energized',
        desc: 'Promotes deep calm, stress relief, and opens the third-eye chakra. Perfect for your home temple or meditation room.',
        image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&h=400&q=80'
      },
      {
        id: 'crystal-rose-quartz',
        name: 'Rose Quartz Love Bowl / Tumbles',
        price: 1400,
        type: 'Blessed and Energized',
        desc: 'Emits gentle vibes of unconditional love, compassion, and emotional healing. Harmonizes relationship conflicts.',
        image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&h=400&q=80'
      },
      {
        id: 'crystal-tourmaline',
        name: 'Raw Black Tourmaline Shield',
        price: 1600,
        type: 'Blessed and Energized',
        desc: 'The strongest grounding and protective stone. Deflects psychic attack, evil-eye, and absorbs electromagnetic haze.',
        image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=400&h=400&q=80'
      },
      {
        id: 'crystal-clear-quartz',
        name: 'Clear Quartz Generator Point',
        price: 1200,
        type: 'Blessed and Energized',
        desc: 'The master healer. Amplifies the energy of other crystals and purifies the local environment of stagnant energy.',
        image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&h=400&q=80'
      }
    ],
    policy: {
      intro: 'Crystal Delivery Details:',
      points: [
        'All crystals are physically cleansed and spiritually energized in India prior to dispatch.',
        'Shipped with sacred prasadham and instructions on crystal care and reprogramming.',
        'Dispatched within 3-5 working days of booking confirmation.'
      ]
    }
  },
  'murugar-cards': {
    title: 'Murugar Cards Reading',
    subtitle: 'DIVINE VEL GUIDANCE',
    description: 'Seek the sacred guidance and remedies of Lord Murugan. Receive pure answers to critical life questions, business directions, and spiritual obstacles.',
    themeColor: '#E28743',
    items: [
      {
        id: 'murugar-messages-standard',
        name: 'Sara Murugan Card Reading (2 Questions)',
        price: 1500,
        type: 'Voice Note Analysis',
        desc: 'Submit 2 specific questions. Receive deep insights, Murugan blessings, and practical remedies in a detailed voice note.'
      }
    ],
    policy: {
      intro: 'Murugar Cards Reading Guidelines:',
      points: [
        'Answers delivered via detailed WhatsApp voice note.',
        'Scheduled within 10 days of payment verification. Express option available (+Rs. 1,000).'
      ]
    }
  },
  'tarot-classes': {
    title: 'Tarot Card Reading Classes',
    subtitle: 'LEARN THE ANCIENT MYSTIC ART',
    description: 'Learn the professional art of Tarot. Become a certified practitioner, learn to connect with your intuition, read spreads, and start your own professional practice.',
    themeColor: '#D9B56A',
    items: [
      {
        id: 'class-tarot-professional',
        name: 'Professional Tarot Masterclass',
        price: 15000,
        type: 'Full Course Certification',
        desc: 'Interactive online classes covering Major & Minor Arcana, symbolism, intuition connection, specialized spreads, and business startup modules.'
      }
    ],
    policy: {
      intro: 'Course Enrollment Details:',
      points: [
        'Live interactive sessions on Zoom with recorded session library access.',
        'Includes comprehensive PDF workbook, cheat sheets, and private support community access.',
        'Class schedules are coordinated with you personally upon registration confirmation.'
      ]
    }
  },
  'counseling-classes': {
    title: 'Spiritual Counseling Classes',
    subtitle: 'COACHING, REMEDIES & MENTAL PEACE',
    description: 'Transformative coaching classes designed to teach counseling techniques, emotional release models, daily mental peace practices, and active spiritual remedies.',
    themeColor: '#2D1B4E',
    items: [
      {
        id: 'class-counseling-spiritual',
        name: 'Spiritual Counseling & Life Coaching Course',
        price: 12000,
        type: 'Full Course Certification',
        desc: 'Learn active remedies, psychological-spiritual counseling frameworks, aura analysis, and techniques to guide others towards mental wellness.'
      }
    ],
    policy: {
      intro: 'Class Enrollment Details:',
      points: [
        'Conducted live via Zoom, featuring practical hands-on counseling simulations.',
        'Includes workbook, reference guides, and counseling frameworks.',
        'Schedules finalized with the cohort or individual upon registration.'
      ]
    }
  },
  'kali-pooja': {
    title: 'Sacred Kali Pooja',
    subtitle: 'DIVINE PROTECTION & PROSPERITY',
    description: 'Powerful monthly Amavasya and special protective rituals dedicated to removing obstacles, evil eyes, dark entities, and financial blocks.',
    themeColor: '#B8467A',
    items: [
      {
        id: 'pooja-growth',
        name: 'Basic Kali Pooja for Growth',
        price: 2001,
        type: 'With Prasadham included',
        desc: 'A monthly Amavasya pooja dedicated to removing stagnation and inviting positive energy, success, and spiritual/material growth into your life.',
        image: '/card-1.jpg'
      },
      {
        id: 'pooja-relationship',
        name: 'Relationship Problems Pooja',
        price: 3001,
        type: 'Heal and harmonize your bonds',
        desc: 'Specially performed during Amavasya to clear misunderstandings, dissolve negative energies between couples or family members, and restore peace.',
        image: '/card-2.jpg'
      },
      {
        id: 'pooja-business',
        name: 'Business Kali Pooja',
        price: 5001,
        type: 'With Prasadham included',
        desc: 'Designed for entrepreneurs and professionals. Invokes Goddess Kali to eliminate corporate evil-eyes, overcome financial blocks, and attract wealth.',
        image: '/card-3.jpg'
      },
      {
        id: 'pooja-black-magic-individual',
        name: 'Black Magic Protection Pooja (Individual)',
        price: 30000,
        type: 'With complete protection materials & prasadham',
        desc: 'An intensive, protective ritual tailored for one individual struggling with severe negativity, unexplained psychological weight, or dark energy interference.',
        image: '/card-4.jpg'
      },
      {
        id: 'pooja-black-magic-family',
        name: 'Black Magic Protection Pooja (Family)',
        price: 50000,
        type: 'Complete protection shield for the whole family',
        desc: 'An expansive and powerful household-level ritual that cleanses your entire living space and creates an unbreakable protective aura around all family members.',
        image: '/card-5.jpg'
      }
    ],
    policy: {
      intro: 'Details Needed From Your Side for Pooja:',
      points: [
        'Full Name & Date of Birth (DOB) of participants.',
        'Rasi (Moon Sign) and Star.',
        'Specific purpose or prayer intentions.',
        'Prasadham will be couriered to your address post-pooja.'
      ]
    }
  }
};

export default function ProductCategoryDetail({ cart = [], setCart }) {
  const { category } = useParams();
  const categoryData = CATEGORIES_DATA[category];

  const [expressChecked, setExpressChecked] = useState(false);

  useEffect(() => {
    // Reset express check when category changes
    setExpressChecked(false);
  }, [category]);

  if (!categoryData) {
    return (
      <div style={{ backgroundColor: '#0f0c1b', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f3f0ea', fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2rem', marginBottom: '1rem' }}>Category Not Found</h2>
        <Link to="/" style={{ color: '#dfba6b', textDecoration: 'none', border: '1px solid #dfba6b', padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Back to Home Layout</Link>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    if (!setCart) return;

    let finalPrice = item.price;
    let nameSuffix = '';

    // If it's a consultation or reading, and express booking is checked, we add Rs 1000 and modify name
    if (expressChecked && (category === 'tarot-consultation' || category === 'murugar-cards' || category === 'spiritual-healing')) {
      finalPrice += 1000;
      nameSuffix = ' (Express 24H)';
    }

    const cartItemId = expressChecked ? `${item.id}-express` : item.id;
    const existingItem = cart.find((c) => c.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === cartItemId
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: `${item.name}${nameSuffix}`,
          price: finalPrice,
          image: item.image || '/saraa-logo.jpeg',
          quantity: 1
        }
      ]);
    }
  };

  const isConsultationLike = category === 'tarot-consultation' || category === 'murugar-cards' || category === 'spiritual-healing';

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
          <span style={{ color: '#dfba6b' }}>{categoryData.title}</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
          <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            {categoryData.subtitle}
          </span>
          <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            {categoryData.title}
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: 0 }}>
            {categoryData.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap' }}>
          
          {/* Items Listing Column */}
          <div style={{ flex: '2 1 600px' }}>
            <h3 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Available Bookings
            </h3>

            {/* Optional Express Booking Toggle for Consultations */}
            {isConsultationLike && (
              <div 
                style={{ 
                  backgroundColor: 'rgba(223, 186, 107, 0.05)', 
                  border: '1px solid rgba(223, 186, 107, 0.3)', 
                  borderRadius: '4px',
                  padding: '1.25rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => setExpressChecked(!expressChecked)}
              >
                <input 
                  type="checkbox" 
                  checked={expressChecked}
                  onChange={() => {}} // handled by div click
                  style={{ 
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                    accentColor: '#dfba6b'
                  }} 
                />
                <div>
                  <div style={{ fontWeight: '600', color: '#dfba6b', fontSize: '14px', letterSpacing: '0.5px' }}>
                    ADD EXPRESS BOOKING (+ Rs. 1,000)
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(243, 240, 234, 0.7)', marginTop: '2px' }}>
                    Guarantees your appointment within 24 hours of payment verification (instead of the standard 10 days wait).
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {categoryData.items.map((item) => (
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
                      ₹{(item.price + (expressChecked && isConsultationLike ? 1000 : 0)).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      style={{
                        backgroundColor: '#dfba6b',
                        color: '#0f0c1b',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '0.75rem 1.5rem',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Book & Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Sidebar Column */}
          <div style={{ flex: '1 1 300px' }}>
            <div 
              style={{
                backgroundColor: '#130f24',
                border: '1px solid rgba(223, 186, 107, 0.25)',
                borderRadius: '6px',
                padding: '2rem',
                position: 'sticky',
                top: '120px',
                backgroundImage: 'linear-gradient(to bottom, rgba(223, 186, 107, 0.02), transparent)'
              }}
            >
              <h4 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Important Notes
              </h4>
              <p style={{ color: 'rgba(243, 240, 234, 0.9)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {categoryData.policy.intro}
              </p>
              
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'rgba(243, 240, 234, 0.75)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                {categoryData.policy.points.map((pt, i) => (
                  <li key={i} style={{ marginBottom: '0.8rem', listStyleType: 'square' }}>
                    {pt}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid rgba(223, 186, 107, 0.15)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: 'rgba(243, 240, 234, 0.5)', display: 'block', marginBottom: '1rem' }}>
                  All sessions require pre-payment verification.
                </span>
                <Link 
                  to="/checkout" 
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    color: '#dfba6b',
                    border: '1px solid rgba(223, 186, 107, 0.5)',
                    padding: '0.75rem',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.1)';
                    e.currentTarget.style.borderColor = '#dfba6b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.5)';
                  }}
                >
                  View My Cart / Pay
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
