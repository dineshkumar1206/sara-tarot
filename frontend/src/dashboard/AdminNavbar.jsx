import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Globe, LogOut, Menu, X, ChevronDown } from 'lucide-react';

const CRYSTAL_CATEGORIES = ['Rashi', 'Dhanyog', 'Bracelet', 'Karungali', 'Rudraksh', 'Yantra', 'Pyrite'];
const SERVICE_CATEGORIES_LEFT = [
  'Tarot Private Consultation',
  'Spiritual Healing'
];
const SERVICE_CATEGORIES_RIGHT = [
  'Murugar Cards',
  'Tarot Card Reading',
  'Spiritual Counseling',
  'Kali Pooja'
];

export default function AdminNavbar({ 
  user = {}, 
  activeCategory, 
  setActiveCategory, 
  handleSignOut 
}) {
  const [isCrystalsOpen, setIsCrystalsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when category changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeCategory]);

  return (
    <header className="bg-[#130f24]/95 backdrop-blur-md border-b border-[#D9B56A]/20 w-full z-50 sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-[76px] flex justify-between items-center gap-4">
        
        {/* 1. BRANDING (Left) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-gradient-to-br from-[#D9B56A]/20 to-[#D9B56A]/5 border border-[#D9B56A]/40 shadow-[0_0_10px_rgba(217,181,106,0.1)] rounded-xl p-2.5 text-[#D9B56A]">
            <LayoutDashboard size={20} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[14px] font-bold text-white tracking-[0.15em] uppercase font-['Cinzel',sans-serif] leading-tight">
              Saraa Tarot
            </h1>
            <p className="text-[9px] text-[#D9B56A] font-bold uppercase tracking-widest mt-0.5">
              Control Desk
            </p>
          </div>
        </div>

        {/* 2. DESKTOP NAVIGATION (Center) */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-1.5 px-4 font-sans text-[12px]">
          {SERVICE_CATEGORIES_LEFT.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Crystals Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCrystalsOpen(true)}
            onMouseLeave={() => setIsCrystalsOpen(false)}
          >
            <button
              onClick={() => {
                if (!CRYSTAL_CATEGORIES.includes(activeCategory)) {
                  setActiveCategory('Rashi');
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                CRYSTAL_CATEGORIES.includes(activeCategory)
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              <span>Crystals</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCrystalsOpen ? 'rotate-180 text-[#D9B56A]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isCrystalsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-40">
                <div className="bg-[#130f24] border border-[#D9B56A]/25 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 w-48 flex flex-col backdrop-blur-xl">
                  {CRYSTAL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsCrystalsOpen(false);
                      }}
                      className={`px-5 py-2.5 text-left text-[12px] font-semibold transition-colors cursor-pointer ${
                        activeCategory === cat 
                        ? 'bg-[#D9B56A]/10 text-[#D9B56A] border-l-2 border-[#D9B56A]' 
                        : 'text-[#B7AFC7] border-l-2 border-transparent hover:bg-[#1c1635] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {SERVICE_CATEGORIES_RIGHT.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* 3. ACTIONS & USER INFO (Right) */}
        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <a
            href="/"
            className="flex items-center gap-1.5 text-[#B7AFC7] hover:text-[#D9B56A] px-2 py-2 text-[12px] font-semibold transition-colors duration-200"
          >
            <Globe size={14} />
            <span>Back to Site</span>
          </a>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-[#D9B56A]/15 rounded-full" />

          <div className="flex flex-col text-right justify-center">
            <span className="text-[12px] font-semibold text-white truncate max-w-[160px] leading-tight">
              {user?.email || 'Admin User'}
            </span>
            <span className="text-[9px] text-[#D9B56A] uppercase font-bold tracking-widest mt-0.5">
              Administrator
            </span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* 4. MOBILE MENU TOGGLE (Shows on Tablet/Mobile) */}
        <div className="xl:hidden flex items-center gap-4 shrink-0">
          <div className="flex flex-col text-right md:hidden">
            <span className="text-[10px] text-[#D9B56A] uppercase font-bold tracking-widest mt-0.5">
              Admin
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-[#D9B56A]/10 border border-[#D9B56A]/30 text-[#D9B56A] rounded-lg cursor-pointer hover:bg-[#D9B56A]/20 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* 5. MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#130f24] border-b border-[#D9B56A]/20 shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2 font-sans">
            
            <div className="text-[10px] text-[#B7AFC7] font-bold uppercase tracking-widest px-3 mb-1 mt-2">
              Categories
            </div>
            
            {SERVICE_CATEGORIES_LEFT.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 rounded-lg text-[13px] font-semibold text-left transition-colors ${
                  activeCategory === cat 
                  ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                  : 'text-[#B7AFC7] hover:bg-[#1c1635]'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="bg-[#1c1635]/40 rounded-lg p-2 my-1 border border-[#D9B56A]/10">
              <div className="text-[11px] text-[#D9B56A] font-bold uppercase tracking-widest px-2 mb-2 mt-1">
                Crystals
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CRYSTAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-2 rounded-md text-[12px] font-semibold text-left transition-colors ${
                      activeCategory === cat 
                      ? 'bg-[#D9B56A]/20 text-[#D9B56A]' 
                      : 'text-[#B7AFC7] hover:bg-[#130f24]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {SERVICE_CATEGORIES_RIGHT.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 rounded-lg text-[13px] font-semibold text-left transition-colors ${
                  activeCategory === cat 
                  ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                  : 'text-[#B7AFC7] hover:bg-[#1c1635]'
                }`}
              >
                {cat}
              </button>
            ))}

            <hr className="border-[#D9B56A]/10 my-3" />

            <a
              href="/"
              className="flex items-center gap-2 text-[#B7AFC7] hover:text-white px-4 py-3 rounded-lg text-[13px] font-semibold transition-colors"
            >
              <Globe size={16} />
              <span>Return to Main Website</span>
            </a>

            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-[13px] font-semibold mt-2"
            >
              <LogOut size={16} />
              <span>Sign Out ({user?.email || 'Admin'})</span>
            </button>
            
          </div>
        </div>
      )}
    </header>
  );
}