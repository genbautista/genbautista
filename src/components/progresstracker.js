import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import bannerImage from './banner.jpeg';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const ProgressTracker = () => {
    const [monthlySpending, setMonthlySpending] = useState(""); // Initialize as null or empty string
    const [areasToImprove, setAreasToImprove] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch spending data from Firestore
                const spendingSnapshot = await getDocs(collection(firestore, 'shoppingHabits'));
                const spendingData = spendingSnapshot.docs.map(doc => doc.data().monthlySpending);
                // Calculate total monthly spending by summing up all spending amounts
                const totalMonthlySpending = spendingData.reduce((acc, cur) => acc + cur);
                console.log("Monthly Spending from Firestore:", totalMonthlySpending);
                setMonthlySpending(totalMonthlySpending);
    
                // Fetch areas to improve data from Firestore (replace 'areasToImprove' with the correct collection name)
                const areasToImproveSnapshot = await getDocs(collection(firestore, 'areasToImprove'));
                const areasToImproveData = areasToImproveSnapshot.docs.map(doc => doc.data());
                console.log("Areas to Improve from Firestore:", areasToImproveData);
    
                setAreasToImprove(areasToImproveData.map(item => item.content).join(", "));
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
            // Implement any logic you need for updating progress
        }
    };

    const handleButtonReset = () => {
        setProgress(0);
        // Implement any logic you need for resetting progress
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
                <p>This is your areas to improve: {areasToImprove}</p>
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

export default ProgressTracker;
