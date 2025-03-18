import React from 'react';
import './AboutUs.css';
import teammember1 from '../assets/team-member-1.png';
import teammember2 from '../assets/team-member-2.jpg';
import teammember3 from '../assets/team-member-3.jpg';
const AboutUs = () => {
    return (
        <div className='main'>
        <div className="about-us-container">
            <h1 className="about-us-title">About Us</h1>
            <div className="about-us-content">
                <p>
                    Welcome to MyFinance, your trusted partner in managing your personal finances. Our mission is to
                    empower individuals to take control of their financial future through innovative tools and expert
                    guidance. Whether you're looking to track your expenses, plan your budget, or gain insights into
                    your investments, MyFinance is here to help.
                </p>
                <p>
                    Our platform is designed with simplicity and user-friendliness in mind. We believe that managing
                    your finances should be easy and accessible to everyone, regardless of their financial background.
                    With MyFinance, you can stay on top of your financial health and make informed decisions to secure
                    your future.
                </p>
                <p>
                    Join us on this journey to financial empowerment and discover how MyFinance can transform the way
                    you manage your money. Thank you for choosing us as your trusted financial partner.
                </p>
            </div>
            <div className="team-section">
                <h2 className="team-title">Meet Our Team</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src={teammember2} alt="Team Member 1" />
                        <h3>Jane Doe</h3>
                        <p>CEO & Founder</p>
                    </div>
                    <div className="team-member">
                        <img src={teammember3} alt="Team Member 2" />
                        <h3>John Smith</h3>
                        <p>Chief Financial Officer</p>
                    </div>
                    <div className="team-member">
                        <img src={teammember1} alt="Team Member 3" />
                        <h3>Emily Johnson</h3>
                        <p>Lead Developer</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;
