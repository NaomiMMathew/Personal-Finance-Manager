import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { FaChartLine } from 'react-icons/fa';
import person1 from '../assets/person1.jpg'
import person2 from '../assets/person2.jpg'
import person3 from '../assets/person3.jpg'

const HomePage = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login'); // Replace with your target page route
    };
    return (
        <div className="container">
            <header className="header" style={{background:'darkblue'}}>
           
            
                <h1 className="logo"> <FaChartLine style={{color:'white',fontSize:'3rem'}} />MYFINANCE TRACKER</h1>
                <nav>
                    <ul className="nav-links">
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/login'>LOGIN</Link></li>
                        <li><Link to='/features'>FEATURES</Link></li>
                        <li><Link to="/aboutus">ABOUT US</Link></li>
                      
                    </ul>
                </nav>
            </header>
            <main className="main-content">
                <h2 style={{color:'white'}}>Manage Your Finances With Ease</h2>
                <p style={{color:'white'}}>Keep track of your income, expenses, and savings with our user-friendly platform.</p>
                <button onClick={handleButtonClick} className="cta-button">Get Started</button>
            </main>
            <section className="testimonials">
    <h2>What Our Users Say</h2>
    <div className="testimonial-container">
        <div className="testimonial">
           <img src={person1} className='testimonialperson' />
            <p>"MyFinance Tracker has completely transformed the way I manage my money. Highly recommend!"</p>
            <p>- Alex S.</p>
        </div>
        <div className="testimonial">
        <img src={person2} className='testimonialperson' />
            <p>"The best personal finance platform I've ever used. Simple, intuitive, and effective."</p>
            <p>- Jessica M.</p>
        </div>
        <div className="testimonial">
        <img src={person3} className='testimonialperson' />
            <p>"Thanks to MyFinance  Tracker, I finally have a clear picture of my financial health."</p>
            <p>- John D.</p>
        </div>
    </div>
</section>



            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section about">
                     
                        <h3>About MyFinance Tracker</h3>
                        <p  style={{color:'white',textalign:'center'}}> MyFinanceTracker is your trusted partner in managing your personal finances. Our platform is designed to help you keep track of your income, expenses, and savings effortlessly.</p>
                    </div>
                    <div className="footer-section quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                        <li><Link to='/features'>Features</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                      
                            <li><a href="#contact">Contact:+91 8298102534</a></li>
                            <li><a href="#email">Email:myfinance@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className="footer-section social-media">
                        <h3>Follow Us</h3>
                        <ul>
                            <li><a href="#facebook">Facebook</a></li>
                            <li><a href="#twitter">Twitter</a></li>
                            <li><a href="#instagram">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p style={{color:'white'}}>&copy; 2025 MyFinance. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
