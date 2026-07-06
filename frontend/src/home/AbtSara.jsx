import React from "react";
import { motion } from "framer-motion";

// ============================================================
// Brand tokens — Sampled from Saraa Tarot Theme
// ============================================================
const COLORS = {
  ink: '#120B1F',        // primary background
  inkDeep: '#0A0713',    // darker edge for gradients
  panel: '#1D1430',      // image frame / card ground
  gold: '#D9B56A',       // headline accent, button, linework
  goldSoft: '#F0DFB0',   // hover / highlight
  magenta: '#B8467A',    // corner bloom / glow highlights
  ink200: '#B7AFC7',     // muted body copy
  cream: '#F4F0EA',      // high-contrast headline text
};

// ============================================================
// IMAGE SOURCES — Replace these strings with your actual paths
// ============================================================
const IMAGES = {
  mainPortrait: "/abt-1.png", // Replaces image_d1c2a6.png
  moonCircle: "/abt-5.jpg",    // Replaces the circular moon image
  handArch: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&h=400&q=80",      // Replaces image_d1c2fc.png (Archway)
  cardSpread: "/abt-2.jpg",    // Replaces image_d1c31e.png
  smallTextEmbed: "/ab-4.jpg", // Replaces image_d1c340.png next to button
};

export default function AbtSara() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Poppins:wght@300;400;500;600&display=swap');

        .pd-more-btn {
          transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease;
        }
        .pd-more-btn:hover {
          background-color: ${COLORS.gold} !important;
          color: ${COLORS.inkDeep} !important;
          border-color: ${COLORS.gold} !important;
        }
        .pd-purchase-btn {
          transition: background-color 0.35s ease, color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        .pd-purchase-btn:hover {
          background-color: ${COLORS.cream} !important;
          color: ${COLORS.inkDeep} !important;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(184, 70, 122, 0.2);
        }
        @media (max-width: 900px) {
          .pd-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .pd-right-col-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

      <div style={styles.curve} aria-hidden="true" />

      <motion.div 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        style={styles.container}
      >
        <motion.p variants={fadeInUpVariants} style={styles.eyebrow}>Tarot Reading</motion.p>
        <motion.h1 variants={fadeInUpVariants} style={styles.heading}>Personalized Divination</motion.h1>

        <div className="pd-grid" style={styles.grid}>
          {/* Left Column: Main Portrait Image Container */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
            style={styles.portraitWrap}
          >
            <img 
              src={IMAGES.mainPortrait} 
              alt="Personalized divination portrait session" 
              style={styles.imageFit} 
            />
          </motion.div>

          {/* Middle Column: Typography & Inline Action Embed */}
          <motion.div variants={fadeInUpVariants} style={styles.textCol}>
            <p style={styles.paragraph}>
              Discover solutions to dilemmas, gain perspective on life transitions, and
              harness the power of ancient wisdom to shape your future.
            </p>
            <p style={styles.paragraph}>
              I interpret the unique positions of the planets at the moment of your birth
              to uncover your innate strengths.
            </p>
            <div style={styles.moreRow}>
              <button className="pd-more-btn" style={styles.moreBtn}>
                More Info
              </button>
              {/* Miniature Embedded Action Image Area */}
              <div style={styles.smallImage}>
                <img 
                  src={IMAGES.smallTextEmbed} 
                  alt="Tarot reading detail element" 
                  style={styles.imageFit} 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Composite Image Cluster Area */}
          <motion.div variants={fadeInUpVariants} style={styles.rightCol}>
            <div className="pd-right-col-grid" style={styles.rightTopRow}>
              {/* Moon Circular Crop Image Box */}
              <motion.div whileHover={{ scale: 1.04 }} style={styles.squareImage}>
                <img 
                  src={IMAGES.moonCircle} 
                  alt="Esoteric moon dynamic illustration" 
                  style={styles.imageFit} 
                />
              </motion.div>
              {/* Sacred Arch Framed Image Box */}
              <motion.div whileHover={{ scale: 1.04 }} style={styles.archFrameImage}>
                <img 
                  src={IMAGES.handArch} 
                  alt="Mystical hands divination display" 
                  style={styles.imageFit} 
                />
              </motion.div>
            </div>
            {/* Lower Asymmetric Structural Image Box */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              style={styles.wideImage}
            >
              <img 
                src={IMAGES.cardSpread} 
                alt="Tarot cards dynamic ritual spread layout" 
                style={styles.imageFit} 
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Backdrop Decorative Geometry */}
        <div style={styles.diamondWrap} aria-hidden="true">
          <div style={styles.diamond} />
          <svg width="220" height="220" style={styles.rays}>
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x2 = 110 + 108 * Math.cos(rad);
              const y2 = 110 + 108 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1="110"
                  y1="110"
                  x2={x2}
                  y2={y2}
                  stroke="rgba(217, 181, 106, 0.15)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        <button className="pd-purchase-btn" style={styles.purchaseBtn}>
          Purchase Now
        </button>
      </motion.div>
    </div>
  );
}

/* ---------------------------------- styles ---------------------------------- */

const styles = {
  page: {
    position: "relative",
    background: `linear-gradient(180deg, ${COLORS.ink} 0%, ${COLORS.inkDeep} 100%)`,
    fontFamily: "'Poppins', sans-serif",
    color: COLORS.ink200,
    padding: "80px 24px 160px",
    overflow: "hidden",
    minHeight: "700px",
  },
  curve: {
    position: "absolute",
    top: "-260px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1400px",
    height: "440px",
    borderRadius: "50%",
    background: `radial-gradient(50% 50% at 50% 50%, rgba(184, 70, 122, 0.12) 0%, rgba(184, 70, 122, 0) 100%), ${COLORS.panel}`,
    zIndex: 0,
    borderBottom: `1px solid rgba(217, 181, 106, 0.1)`,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1240px",
    margin: "0 auto",
  },
  eyebrow: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: COLORS.gold,
    margin: "0 0 8px",
  },
  heading: {
    textAlign: "center",
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "clamp(36px, 5vw, 54px)",
    fontWeight: 400,
    letterSpacing: "0.5px",
    margin: "0 0 64px",
    color: COLORS.cream,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr 1.1fr",
    gap: "48px",
    alignItems: "center",
  },
  portraitWrap: {
    width: "100%",
    aspectRatio: "4 / 5",
    overflow: "hidden",
    borderRadius: "16px",
    border: `1px solid rgba(217, 181, 106, 0.2)`,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
    backgroundColor: COLORS.panel,
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px 0",
  },
  paragraph: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 300,
    fontSize: "15px",
    lineHeight: "1.8",
    color: COLORS.ink200,
    margin: "0 0 24px",
  },
  moreRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  moreBtn: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    background: "transparent",
    border: `1px solid ${COLORS.gold}`,
    color: COLORS.gold,
    padding: "16px 32px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  smallImage: {
    width: "140px",
    height: "90px",
    overflow: "hidden",
    borderRadius: "12px",
    border: `1px solid rgba(217, 181, 106, 0.15)`,
    flexShrink: 0,
    backgroundColor: COLORS.panel,
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  rightTopRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    alignItems: "center",
  },
  squareImage: {
    aspectRatio: "1 / 1",
    overflow: "hidden",
    borderRadius: "50%",
    border: `1px solid rgba(217, 181, 106, 0.15)`,
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    backgroundColor: COLORS.panel,
  },
  archFrameImage: {
    aspectRatio: "1 / 1",
    overflow: "hidden",
    borderRadius: "100px 100px 12px 12px",
    border: `1px solid rgba(217, 181, 106, 0.2)`,
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    backgroundColor: COLORS.panel,
  },
  wideImage: {
    width: "100%",
    aspectRatio: "16 / 11",
    overflow: "hidden",
    borderRadius: "0px 0px 80px 80px",
    border: `1px solid rgba(217, 181, 106, 0.2)`,
    boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
    backgroundColor: COLORS.panel,
  },
  imageFit: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  diamondWrap: {
    position: "absolute",
    left: "50%",
    bottom: "-50px",
    transform: "translateX(-50%)",
    width: "220px",
    height: "220px",
    zIndex: 0,
    pointerEvents: "none",
  },
  diamond: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "110px",
    height: "110px",
    background: COLORS.panel,
    border: `1px solid rgba(217, 181, 106, 0.15)`,
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
  rays: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  purchaseBtn: {
    position: "absolute",
    right: "0px",
    bottom: "-60px",
    zIndex: 2,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    background: COLORS.gold,
    color: COLORS.inkDeep,
    border: "none",
    padding: "18px 36px",
    cursor: "pointer",
    borderRadius: "4px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
};