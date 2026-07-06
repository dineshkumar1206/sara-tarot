import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="min-h-screen bg-[#0f0c1b] text-[#f3f0ea] font-sans antialiased">
      <Navbar/>
      <main>
        <Home/>
      </main>

    </div>
  );
}

export default App;