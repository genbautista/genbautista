import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import Calendar from './Calender'; 
import './App.css';
import { ProgressBar } from './components/progresstracker';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Update the path to your firebase config file

function App() {
  const [monthlySpending, setMonthlySpending] = useState(0); // Track monthly spending
  const [budget, setBudget] = useState(0); // Track budget

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'monthlySpending'));
      querySnapshot.forEach((doc) => {
        // Update monthly spending state
        setMonthlySpending(doc.data().amount);
      });

      const budgetSnapshot = await getDocs(collection(firestore, 'budget'));
      budgetSnapshot.forEach((doc) => {
        // Update budget state
        setBudget(doc.data().amount);
      });
    };

    fetchData();
  }, []);

  const updateProgress = (newMonthlySpending, newBudget) => {
    setMonthlySpending(newMonthlySpending); // Update monthly spending
    setBudget(newBudget); // Update budget
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePageWithCalendar />} />
          <Route path="/progress" element={<ProgressBar monthlySpending={monthlySpending} budget={budget} updateProgress={updateProgress} />} />
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
