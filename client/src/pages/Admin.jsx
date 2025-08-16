import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tab } from '@headlessui/react';
import { FiHome, FiSave, FiPlus, FiX, FiTrash2, FiChevronUp, FiChevronDown, FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

// Helper function to combine class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Admin = () => {
  const [portfolio, setPortfolio] = useState({
    name: 'Your Name',
    title: 'Web Developer',
    about: 'A passionate developer creating amazing web experiences.',
    social: { 
      github: '', 
      linkedin: '', 
      twitter: '' 
    },
    skills: [
      { name: 'React', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'Node.js', level: 80 },
      { name: 'CSS/Tailwind', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Git', level: 80 }
    ],
    projects: [
      {
        title: 'Project 1',
        description: 'A brief description of project 1',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        title: 'Project 2',
        description: 'A brief description of project 2',
        technologies: ['React', 'Express', 'PostgreSQL']
      }
    ],
    experience: [
      {
        company: 'Your Company',
        position: 'Web Developer',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        description: 'Brief description of your role and achievements.'
      }
    ]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('basic');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setPortfolio(prev => ({
          ...prev,
          ...response.data,
          skills: response.data.skills || [],
          projects: response.data.projects || [],
          experience: response.data.experience || [],
          education: response.data.education || []
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setMessage({ text: 'Failed to load portfolio data', type: 'error' });
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPortfolio(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setPortfolio(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...portfolio[section]];
    updatedSection[index] = {
      ...updatedSection[index],
      [field]: field === 'level' ? parseInt(value) || 0 : value
    };
    setPortfolio(prev => ({
      ...prev,
      [section]: updatedSection
    }));
  };

  const addItem = (section, newItem) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const moveItem = (section, fromIndex, direction) => {
    const newItems = [...portfolio[section]];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    if (toIndex >= 0 && toIndex < newItems.length) {
      [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
      setPortfolio(prev => ({
        ...prev,
        [section]: newItems
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      await axios.put('http://localhost:5000/api/portfolio', portfolio);
      setMessage({ text: 'Portfolio updated successfully!', type: 'success' });
      
      // Scroll to top after successful save
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating portfolio:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to update portfolio', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render tab panels
  const renderTabPanel = (tab) => {
    switch(tab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={portfolio.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={portfolio.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                About Me
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={portfolio.about}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Social Media</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="social.github" className="block text-sm font-medium text-gray-700">
                  GitHub Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    github.com/
                  </span>
                  <input
                    type="text"
                    name="social.github"
                    value={portfolio.social?.github?.replace('https://github.com/', '') || ''}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="social.linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    linkedin.com/in/
                  </span>
                  <input
                    type="text"
                    name="social.linkedin"
                    value={portfolio.social?.linkedin?.replace('https://linkedin.com/in/', '') || ''}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700">
                  Twitter Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitter.com/
                  </span>
                  <input
                    type="text"
                    name="social.twitter"
                    value={portfolio.social?.twitter || ''}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Skills</h2>
              <button
                type="button"
                onClick={() => addItem('skills', { name: '', level: 50 })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="mr-1 h-4 w-4" /> Add Skill
              </button>
            </div>
            
            <div className="space-y-4">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg relative group">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., React, Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Level: {skill.level}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleArrayChange('skills', index, 'level', parseInt(e.target.value))}
                        className="mt-2 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Projects</h2>
              <button
                type="button"
                onClick={() => addItem('projects', { 
                  title: '', 
                  description: '', 
                  technologies: []
                })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="mr-1 h-4 w-4" /> Add Project
              </button>
            </div>
            
            <div className="space-y-4">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg relative group">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Project name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        rows="3"
                        value={project.description}
                        onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Project description"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={project.technologies ? project.technologies.join(', ') : ''}
                        onChange={(e) => {
                          const techs = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                          handleArrayChange('projects', index, 'technologies', techs);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    
                  </div>
                  
                  <div className="flex space-x-2 absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => moveItem('projects', index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-blue-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem('projects', index, 'down')}
                      disabled={index === portfolio.projects.length - 1}
                      className="p-1 text-gray-400 hover:text-blue-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem('projects', index)}
                      className="p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                      title="Remove"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Work Experience</h2>
              <button
                type="button"
                onClick={() => addItem('experience', { 
                  company: '',
                  position: '',
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: '',
                  description: ''
                })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="mr-1 h-4 w-4" /> Add Experience
              </button>
            </div>
            
            <div className="space-y-4">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg relative group">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Job title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="date"
                          value={exp.startDate ? exp.startDate.split('T')[0] : ''}
                          onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date (leave empty if current)</label>
                        <input
                          type="date"
                          value={exp.endDate ? exp.endDate.split('T')[0] : ''}
                          onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        rows="3"
                        value={exp.description}
                        onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Describe your role and achievements"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => moveItem('experience', index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-blue-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem('experience', index, 'down')}
                      disabled={index === portfolio.experience.length - 1}
                      className="p-1 text-gray-400 hover:text-blue-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem('experience', index)}
                      className="p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                      title="Remove"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Edit your portfolio content here
          </p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1 mb-6 border border-blue-200">
            {['Basic', 'Social', 'Skills', 'Projects', 'Experience'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                   ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                   ${selected
                      ? 'bg-white text-blue-600 shadow-md font-semibold'
                      : 'text-blue-500 hover:bg-blue-50 hover:text-blue-700'
                    }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels className="mt-2">
            {['basic', 'social', 'skills', 'projects', 'experience'].map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className={`rounded-xl bg-white p-6 ring-1 ring-inset ring-blue-100 shadow-sm`}
              >
                <form onSubmit={handleSubmit}>
                  {renderTabPanel(tab)}
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSave className="-ml-1 mr-2 h-5 w-5" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiHome className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
