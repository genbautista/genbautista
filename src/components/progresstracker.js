import React, { useState } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import bannerImage from './banner.jpeg';

export const ProgressBar = ({ updateProgress }) => {
    const [progress, setProgress] = useState(0); 

    const handleButtonClick = () => {
        if (progress < 100) {
            setProgress(progress + 20);
            updateProgress(progress + 20); 
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
            <img src={bannerImage} alt="Banner" width="1425" height="200" />
            <header>
                <h1>Wallet Warden</h1>
            </header>
            <nav className="navigation">
                <div className="flower"></div>
                <div className="tracker-menu">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <div className="nav-menu hide">
                    <Link to="/" className="button">Home</Link>
                    <Link to="/progress" className="button">Progress Tracker</Link>
                </div>
            </nav>
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