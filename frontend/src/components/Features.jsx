import React from 'react';
import './Features.css';
import { FaChartLine, FaPiggyBank, FaDollarSign, FaLightbulb, FaFileAlt } from 'react-icons/fa';

const Features = () => {
    return (
        <div className="features-container">
            <h1 className="features-title">Our Features</h1>
            <div className="feature">
                <FaChartLine className="feature-icon" />
                <h2>Expense Tracking</h2>
                <p>Keep a detailed record of all your expenses and stay on top of your spending habits.</p>
            </div>
            <div className="feature">
                <FaPiggyBank className="feature-icon" />
                <h2>Budget Planning</h2>
                <p>Create and manage budgets to ensure you're spending within your means and saving for the future.</p>
            </div>
            <div className="feature">
                <FaDollarSign className="feature-icon" />
                <h2>Income Management</h2>
                <p>Track your income sources and monitor your earnings over time.</p>
            </div>
            <div className="feature">
                <FaLightbulb className="feature-icon" />
                <h2>Investment Insights</h2>
                <p>Get personalized investment recommendations based on your financial goals.</p>
            </div>
            <div className="feature">
                <FaFileAlt className="feature-icon" />
                <h2>Financial Reports</h2>
                <p>Generate comprehensive financial reports to analyze your financial health.</p>
            </div>
        </div>
    );
};

export default Features;
