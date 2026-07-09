import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// ============================================================
// IMAGE SOURCES
// ============================================================
const IMAGES = {
  mainPortrait: "/abt-1.png", 
  moonCircle: "/moon.png",    
  handArch: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&h=400&q=80",      
  cardSpread: "/abt.jpeg",    
  smallTextEmbed: "/ab-4.jpg", 
};

export default function AbtSara() {
  // 1. Create a reference tracking the entire component section wrapper
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // 2. Track scroll status over this specific container element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Captures the entire transit window across viewport
  });

  // 3. Define specific scroll mapping values for every element
  // Moon: Moves from top to bottom (y: -40 to 40) + rotates smoothly anti-clockwise (0 to -45 deg)
  const moonY = useTransform(scrollYProgress, [0, 1], [-100, -20]);
  const moonRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // HandArch: Moves from bottom to top (y: 40 to -40)
  const handArchY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // CardSpread: Moves from top to bottom (y: -50 to 50)
  const cardSpreadY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // SmallTextEmbed: Moves from left side to right side (x: -30 to 30)
  const textEmbedX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  return (
    <div 
      ref={sectionRef} 
      id="about" 
      className="relative bg-gradient-to-b from-[#120B1F] to-[#0A0713] text-[#B7AFC7] py-20 px-6 pb-40 overflow-hidden min-h-[700px]"
    >
      {/* Required for the fonts to load if not already in index.html */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.12 }}
        className="relative z-10 max-w-[1240px] mx-auto"
      >
        {/* Eyebrow */}
        <motion.p 
          variants={fadeInUpVariants} 
          className="text-center font-['Poppins'] font-normal text-[14px] uppercase tracking-[3px] text-[#D9B56A] m-0 mb-2"
        >
          The Founder
        </motion.p>
        
        {/* Heading */}
        <motion.h2 
          variants={fadeInUpVariants} 
          className="text-center font-['Playfair_Display'] text-[clamp(44px,6.5vw,72px)] font-normal tracking-[0.5px] m-0 mb-16 text-[#F4F0EA]"
        >
          The Story of Saraa Tarot
        </motion.h2>

        {/* UPDATED MOON IMAGE
          - Positioned absolute to sit just below the heading on the right side.
          - Size significantly reduced (w-[75px] md:w-[90px]). 
        */}
        <motion.div 
          style={{ y: moonY, rotate: moonRotate }}
          whileHover={{ scale: 1.04 }}
          className="absolute right-4 top-[100px] lg:right-10 lg:top-[120px] w-[75px] h-[75px] md:w-[90px] md:h-[90px] overflow-hidden rounded-full border border-[#D9B56A]/15 shadow-[0_15px_35px_rgba(0,0,0,0.3)] bg-[#1D1430] z-20 hidden md:block"
        >
          <img 
            src={IMAGES.moonCircle} 
            alt="Esoteric moon dynamic illustration" 
            className="w-full h-full object-cover block scale-[1.33]" 
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1.1fr] gap-12 items-center">
          
          {/* Left Column: Main Portrait Image Container */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
            className="w-full aspect-[4/6] overflow-hidden rounded-2xl border border-[#D9B56A]/20 shadow-[0_25px_50px_rgba(0,0,0,0.4)] bg-[#1D1430]"
          >
            <img 
              src={IMAGES.mainPortrait} 
              alt="Portrait of Saraa - Founder of Saraa Tarot" 
              className="w-full h-full object-cover block" 
            />
          </motion.div>

          {/* Middle Column: Typography & Inline Action Embed */}
          <motion.div 
            variants={fadeInUpVariants} 
            className="flex flex-col justify-center py-5"
          >
            <p className="font-['Poppins'] font-light text-[15px] leading-[1.8] text-[#B7AFC7] m-0 mb-6">
              Saraa's journey into the mystical realm of Tarot and spiritual healing began as a deeply personal calling to help others find alignment. Guided by decades of study and intuitive practice, she founded Saraa Tarot to bridge the gap between the material world and divine wisdom.
            </p>
            <p className="font-['Poppins'] font-light text-[15px] leading-[1.8] text-[#B7AFC7] m-0 mb-6">
              Through personalized consultations and spiritual classes, Saraa provides a compassionate, empowering space. Every reading and session is crafted to decode life's complexities and guide your spirit toward absolute clarity.
            </p>
            
            {/* Action Row containing the Button and Embedded Image */}
            <div className="flex items-center gap-11 mt-4 flex-wrap py-5">
              <button 
                onClick={() => navigate('/contact')}
                className="font-['Poppins'] text-[12px] font-medium tracking-[2px] uppercase bg-transparent border border-[#D9B56A] text-[#D9B56A] py-4 px-8 cursor-pointer rounded transition-all duration-300 hover:bg-[#D9B56A] hover:text-[#0A0713] hover:border-[#D9B56A]"
              >
                Connect With Me
              </button>
              
              {/* Miniature Embedded Action Image Area - Commented out per user request */}
            </div>
          </motion.div>

          {/* Right Column: Composite Image Cluster Area */}
          <motion.div 
            variants={fadeInUpVariants} 
            className="flex flex-col items-center gap-6"
          >
            {/* Sacred Arch Framed Image Box - Commented out per user request */}

            {/* Lower Asymmetric Structural Image Box (UPDATED CURVE DESIGN + INCREASED HEIGHT) 
                - Changed aspect ratio to aspect-[6/5] (taller than 4/3) and boosted min-h to 360px.
                - Reduced the border radius curve on the bottom right from 130px to 80px.
            */}
            <motion.div 
              style={{ y: cardSpreadY }}
              whileHover={{ scale: 1.02 }}
              className="w-[95%] mx-auto aspect-[6/5] min-h-[360px] overflow-hidden rounded-2xl rounded-br-[80px] border border-[#D9B56A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.35)] bg-[#1D1430]"
            >
              <img 
                src={IMAGES.cardSpread} 
                alt="Tarot cards dynamic ritual spread layout" 
                className="w-full h-full object-cover block" 
              />
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}