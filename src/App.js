import React from 'react';
import HomePage from './components/homepage';
import Calendar from './Calender';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
     <div>
       <Calendar />
     </div>
     <footer>
       <p>Made in 2024 by Genesis Bautista</p>
     </footer>

    </div>
  );
}

export default App;
