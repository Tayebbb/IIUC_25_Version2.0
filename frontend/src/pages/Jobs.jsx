/**
 * Jobs Page
 * Browse and filter job listings
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Clock } from 'lucide-react';
import { jobsService } from '../services/firestoreService';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsData = await jobsService.getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
        // Set some sample data if Firestore is empty
        setJobs([
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            type: 'Full-time',
            salary: '$60,000 - $80,000',
            description: 'Join our team as a Frontend Developer...'
          },
          {
            id: 2,
            title: 'UI/UX Designer',
            company: 'DesignStudio',
            location: 'New York',
            type: 'Contract',
            salary: '$50,000 - $70,000',
            description: 'We are looking for a creative UI/UX Designer...'
          }
        ]);
      }
      setLoading(false);
    };

    loadJobs();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await jobsService.searchJobs(searchTerm, filters);
      setJobs(results);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600">Discover opportunities that match your skills and interests</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Briefcase size={16} className="mr-1" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-sm text-green-600">
                        <Clock size={16} className="mr-1" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description || 'Job description not available.'}
                  </p>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No jobs found. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Jobs;
