import React, { useState } from "react";
import './homepage.css';
import bannerImage from './banner.jpeg';
import ShoppingHabitsForm from './ShoppingHabitsForm.js';


const HomePage = () => {
   const [showForm, setShowForm] = useState(false);


   const handleGoalSettingClick = () => {
       setShowForm(true);
   }


   return (
       <div>
           <img src={bannerImage} alt="banner" width="1425" height="200" />
           <header>
               <h1>Shopping Habit Tracker</h1>
           </header>
           <nav className="navigation">
               <div className="flower">
               </div>
               <div className="tracker-menu">
                   <span className="line"></span>
                   <span className="line"></span>
                   <span className="line"></span>
                   <span className="line"></span>
                   <span className="line"></span>
               </div>
               <div className="nav-menu hide">
                   <a href="#" className="button">Home</a>
                   <a href="#" className="button">Progress Tracker</a>
                   <button onClick={handleGoalSettingClick} className="button">Goal Setting</button> {/* Use a button element and handle its click event */}
                   <a href="#" className="button">Budget Management</a>
                   <a href="#" className="button">Report Spending Habits</a>
               </div>
           </nav>
           <main>
               <h2>Welcome to my home page! Do you want to keep track of your shopping habits? You've arrived at the right place!</h2>
               {/* Conditionally render the ShoppingHabitsForm component based on the state */}
               {showForm && <ShoppingHabitsForm />}
           </main>
       </div>
   );
}


export default HomePage;