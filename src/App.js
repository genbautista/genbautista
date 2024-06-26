import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import Calendar from './Calender'; 
import './App.css';
import ProgressTracker from './components/progresstracker'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePageWithCalendar />} />
          {}
          <Route path="/progress" element={<ProgressTracker />} />
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
