import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

// Background image for the Hero Section
const heroBg = "https://images.unsplash.com/photo-1632386221545-c1fc23ffcefb?auto=format&fit=crop&w=1920&q=80";

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

export default function Contact() {
  const accordionItems = [
    "Personal Consultations",
    "Event Bookings",
    "Media Inquiries"
  ];

  return (
    <>
      {/* Required for the fonts to load if not already in your index.html */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      {/* 1. Hero Banner Area */}
      <section className="relative w-full h-[450px] flex items-center justify-center">
        {/* Background Image & Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        <div className="absolute inset-0 bg-[#0A0713]/75 z-10"></div>
        
        {/* HERO TEXT STAGGER CONTAINER */}
        <motion.div 
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1 
            variants={fadeInUpVariants}
            className="font-serif text-[clamp(54px,8vw,84px)] text-[#F4F0EA] m-0 mb-2 font-normal"
          >
            Contact
          </motion.h1>
          <motion.p 
            variants={fadeInUpVariants}
            className="font-sans text-[14px] text-[#D9B56A] uppercase tracking-[2px] m-0"
          >
            Saraa Tarot | Cosmic Guidance
          </motion.p>
        </motion.div>

        {/* Curved SVG Divider separating Hero from Content */}
        <div className="absolute bottom-[-1px] left-0 w-full z-30 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" fill="#120B1F" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[80px] block">
            <path d="M0,100 Q720,0 1440,100 V110 H0 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Main Split Content Area */}
      <section className="bg-[#120B1F] relative">
        {/* MAIN CONTENT STAGGER CONTAINER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row flex-wrap gap-16 px-6 md:px-12 py-24 box-border"
        >
          
          {/* Left Column: Text, Accordion, Button, Stats */}
          <div className="flex-1 w-full lg:min-w-[500px] lg:max-w-[600px] z-10">
            
            <motion.p variants={fadeInUpVariants} className="m-0 mb-4 font-serif italic text-[18px] text-[#D9B56A]">
              Get in Touch with Cosmic Insights
            </motion.p>
            
            <motion.h2 variants={fadeInUpVariants} className="m-0 mb-10 font-serif text-[clamp(36px,4.5vw,48px)] font-normal leading-[1.2] text-[#F4F0EA]">
              Reach Out for Personalized Guidance Today
            </motion.h2>

            {/* Accordion / Services List */}
            <motion.div variants={fadeInUpVariants} className="mb-10">
              {accordionItems.map((item, index) => (
                <div key={index} className="flex items-center py-5 border-b border-[#D9B56A]/20 font-sans text-[15px] text-[#F4F0EA] cursor-pointer transition-colors duration-300 hover:text-[#D9B56A]">
                  <span className="mr-4 text-[#D9B56A] text-[12px]">▼</span>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* Contact Information Details */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-[#F4F0EA] font-sans">
              <div>
                <h4 className="text-[#D9B56A] text-[15px] font-semibold uppercase tracking-[1.5px] mb-3">Office Address</h4>
                <p className="text-[#B7AFC7] text-[14px] leading-relaxed m-0 font-light">
                  SARA HEALING CENTRE<br />
                  Shri sathya nagar, Othivakkam,<br />
                  Guduvanchery, Chengalpattu
                </p>
              </div>
              <div>
                <h4 className="text-[#D9B56A] text-[15px] font-semibold uppercase tracking-[1.5px] mb-3">Get in Touch</h4>
                <p className="text-[#B7AFC7] text-[14px] leading-relaxed m-0 font-light">
                  <span className="font-semibold text-[#D9B56A]">Phone:</span> +91 96551 99507<br />
                  <span className="font-semibold text-[#D9B56A]">Email:</span> tamiltarotmagic@gmail.com
                </p>
              </div>
            </motion.div>

            <motion.button variants={fadeInUpVariants} className="bg-transparent text-[#D9B56A] border border-[#D9B56A] px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[1.5px] cursor-pointer transition-all duration-300 inline-block hover:bg-[#D9B56A] hover:text-[#120B1F]">
              Ask for a Quote
            </motion.button>

            {/* Stat Boxes */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-6 mt-14">
              <div className="bg-[#0A0713] border border-[#D9B56A]/15 p-8 text-center flex-1 transition-transform duration-300 hover:-translate-y-1">
                <div className="font-serif text-[48px] text-[#F4F0EA] leading-none">96</div>
                <div className="font-sans text-[10px] uppercase tracking-[1px] text-[#B7AFC7] mt-3">Tarot Reading Special</div>
              </div>
              <div className="bg-[#0A0713] border border-[#D9B56A]/15 p-8 text-center flex-1 transition-transform duration-300 hover:-translate-y-1">
                <div className="font-serif text-[48px] text-[#F4F0EA] leading-none">87</div>
                <div className="font-sans text-[10px] uppercase tracking-[1px] text-[#B7AFC7] mt-3">Astrology Consultation</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Embedded Map */}
          <motion.div 
            variants={fadeInUpVariants}
            className="flex-1 w-full lg:min-w-[500px] min-h-[400px] md:min-h-[450px] relative z-10"
          >
            <div className="w-full h-full min-h-[400px] md:min-h-[450px] bg-[#0A0713] border border-[#D9B56A]/20 grayscale-[80%] invert-[90%] hue-rotate-180 contrast-85">
              {/* Google Maps iFrame for Guduvanchery */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.871032155608!2d80.05739097585098!3d12.825740487476839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f70d6eb8bcbb%3A0x7d6c6e7a2b9a7102!2sGuduvanchery%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1708450123456!5m2!1sen!2sin" 
                className="w-full h-full border-0" 
                allowFullScreen="" 
                loading="lazy"
                title="Guduvanchery Map"
              ></iframe>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. Render the Form Component below the main content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
      >
        <ContactForm />
      </motion.div>
      
    </>
  );
}