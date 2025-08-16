const express = require('express');
const router = express.Router();
const Portfolio = require('../models/models/Portfolio');

// Default portfolio data
const defaultPortfolio = {
  name: 'Your Name',
  title: 'Web Developer',
  about: 'A passionate developer creating amazing web experiences.',
  email: 'your.email@example.com',
  social: {
    github: '',
    linkedin: '',
    twitter: ''
  },
  skills: [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'HTML/CSS', level: 90 }
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
  ],
  experience: [
    {
      company: 'Your Company',
      position: 'Web Developer',
      startDate: new Date('2020-01-01'),
      endDate: null,
      description: 'Brief description of your role and achievements.'
    }
  ]
};

// Get portfolio data
router.get('/', async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    // If no portfolio exists, return default data but don't save it
    if (!portfolio) {
      return res.json(defaultPortfolio);
    }
    
    res.json(portfolio);
  } catch (err) {
    next(err);
  }
});

// Update portfolio data
router.put('/', async (req, res, next) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' });
    }

    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      // Create new portfolio if none exists
      portfolio = new Portfolio(req.body);
    } else {
      // Update existing portfolio
      Object.keys(req.body).forEach(key => {
        if (key === 'skills' || key === 'projects' || key === 'experience') {
          // Replace arrays completely to avoid merging issues
          portfolio[key] = req.body[key];
        } else if (key === 'social' && req.body.social) {
          // Merge social object
          portfolio.social = { ...portfolio.social, ...req.body.social };
        } else if (key !== '_id' && key !== '__v') {
          // Update other fields
          portfolio[key] = req.body[key];
        }
      });
    }
    
    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: Object.values(err.errors).map(e => e.message) 
      });
    }
    next(err);
  }
});

module.exports = router;
