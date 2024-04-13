import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import Calendar from './Calender'; 
import './App.css';
import { ProgressBar } from './components/progresstracker';

function App() {
  const [progress, setProgress] = useState(0);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  console.log('Current progress:', progress);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePageWithCalendar />} />
          <Route path="/progress" element={<ProgressBar updateProgress={updateProgress} />} />
        </Routes>
      </Router>
      <footer>
        <p>Made in 2024 by Genesis Bautista</p>
      </footer>
    </div>
  );
}

function HomePageWithCalendar() {
  return (
    <div>
      <HomePage />
      <Calendar />
    </div>
  );
}

export default App;
