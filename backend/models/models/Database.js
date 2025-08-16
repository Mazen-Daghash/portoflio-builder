const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }]
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, default: '' }
});


const portfolioSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true
  },
  about: { 
    type: String, 
    required: [true, 'About section is required'],
    trim: true
  },
  
  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  skills: [{
    name: { 
      type: String, 
      required: [true, 'Skill name is required'],
      trim: true
    },
    level: { 
      type: Number, 
      required: [true, 'Skill level is required'],
      min: [0, 'Skill level must be at least 0'],
      max: [100, 'Skill level cannot exceed 100']
    }
  }],
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add a text index for search functionality
portfolioSchema.index({ 
  name: 'text', 
  title: 'text', 
  about: 'text',
  'projects.title': 'text',
  'projects.description': 'text',
  'experience.company': 'text',
  'experience.position': 'text',
  'experience.description': 'text',
  'education.institution': 'text',
  'education.degree': 'text',
  'education.field': 'text'
});

// Virtual for full name
portfolioSchema.virtual('fullTitle').get(function() {
  return `${this.name} - ${this.title}`;
});

// Pre-save hook to ensure social media URLs are properly formatted
portfolioSchema.pre('save', function(next) {
  // Format social media URLs
  if (this.social) {
    if (this.social.github && !this.social.github.startsWith('http')) {
      this.social.github = `https://github.com/${this.social.github}`;
    }
    if (this.social.linkedin && !this.social.linkedin.startsWith('http')) {
      this.social.linkedin = `https://linkedin.com/in/${this.social.linkedin}`;
    }
    if (this.social.twitter && !this.social.twitter.startsWith('http')) {
      this.social.twitter = `https://twitter.com/${this.social.twitter.replace('@', '')}`;
    }
  }
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
