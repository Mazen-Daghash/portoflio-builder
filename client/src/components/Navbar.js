import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiMail, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Projects', path: '#projects', icon: <FiBriefcase className="w-5 h-5" /> },
    { name: 'About', path: '#about', icon: <FiUser className="w-5 h-5" /> },
    { name: 'Contact', path: '#contact', icon: <FiMail className="w-5 h-5" /> },
  ];

  const isAdmin = location.pathname === '/admin';

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary font-medium'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to={isAdmin ? '/' : '/admin'}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FiSettings className="w-5 h-5" />
              <span>{isAdmin ? 'View Portfolio' : 'Admin'}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
