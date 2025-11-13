/**
 * Register Page
 * New user registration with profile setup
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, GraduationCap, Briefcase, Target, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: 'Undergraduate',
    experienceLevel: 'Student',
    careerTrack: 'Web Development',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signup, logout } = useAuth();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password.length < 6) {
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      // Redirect to dashboard instead of home
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const educationOptions = ['High School', 'Undergraduate', 'Graduate', 'Postgraduate', 'Other'];
  const experienceLevels = ['Student', 'Fresher', 'Junior', 'Mid-level', 'Senior'];
  const careerTracks = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'UI/UX Design',
    'Digital Marketing',
    'Content Writing',
    'Graphic Design',
    'Business',
    'Other',
  ];

  // If user is already logged in, show logout option
  if (currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Already Logged In</h2>
            <p className="text-gray-600 mb-6">
              You are already logged in as {currentUser.displayName || currentUser.email}
            </p>
            <div className="space-y-4">
              <Link to="/dashboard" className="w-full btn-primary block">
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg-muted dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold mb-2">Start Your Journey</h2>
          <p className="text-text-muted">Create your CareerPath account and discover opportunities</p>
        </div>

        {/* Registration Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="John Doe"
                    aria-label="Full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password * (min. 6 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-11"
                  placeholder="••••••••"
                  aria-label="Password"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Education */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium mb-2">
                  <GraduationCap className="inline mr-1" size={16} />
                  Education
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Education level"
                >
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium mb-2">
                  <Briefcase className="inline mr-1" size={16} />
                  Experience
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Experience level"
                >
                  {experienceLevels.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Career Track */}
              <div>
                <label htmlFor="careerTrack" className="block text-sm font-medium mb-2">
                  <Target className="inline mr-1" size={16} />
                  Career Track
                </label>
                <select
                  id="careerTrack"
                  name="careerTrack"
                  value={formData.careerTrack}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Career track"
                >
                  {careerTracks.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
