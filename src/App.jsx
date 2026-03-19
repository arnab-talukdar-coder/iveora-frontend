import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import BubbleSplash from './components/BubbleSplash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="app-container">
      <AnimatePresence>
        {showSplash && <BubbleSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        {/* <Portfolio /> */}
        <TechStack />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
