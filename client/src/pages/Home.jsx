import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

const Home = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Set default data if API fails
        setPortfolio({
          name: 'Your Name',
          title: 'Web Developer',
          about: 'A passionate developer creating amazing web experiences.',
          email: 'your.email@example.com',
          social: {
            github: '#',
            linkedin: '#',
            twitter: '#'
          },
          skills: [
            { name: 'React', level: 90 },
            { name: 'Node.js', level: 85 },
            { name: 'JavaScript', level: 95 },
            { name: 'CSS/Tailwind', level: 90 },
            { name: 'MongoDB', level: 80 },
            { name: 'Git', level: 85 }
          ],
          projects: [
            {
              title: 'Project 1',
              description: 'A brief description of project 1',
              technologies: ['React', 'Node.js', 'MongoDB'],
              demoUrl: '#',
              githubUrl: '#'
            },
            {
              title: 'Project 2',
              description: 'A brief description of project 2',
              technologies: ['React', 'Express', 'PostgreSQL'],
              demoUrl: '#',
              githubUrl: '#'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span className="text-primary">{portfolio?.name || 'Your Name'}</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {portfolio?.title || 'Web Developer'}
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href={portfolio?.social?.github || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a 
              href={portfolio?.social?.linkedin || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a 
              href={portfolio?.social?.twitter ? `https://twitter.com/${portfolio.social.twitter}` : '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
            
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <a 
              href="#projects"
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              View My Work
              <FiArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-dark">About Me</h2>
            <p className="text-lg text-gray-600 mb-12">
              {portfolio?.about || 'A passionate developer creating amazing web experiences.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-40 text-left">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-dark">My Skills</h3>
                <div className="space-y-4">
                  {portfolio?.skills?.map((skill, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-primary h-2.5 rounded-full" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-dark">Experience</h3>
                <div className="space-y-6">
                  {portfolio?.experience?.length > 0 ? (
                    portfolio.experience.map((exp, index) => (
                      <div key={index} className="relative pl-8 border-l-2 border-primary/20">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-1"></div>
                        <h4 className="text-lg font-medium text-dark">{exp.position}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                        </p>
                        <p className="text-gray-600">{exp.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="relative pl-8 border-l-2 border-primary/20">
                      <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-1"></div>
                      <h4 className="text-lg font-medium text-dark">Web Developer</h4>
                      <p className="text-primary font-medium">Your Company</p>
                      <p className="text-sm text-gray-500 mb-2">2020 - Present</p>
                      <p className="text-gray-600">Brief description of your role and achievements.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-dark">My Projects</h2>
            <p className="text-xl text-gray-600">Some of my recent work</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio?.projects?.map((project, index) => (
              <motion.div 
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Gradient accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                <div className="p-6 flex-1 flex flex-col">
                  {/* Card header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 pr-2">
                      {project.title}
                    </h3>
                    
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium 
                                      border border-gray-100 group-hover:border-blue-100 transition-colors"
                          >
                            {tech.length > 12 ? `${tech.substring(0, 10)}...` : tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-full text-xs font-medium">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action button */}
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-dark">Get In Touch</h2>
            <p className="text-xl text-gray-600 mb-12">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-left max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href={portfolio?.social?.github || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a 
              href={portfolio?.social?.linkedin || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a 
              href={portfolio?.social?.twitter ? `https://twitter.com/${portfolio.social.twitter}` : '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
            
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {portfolio?.name || 'Your Name'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
