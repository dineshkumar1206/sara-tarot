import React from 'react';
import { motion } from 'framer-motion'; // Imported Framer Motion

// ============================================================
// Brand tokens — sampled directly from the Saraa Tarot mark
// (deep indigo-black ground, warm gold linework, magenta bloom)
// ============================================================
const COLORS = {
  ink: '#120B1F',        // primary background
  inkDeep: '#0A0713',    // darker edge for gradients
  panel: '#1D1430',      // image frame / card ground
  gold: '#D9B56A',       // headline accent, button, linework
  goldSoft: '#F0DFB0',   // hover / highlight
  magenta: '#B8467A',    // corner bloom, echoes the logo's pink glow
  ink200: '#B7AFC7',     // muted body copy
  cream: '#F4F0EA',      // high-contrast headline text
};

// ============================================================
// Zodiac wheel — full chart redrawn as SVG
// ============================================================
const ZODIAC_ICONS = {
  Aries: (
    <>
      <path d="M20 30 C20 24 15 25 13 20 C11 16 14 11 18 12" />
      <path d="M20 30 C20 24 25 25 27 20 C29 16 26 11 22 12" />
    </>
  ),
  Taurus: (
    <>
      <circle cx="20" cy="26" r="6" />
      <path d="M14 22 C8 20 7 12 12 9" />
      <path d="M26 22 C32 20 33 12 28 9" />
    </>
  ),
  Gemini: (
    <>
      <line x1="14" y1="10" x2="14" y2="30" />
      <line x1="26" y1="10" x2="26" y2="30" />
      <line x1="10" y1="10" x2="18" y2="10" />
      <line x1="10" y1="30" x2="18" y2="30" />
      <line x1="22" y1="10" x2="30" y2="10" />
      <line x1="22" y1="30" x2="30" y2="30" />
    </>
  ),
  Cancer: (
    <>
      <circle cx="15" cy="14" r="3.5" />
      <path d="M15,17.5 C15,24 25,24 25,18" />
      <circle cx="25" cy="26" r="3.5" />
      <path d="M25,22.5 C25,16 15,16 15,22" />
    </>
  ),
  Leo: (
    <>
      <circle cx="16" cy="14" r="5" />
      <path d="M16,19 C16,26 24,24 24,30 C24,34 30,33 30,28" />
    </>
  ),
  Virgo: (
    <>
      <path d="M11,11 V28" />
      <path d="M19,11 V24" />
      <path d="M19,24 C19,29 25,30 27,26 C28,23 25,21 23,24" />
    </>
  ),
  Libra: (
    <>
      <line x1="20" y1="9" x2="20" y2="14" />
      <line x1="10" y1="15" x2="30" y2="15" />
      <path d="M6,15 C6,21 14,21 14,15" />
      <path d="M26,15 C26,21 34,21 34,15" />
      <line x1="20" y1="15" x2="20" y2="27" />
      <line x1="13" y1="30" x2="27" y2="30" />
    </>
  ),
  Scorpio: (
    <>
      <path d="M9,11 V28" />
      <path d="M17,11 V28" />
      <path d="M17,28 H27" />
      <path d="M27,28 V20" />
      <path d="M27,20 L23,22" />
      <path d="M27,20 L31,24" />
    </>
  ),
  Sagittarius: (
    <>
      <line x1="10" y1="30" x2="30" y2="10" />
      <path d="M30,10 L24,12" />
      <path d="M30,10 L28,16" />
      <line x1="14" y1="24" x2="19" y2="29" />
    </>
  ),
  Capricorn: (
    <>
      <path d="M9,12 L15,26 L20,13" />
      <path d="M20,13 C20,20 27,19 27,26 C27,31 33,31 33,26" />
    </>
  ),
  Aquarius: (
    <>
      <path d="M7,16 C10,12 13,20 16,16 C19,12 22,20 25,16 C28,12 31,20 33,16" />
      <path d="M7,25 C10,21 13,29 16,25 C19,21 22,29 25,25 C28,21 31,29 33,25" />
    </>
  ),
  Pisces: (
    <>
      <path d="M13,10 C7,14 7,26 13,30" />
      <path d="M27,10 C33,14 33,26 27,30" />
      <line x1="13" y1="20" x2="27" y2="20" />
    </>
  ),
};

const ZODIAC_SIGNS = [
  { name: 'Aries', dates: 'Mar 21 – Apr 19', glyph: '♈', element: 'fire', gender: 'm' },
  { name: 'Taurus', dates: 'Apr 20 – May 20', glyph: '♉', element: 'earth', gender: 'f' },
  { name: 'Gemini', dates: 'May 21 – Jun 21', glyph: '♊', element: 'air', gender: 'm' },
  { name: 'Cancer', dates: 'Jun 22 – Jul 22', glyph: '♋', element: 'water', gender: 'f' },
  { name: 'Leo', dates: 'Jul 23 – Aug 22', glyph: '♌', element: 'fire', gender: 'm' },
  { name: 'Virgo', dates: 'Aug 23 – Sep 22', glyph: '♍', element: 'earth', gender: 'f' },
  { name: 'Libra', dates: 'Sep 23 – Oct 23', glyph: '♎', element: 'air', gender: 'm' },
  { name: 'Scorpio', dates: 'Oct 24 – Nov 21', glyph: '♏', element: 'water', gender: 'f' },
  { name: 'Sagittarius', dates: 'Nov 22 – Dec 21', glyph: '♐', element: 'fire', gender: 'm' },
  { name: 'Capricorn', dates: 'Dec 22 – Jan 19', glyph: '♑', element: 'earth', gender: 'f' },
  { name: 'Aquarius', dates: 'Jan 20 – Feb 18', glyph: '♒', element: 'air', gender: 'm' },
  { name: 'Pisces', dates: 'Feb 19 – Mar 20', glyph: '♓', element: 'water', gender: 'f' },
];

const WHEEL_R = {
  outer: 240,
  nameOuter: 235,
  nameInner: 195,
  iconOuter: 195,
  iconInner: 145,
  mfR: 130,
  mfDiv: 118,
  glyphR: 98,
  glyphDiv: 80,
  elR: 66,
  elDiv: 52,
  numR: 40,
  centerR: 32,
};

function polar(r, deg, cx = 250, cy = 250) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
}

function ZodiacWheel({ size = 620, gold = '#D9B56A', dim = '#9C8FB0' }) {
  const cx = 250;
  const cy = 250;

  return (
    <svg viewBox="0 0 500 500" width={size} height={size} style={{ display: 'block' }}>
      <g fill="none" stroke={gold} strokeLinecap="round" strokeLinejoin="round">
        {[WHEEL_R.outer, WHEEL_R.nameInner, WHEEL_R.iconInner, WHEEL_R.centerR].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="1" opacity="0.85" />
        ))}
        {[WHEEL_R.mfDiv, WHEEL_R.glyphDiv, WHEEL_R.elDiv].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="0.6" opacity="0.45" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const b = 15 + 30 * i;
          const [x1, y1] = polar(WHEEL_R.outer, b);
          const [x2, y2] = polar(WHEEL_R.elDiv, b);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.6" opacity="0.35" />;
        })}
      </g>

      {ZODIAC_SIGNS.map((s, k) => {
        const clockAngle = (360 - 30 * k) % 360;
        let rot = clockAngle;
        if (rot > 90 && rot < 270) rot += 180;

        const [nx, ny] = polar((WHEEL_R.nameOuter + WHEEL_R.nameInner) / 2, clockAngle);
        const [ix, iy] = polar((WHEEL_R.iconOuter + WHEEL_R.iconInner) / 2, clockAngle);
        const [gx, gy] = polar(WHEEL_R.mfR, clockAngle);
        const [zx, zy] = polar(WHEEL_R.glyphR, clockAngle);
        const [ex, ey] = polar(WHEEL_R.elR, clockAngle);
        const [numx, numy] = polar(WHEEL_R.numR, clockAngle);

        const up = s.element === 'fire' || s.element === 'air';
        const tri = up ? 'M0,-5 L5,4 L-5,4 Z' : 'M0,5 L5,-4 L-5,-4 Z';
        const barY = up ? 1.3 : -1.3;

        return (
          <g key={s.name}>
            <g transform={`translate(${nx},${ny}) rotate(${rot})`}>
              <text textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="700" fill={gold} letterSpacing="1">
                {s.name.toUpperCase()}
              </text>
              <text y="14" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="7" fill={dim}>
                {s.dates}
              </text>
            </g>

            <g transform={`translate(${ix},${iy}) rotate(${rot}) scale(1.25) translate(-20,-20)`}>
              <g stroke={gold} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {ZODIAC_ICONS[s.name]}
              </g>
            </g>

            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={dim}>
              {s.gender === 'm' ? '♂' : '♀'}
            </text>

            <text x={zx} y={zy} textAnchor="middle" dominantBaseline="middle" fontSize="20" fill={gold}>
              {s.glyph}
            </text>

            <g transform={`translate(${ex},${ey})`}>
              <path d={tri} stroke={dim} strokeWidth="1" fill="none" />
              {(s.element === 'air' || s.element === 'earth') && (
                <line x1="-4" y1={barY} x2="4" y2={barY} stroke={dim} strokeWidth="1" />
              )}
            </g>

            <text x={numx} y={numy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={dim}>
              {k + 1}
            </text>
          </g>
        );
      })}

      <text x={cx} y={cy - 5} textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="10" letterSpacing="2" fill={gold}>
        SIGNS OF THE
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" letterSpacing="2" fill={gold}>
        ZODIAC
      </text>
    </svg>
  );
}

export default function Hero() {
  // Shared text animation variant configurations (Fade In Up)
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: '95vh',
        background: `radial-gradient(120% 90% at 88% 6%, rgba(184,70,122,0.28) 0%, rgba(184,70,122,0) 45%), linear-gradient(180deg, ${COLORS.ink} 0%, ${COLORS.inkDeep} 100%)`,
        color: COLORS.cream,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* Scoped font import + responsive / hover rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Poppins:wght@300;400;500;600&display=swap');

        .saraa-cta {
          transition: background-color .35s ease, color .35s ease, transform .35s ease;
        }
        .saraa-cta:hover {
          background-color: ${COLORS.cream} !important;
          color: ${COLORS.inkDeep} !important;
          transform: translateY(-1px);
        }
        .saraa-dot {
          transition: background-color .3s ease, transform .3s ease;
        }

        @media (max-width: 900px) {
          .saraa-content-row {
            flex-direction: column-reverse !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            padding-top: 6rem !important;
            padding-bottom: 3rem !important;
            gap: 3rem !important;
          }
          .saraa-image-col {
            width: 100% !important;
            max-width: 320px !important;
            flex: 0 0 auto !important;
            margin-left: 0 !important; 
          }
        }
      `}</style>

      {/* Zodiac wheel, left-hand background accent */}
      <div
        style={{
          position: 'absolute',
          left: '-190px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.30,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <ZodiacWheel size={640} gold={COLORS.gold} dim={COLORS.ink200} />
      </div>

      {/* Structural row */}
      <div
        className="saraa-content-row"
        style={{
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',       
          flexWrap: 'nowrap',         
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 5,
          padding: '0 6vw',
          boxSizing: 'border-box',
        }}
      >
        {/* Left typography block — Parent container for orchestrated text appearance */}
        <motion.div 
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }} // Delays each nested child block for a sequenced layout build
          style={{ flex: '0 1 60%', maxWidth: '680px', boxSizing: 'border-box' }}
        >
          <motion.h1
            variants={fadeInUpVariants}
            style={{
              margin: '0 0 2rem 0',
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
            }}
          >
            {/* Forces "Unlock" and "The Best" to remain strictly on a single line */}
            <div style={{ display: 'block', whiteSpace: 'nowrap' }}>
              {/* "Unlock" standard filled serif */}
              <span 
                style={{ 
                  fontSize: 'clamp(42px, 5.5vw, 92px)', 
                  color: COLORS.cream,
                  marginRight: '20px' 
                }}
              >
                Unlock
              </span>

              {/* "The Best" outlined font layout */}
              <span 
                style={{ 
                  fontSize: 'clamp(42px, 5.5vw, 92px)', 
                  color: 'transparent',
                  WebkitTextStroke: `2px ${COLORS.cream}`,
                  letterSpacing: '0.5px'
                }}
              >
                The Best
              </span>
            </div>

            {/* "Future" massive serif italic layout breaking cleanly onto line two */}
            <span
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(60px, 8vw, 100px)',
                lineHeight: 1.05,
                color: COLORS.cream,
                marginTop: '0.5rem',
              }}
            >
              Future
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUpVariants}
            style={{
              color: 'rgba(244, 240, 234, 0.85)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 1.75,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '480px',
            }}
          >
            <p style={{ margin: 0 }}>
              Discover insights, guidance, and clarity through personalized tarot readings.
              Gain clarity and direction with every card you draw.
            </p>
            <p style={{ margin: 0 }}>Explore the path ahead with confidence.</p>
          </motion.div>
        </motion.div>

        {/* Right imagery block — Animated into motion component container */}
        <motion.div
          className="saraa-image-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.025,
            boxShadow: '0 40px 80px rgba(184, 70, 122, 0.15)', // Custom colorful glow accent matching the brand tokens on hover
            transition: { duration: 0.4, ease: 'easeOut' }
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          style={{
            flex: '0 0 400px',        
            maxWidth: '460px',
            position: 'relative',
            borderRadius: '22px',
            overflow: 'hidden',
            border: `1px solid rgba(217,181,106,0.25)`,
            backgroundColor: COLORS.panel,
            boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
            cursor: 'pointer'
          }}
        >
          {/* ========================================== */}
          {/* CHANGE IMAGE HERE: Update the src value below with your image link */}
          {/* ========================================== */}
          <img
            src={'/hero-1.png'}
            alt="Personalized tarot reading session"
            style={{
              width: '100%',
              height: '100%',
              aspectRatio: '4 / 5',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Call to action */}
          <button
            className="saraa-cta"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.gold,
              color: COLORS.inkDeep,
              border: 'none',
              padding: '1.2rem 2.5rem',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              zIndex: 15,
            }}
          >
            Book A Reading
          </button>
        </motion.div>
      </div>

      {/* Carousel markers */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 6,
        }}
      >
        <span className="saraa-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: COLORS.gold }} />
        <span className="saraa-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'rgba(244,240,234,0.2)' }} />
      </div>
    </section>
  );
}