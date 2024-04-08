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
               <h1>Wallet Warden</h1>
           </header>
           <nav className="navigation">
               <div className="flower">
               </div>
               <div className="tracker-menu">
                   <span className="line"></span>
                   <span className="line"></span>
                   <span className="line"></span>
                   <span className="line"></span>
               </div>
               <div className="nav-menu hide">
                   <a href="#" className="button">Home</a>
                   <a href="#" className="button">Progress Tracker</a>
                   <button onClick={handleGoalSettingClick} className="button">Goal Setting/Report Spendings</button> {}
                   <a href="#" className="button">Budget Management</a>
               </div>
           </nav>
           <main>
               <h2>Welcome to my home page! Do you want to keep track of your shopping habits? You've arrived at the right place!</h2>
               <p>In order to begin please click on the Goal Setting/Report button to specify on your spendings.</p>
               {}
               {showForm && <ShoppingHabitsForm />}
           </main>
       </div>
   );
}


export default HomePage;
