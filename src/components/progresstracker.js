import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import './ShoppingHabitsForm';
import bannerImage from './banner.jpeg';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase'; 

export const ProgressBar = ({ updateProgress }) => {
    const [monthlySpending, setMonthlySpending] = useState(0); 
    const [areasToImprove, setAreasToImprove] = useState(""); 
    const [progress, setProgress] = useState(0); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch spending data from Firestore
                const spendingSnapshot = await getDocs(collection(firestore, 'spending'));
                const spendingData = spendingSnapshot.docs.map(doc => doc.data().amount);
                // Calculate total monthly spending by summing up all spending amounts
                const totalMonthlySpending = spendingData.reduce((acc, cur) => acc + cur, 0);
                console.log("Monthly Spending:", totalMonthlySpending);
                setMonthlySpending(totalMonthlySpending);
    
                // Fetch areas to improve data from Firestore
                const areasToImproveSnapshot = await getDocs(collection(firestore, 'areasToImprove'));
                const areasToImproveData = areasToImproveSnapshot.docs.map(doc => doc.data().content);
                console.log("Areas to Improve:", areasToImproveData);
                setAreasToImprove(areasToImproveData.join(", ")); 
            } catch (error) {
                console.log(error)
            }
        };
    
        fetchData();
    }, []);    

    useEffect(() => {
        // Calculate progress based on monthly spending
        const calculatedProgress = Math.min((monthlySpending / 1000) * 100, 100); 
        console.log("Progress:", calculatedProgress);
        setProgress(calculatedProgress);
    }, [monthlySpending, areasToImprove]);    

    const handleButtonClick = () => {
        if (progress < 100) {
            const newProgress = Math.min(progress + 10, 100); 
            setProgress(newProgress);
            updateProgress(newProgress); 
        }
    };    

    const handleButtonReset = () => {
        setProgress(0);
        updateProgress(0);
    };

    const getColor = () => {
        if (progress < 40) {
            return "#ff0000";
        } else if (progress < 70) {
            return "#ffa500";
        } else {
            return "#2ecc71";
        }
    };

    return (
        <div>
            <img src={bannerImage} alt="banner" width="100%" height="250" />
            <header>
                <h1>Wallet Warden</h1>
            </header>
            <nav className="navigation">
                <div className="flower"></div>
                <div className="tracker-menu">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <div className="nav-menu hide">
                    <Link to="/" className="button">Home</Link>
                    <Link to="/progress" className="button">Progress Tracker</Link>
                </div>
            </nav>

            <div className="info">
                <p>This is your monthly spending: {monthlySpending}</p>
                <p>Areas to improve: {areasToImprove}</p>
            </div>

            <div className="container">
                <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
                </div>
                <div className="progress-label">
                    {progress}%
                </div>
                <button onClick={handleButtonClick}>Progress</button>
                <button onClick={handleButtonReset}>Reset</button>
            </div>
        </div>
    );
};
