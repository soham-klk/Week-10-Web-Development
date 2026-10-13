/**
 * Database seeder — populates MongoDB with the Week 7 sample jobs
 * and a test admin/recruiter/candidate user.
 *
 * Run: node server/scripts/seedDB.js
 * Clear: node server/scripts/seedDB.js --clear
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env');
  process.exit(1);
}

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@dginternshub.com',
    password: 'Admin@1234',
    role: 'admin',
  },
  {
    name: 'Recruiter One',
    email: 'recruiter@dginternshub.com',
    password: 'Recruiter@1234',
    role: 'recruiter',
    company: 'TechPulse Solutions',
  },
  {
    name: 'Candidate User',
    email: 'candidate@dginternshub.com',
    password: 'Candidate@1234',
    role: 'candidate',
  },
];

const getSeedJobs = (recruiterId) => [
  {
    title: 'React JS Developer Intern',
    company: 'TechPulse Solutions',
    logo: '⚡',
    companyColor: '#2563EB',
    location: 'Remote',
    workType: 'Remote',
    duration: '3 Months',
    stipend: '₹20,000 / month',
    salaryAmount: 20000,
    category: 'Web Development',
    deadline: new Date('2026-10-25'),
    openings: 4,
    shortDescription: 'Build modern responsive web applications using React JS, Redux Toolkit, and Tailwind CSS.',
    fullDescription: 'We are seeking a passionate React JS Developer Intern to join our frontend engineering team. You will collaborate with senior developers to craft slick UI components, integrate RESTful APIs, and optimize web app performance.',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5/CSS3', 'REST API', 'Git'],
    responsibilities: [
      'Develop reusable React functional components and hooks',
      'Integrate frontend components with backend API services',
      'Optimize web components for maximum speed and cross-browser responsiveness',
      'Participate in daily agile standups and code review sessions',
    ],
    perks: ['Certificate of Completion', 'Letter of Recommendation', 'Pre-Placement Offer (PPO)', 'Flexible Work Hours'],
    recruiter: recruiterId,
  },
  {
    title: 'Web Development Intern',
    company: 'Nexus Digital Labs',
    logo: '🌐',
    companyColor: '#0EA5E9',
    location: 'Pune, India',
    workType: 'Hybrid',
    duration: '6 Months',
    stipend: '₹18,000 / month',
    salaryAmount: 18000,
    category: 'Web Development',
    deadline: new Date('2026-10-28'),
    openings: 5,
    shortDescription: 'Design, develop, and maintain high-performance web pages and portals for client projects.',
    fullDescription: 'Nexus Digital Labs is looking for a dynamic Web Development Intern. You will work across frontend and backend technologies to deliver cutting-edge web solutions for global enterprises.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Node.js'],
    responsibilities: [
      'Create mobile-first responsive landing pages and web interface layouts',
      'Debug cross-browser compatibility issues and enhance page load speed',
      'Assist senior engineers in building interactive web features',
      'Collaborate with UI/UX designers to translate wireframes into code',
    ],
    perks: ['Mentorship Program', 'Flexible Hours', 'Certificate of Internship', 'PPO Opportunity'],
    recruiter: recruiterId,
  },
  {
    title: 'Python Developer Intern',
    company: 'DataMind Innovations',
    logo: '🐍',
    companyColor: '#10B981',
    location: 'Bangalore, India',
    workType: 'On-site',
    duration: '3 Months',
    stipend: '₹22,000 / month',
    salaryAmount: 22000,
    category: 'Python',
    deadline: new Date('2026-11-02'),
    openings: 3,
    shortDescription: 'Develop robust backend APIs, data pipelines, and automation scripts using Python and Django.',
    fullDescription: 'Join DataMind Innovations as a Python Developer Intern. Work closely with our data engineering team to write clean Python scripts, build scalable REST APIs, and process data streams.',
    skills: ['Python 3', 'Django / FastAPI', 'PostgreSQL', 'Data Structures', 'Git'],
    responsibilities: [
      'Write clean, efficient, and well-tested Python code',
      'Build scalable REST APIs using Django REST Framework or FastAPI',
      'Work with relational databases and SQL queries',
      'Automate routine backend tasks and data processing scripts',
    ],
    perks: ['Industry Certification', 'Hands-on Mentorship', 'Free Snacks & Coffee', 'PPO Based on Performance'],
    recruiter: recruiterId,
  },
  {
    title: 'UI/UX Design Intern',
    company: 'Aura Creative Studio',
    logo: '🎨',
    companyColor: '#8B5CF6',
    location: 'Remote',
    workType: 'Remote',
    duration: '3 Months',
    stipend: '₹15,000 / month',
    salaryAmount: 15000,
    category: 'Design',
    deadline: new Date('2026-10-30'),
    openings: 2,
    shortDescription: 'Craft intuitive wireframes, interactive UI prototypes, and modern user experience journeys.',
    fullDescription: 'Aura Creative Studio is searching for a creative UI/UX Design Intern with an eye for detail. You will turn user research into visual designs, design tokens, and prototype animations.',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    responsibilities: [
      'Design high-fidelity mockups, wireframes, and clickable Figma prototypes',
      'Conduct user testing sessions to gather actionable feedback',
      'Maintain visual design consistency across desktop and mobile views',
      'Collaborate with developer teams to ensure seamless UI implementation',
    ],
    perks: ['Design Portfolio Showcase', 'Certificate of Merit', 'Flexible Schedule', 'PPO Opportunity'],
    recruiter: recruiterId,
  },
  {
    title: 'Java Developer Intern',
    company: 'Apex Enterprise Software',
    logo: '☕',
    companyColor: '#F59E0B',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    duration: '6 Months',
    stipend: '₹25,000 / month',
    salaryAmount: 25000,
    category: 'Java',
    deadline: new Date('2026-11-05'),
    openings: 4,
    shortDescription: 'Build microservices and enterprise backend modules using Java 17, Spring Boot, and SQL.',
    fullDescription: 'Apex Enterprise Software is looking for a Java Developer Intern who excels in object-oriented programming. You will build enterprise backend modules, write SQL queries, and implement Spring Boot services.',
    skills: ['Java 17', 'Spring Boot', 'MySQL', 'OOP Principles', 'REST Services'],
    responsibilities: [
      'Develop backend APIs using Spring Boot framework',
      'Write optimized SQL queries and database migrations',
      'Participate in unit testing and code refactoring',
      'Document system architecture and API endpoints',
    ],
    perks: ['Pre-Placement Offer (PPO)', 'Corporate Laptop', 'Mentorship', 'Completion Certificate'],
    recruiter: recruiterId,
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'CloudScale Technologies',
    logo: '🚀',
    companyColor: '#6366F1',
    location: 'Remote',
    workType: 'Remote',
    duration: '6 Months',
    stipend: '₹28,000 / month',
    salaryAmount: 28000,
    category: 'Fullstack',
    deadline: new Date('2026-11-10'),
    openings: 3,
    shortDescription: 'End-to-end full stack development combining React frontend with Node.js & MongoDB backend.',
    fullDescription: 'CloudScale Technologies offers an immersive Full Stack Development Internship. Work across the entire MERN stack to deliver end-to-end features for our SaaS product line.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    responsibilities: [
      'Build end-to-end full stack web features',
      'Design RESTful API routes and database schemas in MongoDB',
      'Ensure security, authentication, and state management consistency',
      'Participate in code reviews and deployment workflows',
    ],
    perks: ['High PPO conversion rate', 'Certificate & LOR', 'Remote stipends', 'SaaS product experience'],
    recruiter: recruiterId,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const clearMode = process.argv.includes('--clear');

    if (clearMode) {
      await Promise.all([
        User.deleteMany({}),
        Job.deleteMany({}),
        Application.deleteMany({}),
      ]);
      console.log('🗑️  All collections cleared.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Upsert seed users
    const createdUsers = {};
    for (const userData of seedUsers) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`ℹ️  User already exists: ${userData.email}`);
        createdUsers[userData.role] = existing;
      } else {
        const user = await User.create(userData);
        console.log(`✅ Created ${userData.role}: ${userData.email}`);
        createdUsers[userData.role] = user;
      }
    }

    // Seed jobs with recruiter ID
    const recruiterId = createdUsers.recruiter._id;
    const existingJobCount = await Job.countDocuments({ recruiter: recruiterId });

    if (existingJobCount === 0) {
      await Job.insertMany(getSeedJobs(recruiterId));
      console.log(`✅ Seeded 6 sample jobs.`);
    } else {
      console.log(`ℹ️  Jobs already seeded (${existingJobCount} found). Skipping.`);
    }

    console.log('\n📋 Seed credentials:');
    console.log('   Admin    : admin@dginternshub.com       / Admin@1234');
    console.log('   Recruiter: recruiter@dginternshub.com  / Recruiter@1234');
    console.log('   Candidate: candidate@dginternshub.com  / Candidate@1234');

    await mongoose.disconnect();
    console.log('\n✅ Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err.message);
    process.exit(1);
  }
};

seed();
