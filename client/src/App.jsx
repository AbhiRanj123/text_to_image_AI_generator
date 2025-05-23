import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Footer from './components/Footer';
import { assets } from './assets/assets';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AppContext } from './contexts/AppContext';


const App = () => {
  const [showArrow, setShowArrow] = useState(false);
  const { showLoginModal } = useContext(AppContext);

  const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling effect
      });
    };
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowArrow(true); // Show arrow when scrolled down
        } else {
          setShowArrow(false); // Hide arrow when at the top
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // const {isSignedUp} = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar/>
      {/* {isSignedUp ? <Login/> : <SignUp/>} */}
      {showLoginModal && <SignUp/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy-credit" element={<BuyCredit />} />
      </Routes>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-gray-400 shadow-lg text-white p-5 rounded-full shadow-lg hover:bg-gray-300 transition-all"
        aria-label="Scroll to top"
      >
        <img src={assets.upArrow} alt="" width={15}/>
      </button>
      <Footer/>
    </div>
  )
}

export default App
