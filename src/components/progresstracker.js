import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import bannerImage from './banner.jpeg';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const ProgressTracker = () => {
    const [monthlySpending, setMonthlySpending] = useState("");
    const [areasToImprove, setAreasToImprove] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const spendingSnapshot = await getDocs(collection(firestore, 'shoppingHabits'));
                const spendingData = spendingSnapshot.docs.map(doc => doc.data().monthlySpending);

                const totalMonthlySpending = spendingData.reduce((acc, cur) => acc + cur);
                console.log("Monthly Spending from Firestore:", totalMonthlySpending);
                setMonthlySpending(totalMonthlySpending);


                const areasToImproveData = spendingSnapshot.docs.map(doc => doc.data().areasToImprove);
                console.log("Areas to Improve from Firestore:", areasToImproveData);


                const latestAreasToImprove = areasToImproveData[areasToImproveData.length - 1];


                setAreasToImprove(latestAreasToImprove);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = () => {
        if (progress < 100) {
            const newProgress = Math.min(progress + 10, 100);
            setProgress(newProgress);

        }
    };

    const handleButtonReset = () => {
        setProgress(0);
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
                <p>This is your monthly spending: ${monthlySpending}</p>
                <p>This is your budget: ${areasToImprove}</p>
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
