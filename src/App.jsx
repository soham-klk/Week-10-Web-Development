import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';
import ApplicationModal from './components/ApplicationModal';

function App() {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Responsive Navbar */}
        <Navbar />

        {/* Main Content Area with Client-side Routes */}
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home onApplyJob={handleApplyJob} />} 
            />
            <Route 
              path="/jobs" 
              element={<Jobs onApplyJob={handleApplyJob} />} 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
          </Routes>
        </main>

        {/* Application Modal Popup */}
        {selectedJob && (
          <ApplicationModal 
            job={selectedJob} 
            onClose={handleCloseModal} 
          />
        )}

        {/* Global Responsive Footer with exact copyright */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
