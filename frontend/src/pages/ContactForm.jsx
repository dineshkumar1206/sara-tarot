import React from 'react';

export default function ContactForm() {
  return (
    <section className="bg-[#0A0713] py-24 w-full box-border px-4">
      
      <div className="max-w-3xl mx-auto p-8 md:p-12 bg-[#120B1F] border border-[#D9B56A]/15 shadow-2xl rounded-sm">
        <div className="text-center mb-12">
          <h3 className="m-0 mb-2 font-serif text-3xl text-[#F4F0EA] font-normal">
            Send a Message
          </h3>
          <p className="m-0 font-sans text-[#B7AFC7] text-sm font-light">
            Fill out the form below and we will get back to you shortly.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="flex-1">
              <div className="relative mb-10">
                <input 
                  type="text" 
                  className="w-full bg-transparent border-0 border-b border-[#B7AFC7]/30 text-[#F4F0EA] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-[#D9B56A] placeholder:text-[#B7AFC7] placeholder:font-light" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mb-10">
                <input 
                  type="email" 
                  className="w-full bg-transparent border-0 border-b border-[#B7AFC7]/30 text-[#F4F0EA] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-[#D9B56A] placeholder:text-[#B7AFC7] placeholder:font-light" 
                  placeholder="Your Email" 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="relative mb-10">
            <input 
              type="text" 
              className="w-full bg-transparent border-0 border-b border-[#B7AFC7]/30 text-[#F4F0EA] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-[#D9B56A] placeholder:text-[#B7AFC7] placeholder:font-light" 
              placeholder="Subject / Service Requested" 
              required 
            />
          </div>

          <div className="relative mb-10">
            <textarea 
              className="w-full bg-transparent border-0 border-b border-[#B7AFC7]/30 text-[#F4F0EA] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-[#D9B56A] placeholder:text-[#B7AFC7] placeholder:font-light resize-none" 
              placeholder="Your Message" 
              rows="4" 
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-[#D9B56A] text-[#0A0713] py-4 md:py-5 font-sans text-[13px] font-semibold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:bg-[#F4F0EA] hover:-translate-y-1"
          >
            Send Message
          </button>
        </form>
      </div>
      
    </section>
  );
}