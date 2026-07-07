import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TarotConsultation from '../components/categories/TarotConsultation';
import SpiritualHealing from '../components/categories/SpiritualHealing';
import Crystals from '../components/categories/Crystals';
import MurugarCards from '../components/categories/MurugarCards';
import TarotClasses from '../components/categories/TarotClasses';
import CounselingClasses from '../components/categories/CounselingClasses';
import KaliPooja from '../components/categories/KaliPooja';

export default function ProductCategoryDetail({ cart = [], setCart }) {
  const { category } = useParams();

  switch (category) {
    case 'tarot-consultation':
      return <TarotConsultation cart={cart} setCart={setCart} />;
    case 'spiritual-healing':
      return <SpiritualHealing cart={cart} setCart={setCart} />;
    case 'crystals':
      return <Crystals cart={cart} setCart={setCart} />;
    case 'murugar-cards':
      return <MurugarCards cart={cart} setCart={setCart} />;
    case 'tarot-classes':
      return <TarotClasses cart={cart} setCart={setCart} />;
    case 'counseling-classes':
      return <CounselingClasses cart={cart} setCart={setCart} />;
    case 'kali-pooja':
      return <KaliPooja cart={cart} setCart={setCart} />;
    default:
      return (
        <div style={{ backgroundColor: '#0f0c1b', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f3f0ea', fontFamily: "'Inter', sans-serif" }}>
          <h2 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2rem', marginBottom: '1rem' }}>Category Not Found</h2>
          <Link to="/" style={{ color: '#dfba6b', textDecoration: 'none', border: '1px solid #dfba6b', padding: '0.75rem 1.5rem', borderRadius: '4px' }}>Back to Home</Link>
        </div>
      );
  }
}
