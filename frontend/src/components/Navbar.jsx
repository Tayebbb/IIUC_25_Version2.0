/**
 * Navbar Component
 * Responsive navigation with mobile menu and dark mode toggle
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { name: 'Jobs', href: '/jobs' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const userNavLinks = [
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const navVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const linkVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                CareerPath
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {(currentUser ? navLinks : publicNavLinks).map((link, index) => (
              <motion.div key={link.name} whileHover={{ y: -2 }}>
                <Link
                  to={link.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                    location.pathname === link.href
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 transition-all duration-200 ${
                      location.pathname === link.href
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-200 ${
                      location.pathname === link.href
                        ? 'w-3/4 -translate-x-1/2'
                        : 'w-0 -translate-x-1/2 group-hover:w-1/2'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}

            {currentUser && userNavLinks.map((link, index) => (
              <motion.div key={link.name} whileHover={{ y: -2 }}>
                <Link
                  to={link.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                    location.pathname === link.href
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 transition-all duration-200 ${
                      location.pathname === link.href
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:border-emerald-200 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-700 text-sm">
                      {currentUser.displayName?.split(' ')[0] || 'User'}
                    </p>
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                            <User size={20} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {currentUser.displayName || 'User Name'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* Logout Option */}
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-150 group"
                        >
                          <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors duration-150">
                            <LogOut size={16} className="text-gray-600 group-hover:text-red-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium">Logout</p>
                            <p className="text-xs text-gray-500 group-hover:text-red-600">
                              Sign out of your account
                            </p>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Click outside to close */}
                {showUserMenu && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="relative px-6 py-2.5 font-medium text-white rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-emerald-200"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {[...(currentUser ? navLinks : publicNavLinks), ...(currentUser ? userNavLinks : [])].map((link, index) => (
                  <motion.div
                    key={link.name}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    custom={index}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        location.pathname === link.href
                          ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-l-4 border-emerald-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-gray-100">
                  {currentUser ? (
                    <motion.button
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      custom={navLinks.length + userNavLinks.length}
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </motion.button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-center font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-lg transition-colors shadow-lg"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
