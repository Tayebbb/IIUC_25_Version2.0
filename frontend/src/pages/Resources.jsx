/**
 * Resources Page
 * Browse learning resources and courses
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, BookOpen, Filter as FilterIcon, Video, FileText, Link as LinkIcon } from 'lucide-react';
import { resourcesService } from '../services/firestoreService';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Articles', 'Videos', 'Courses', 'Tools', 'Templates', 'Guides'];

  useEffect(() => {
    const loadResources = async () => {
      try {
        const resourcesData = await resourcesService.getAllResources();
        setResources(resourcesData);
      } catch (error) {
        console.error('Error loading resources:', error);
        // Set some sample data if Firestore is empty
        setResources([
          {
            id: 1,
            title: 'Resume Writing Guide',
            description: 'Complete guide to writing a professional resume that gets noticed by employers.',
            category: 'Guides',
            type: 'article',
            url: '#',
            tags: ['resume', 'career', 'job search']
          },
          {
            id: 2,
            title: 'Interview Preparation Checklist',
            description: 'Essential checklist to prepare for your next job interview.',
            category: 'Templates',
            type: 'template',
            url: '#',
            tags: ['interview', 'preparation', 'career']
          },
          {
            id: 3,
            title: 'JavaScript Fundamentals Course',
            description: 'Learn JavaScript from basics to advanced concepts with hands-on projects.',
            category: 'Courses',
            type: 'course',
            url: '#',
            tags: ['javascript', 'programming', 'web development']
          },
          {
            id: 4,
            title: 'LinkedIn Profile Optimization',
            description: 'Video tutorial on how to optimize your LinkedIn profile for maximum visibility.',
            category: 'Videos',
            type: 'video',
            url: '#',
            tags: ['linkedin', 'networking', 'profile']
          }
        ]);
      }
      setLoading(false);
    };

    loadResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video size={20} className="text-red-500" />;
      case 'course':
        return <BookOpen size={20} className="text-blue-500" />;
      case 'template':
        return <FileText size={20} className="text-green-500" />;
      default:
        return <LinkIcon size={20} className="text-gray-500" />;
    }
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
          <h1 className="text-4xl font-bold mb-4">Career Resources</h1>
          <p className="text-lg text-gray-600">Helpful resources to boost your career and skills</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {resource.category}
                      </span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {resource.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Access Resource
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No resources found. Try adjusting your search or filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Resources;
