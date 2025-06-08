import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/home.css';

const heroImages = [
  'images/hero.png',
  'images/hero2.png',
  'images/hero3.png',
  'images/hero4.png',
  'images/hero5.png',
  'images/hero6.png',
];

const HomePage: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const [activeMenu, setActiveMenu] = useState('home');
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    if (menu === 'student') {
      navigate('/login?role=student');
    } else if (menu === 'admin') {
      navigate('/login?role=admin');
    } else if (menu === 'home') {
      setActiveMenu(menu);
      navigate('/');
    } else if (menu === 'skill') {
      setActiveMenu(menu);
    } else if (menu === 'incubation') {
      setActiveMenu(menu);
      navigate('/incubation');
    } else if (menu === 'fellowship') {
      setActiveMenu(menu);
      navigate('/fellowship');
    } else if (menu === 'dst') {
      setActiveMenu(menu);
      navigate('/dst');
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className="homepage-main-content">
      {/* Sidebar + Hero Section Row */}
      <div className="hero-row" style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'stretch', margin: 0, padding: 0 }}>
        <Sidebar
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
        />
        <div className="hero-section hero-section-main-content">
          <img src={heroImages[slide]} alt="Hero" className="hero-img" />
          <button className="hero-arrow left" onClick={() => setSlide((slide - 1 + heroImages.length) % heroImages.length)} aria-label="Previous slide">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#fff"/>
              <path d="M16.5 8L11 14L16.5 20" stroke="#234a8c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero-arrow right" onClick={() => setSlide((slide + 1) % heroImages.length)} aria-label="Next slide">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#fff"/>
              <path d="M11.5 8L17 14L11.5 20" stroke="#234a8c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="hero-dots">
            {heroImages.map((_, i) => (
              <span key={i} className={slide === i ? 'active' : ''} onClick={() => setSlide(i)} />
            ))}
          </div>
          <div className="announcement-bar">
            <span className="announcement-label">Announcement</span>
            <span className="announcement-arrow" style={{ color: '#111', fontWeight: 'bold', fontSize: '1.2rem', margin: '0 12px' }}>&#9654;</span>
            <span className="announcement-text" style={{ fontWeight: 'bold', color: '#111' }}>1. Inviting Applications for the Investment Readiness Program! Apply Now!</span>
          </div>
        </div>
      </div>

      {/* Rest of the sections (only show if not logged in) */}
      <div className="main-sections">
        {/* About Us Section */}
        <section className="about-section-custom">
          <h2 className="about-title-custom">ABOUT US</h2>
          <div className="about-underline-custom" />
          <div className="about-text-custom">
            IIT Mandi iHub and HCi Foundation (iHub) is a Technology Innovation Hub (TIH). The Hub was incorporated on 24th September 2020. It is hosted at the Indian Institute of Technology (IIT) Mandi under India's National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS). The iHub has been planned with the objective of making India a world leader in Human-Computer Interaction (HCi)-based research.
          </div>
        </section>

        {/* Our Vibrant Beginnings Section */}
        <div className="section-grey-strip">
          <section className="vibrant-section-custom">
            <div className="vibrant-img-col-custom">
              <img src="images/hero1.png" alt="Vibrant Beginnings" className="vibrant-img-custom" />
            </div>
            <div className="vibrant-content-col-custom">
              <h3 className="vibrant-title-custom">Our Vibrant Beginnings</h3>
              <div className="vibrant-text-custom">
                Catalyst goes above and beyond in fostering the growth of incubated startups by offering them not just office spaces, but dedicated co-working environments tailored to amplify productivity and collaboration. This unique provision extends beyond the conventional, providing entrepreneurs with an exclusive opportunity to immerse themselves in the scenic and inspiring surroundings of the IIT Mandi campus. Our incubated startups benefit from more than just a workplace; they become part of a vibrant ecosystem where innovation, networking, and the pursuit of excellence converge seamlessly.
              </div>
            </div>
          </section>
        </div>

        {/* Impact Section */}
        <section className="impact-section-custom">
          <div className="impact-content-col-custom">
            <h3 className="impact-title-custom">We can make an impact together</h3>
            <div className="impact-text-custom">
              Catalyst goes above and beyond in fostering the growth of incubated startups by offering them not just office spaces, but dedicated co-working environments tailored to amplify productivity and collaboration. This unique provision extends beyond the conventional, providing entrepreneurs with an exclusive opportunity to immerse themselves in the scenic and inspiring surroundings of the IIT Mandi campus. Our incubated startups benefit from more than just a workplace; they become part of a vibrant ecosystem where innovation, networking, and the pursuit of excellence converge seamlessly.
            </div>
          </div>
          <div className="impact-img-col-custom">
            <img src="images/impact.png" alt="Impact 1" className="impact-img-custom" />
          </div>
        </section>

        {/* Support Section */}
        <div className="section-grey-strip">
          <section className="support-section-custom">
            <div className="support-img-col-custom">
              <img src="images/workspace.png" alt="Workspace" className="support-img-custom" />
            </div>
            <div className="support-content-col-custom">
              <h3 className="support-title-custom">You have an idea where we can support?</h3>
              <div className="support-text-custom">
                We have processed more than 1000 applications since inception and have worked with more than 60 startups in Medical Electronics, Healthcare, IoT, Automation, Robotics, Waste Management, Industrial Solutions, Consumer Electronics, Education and so on.
              </div>
              <div className="support-list-title-custom">You can apply with us If you:</div>
              <ul className="support-list-custom">
                <li>Are a team of (or company owned by ) Indian nationals</li>
                <li>Are in a stage between prototyping and early scaling</li>
                <li>Have not received any equity based investments from another incubator</li>
                <li>Need mentoring and/or infrastructure to progress further</li>
                <li>Need an affordable, knowledge rich and productive work environment</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Primary Activities Section */}
        <section className="activities-section-custom">
          <h3 className="activities-title-custom">Primary activities of iHub</h3>
          <div className="activities-cards-row-custom">
            <div className="activity-card-custom">
              <div className="front">
                <span className="activity-icon-custom">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="10" width="28" height="36" rx="4" stroke="#fff" strokeWidth="3" fill="none"/>
                    <rect x="18" y="18" width="16" height="4" rx="2" fill="#fff"/>
                    <rect x="18" y="26" width="16" height="4" rx="2" fill="#fff"/>
                    <circle cx="42" cy="42" r="7" stroke="#fff" strokeWidth="3" fill="none"/>
                    <line x1="47" y1="47" x2="54" y2="54" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                <div className="activity-text-custom">Research &<br/>Technology<br/>Development</div>
              </div>
              <div className="back">
                <div className="back-text">
                  At IIT Mandi iHub, we are committed to promoting a results-driven approach to developing technological solutions that are rooted in real-life applications. Our focus is on innovations with significant market potential. Through our Call for Proposals (CfP) program, we actively support and advance translational research.
                </div>
              </div>
            </div>
            <div className="activity-card-custom">
              <div className="front">
                <span className="activity-icon-custom">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="20" r="6" fill="#fff"/>
                    <rect x="26" y="28" width="8" height="16" rx="4" fill="#fff"/>
                    <circle cx="15" cy="40" r="4" fill="#fff"/>
                    <circle cx="45" cy="40" r="4" fill="#fff"/>
                    <rect x="12" y="44" width="36" height="4" rx="2" fill="#fff"/>
                  </svg>
                </span>
                <div className="activity-text-custom">Skill<br/>Development</div>
              </div>
              <div className="back">
                <div className="back-text">
                  As an approved training partner for central and state government-sponsored schemes such as PMKVY (Pradhan Mantri Kaushal Vikas Yojana) and HPKVN (Himachal Pradesh Kaushal Vikas Nigam), IIT Mandi iHub offers certified short-term skill courses in the area of Human-Computer Interaction. These programs are designed to equip participants with practical skills and cutting-edge knowledge to excel in the field of HCi.
                </div>
              </div>
            </div>
            <div className="activity-card-custom">
              <div className="front">
                <span className="activity-icon-custom">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="30" cy="40" rx="12" ry="8" fill="#fff"/>
                    <circle cx="30" cy="28" r="6" fill="#fff"/>
                    <rect x="28" y="16" width="4" height="8" rx="2" fill="#fff"/>
                  </svg>
                </span>
                <div className="activity-text-custom">Incubation<br/>&<br/>Acceleration</div>
              </div>
              <div className="back">
                <div className="back-text">
                  At IIT Mandi iHub, we are committed to supporting entrepreneurship and innovation through our various incubation and acceleration programs. Under our Call for Innovation (CfI) program, we offer startups mentorship, funding support, and access to state-of-the-art infrastructure. By collaborating closely with entrepreneurs, we help turn their innovative ideas into practical solutions that can make a real impact.
                </div>
              </div>
            </div>
            <div className="activity-card-custom">
              <div className="front">
                <span className="activity-icon-custom">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="30" r="6" fill="#fff"/>
                    <circle cx="40" cy="30" r="6" fill="#fff"/>
                    <rect x="26" y="36" width="8" height="10" rx="4" fill="#fff"/>
                    <rect x="12" y="44" width="36" height="4" rx="2" fill="#fff"/>
                  </svg>
                </span>
                <div className="activity-text-custom">Collaboration</div>
              </div>
              <div className="back">
                <div className="back-text">
                  At IIT Mandi iHub, we are all about making a real difference by tackling everyday challenges. We actively collaborate with government and non-government organizations, both nationally and internationally, to work on a variety of projects. By teaming up, we aim to create practical solutions in the field of Human-Computer Interaction that address real-world problems.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="getting-started-section-custom">
          <h3 className="getting-started-title-custom">Getting Started</h3>
          <div className="getting-started-subtitle-custom">
            Do you have an interesting Startup idea? Follow the below steps to make the most out of our resources!
          </div>
          <div className="getting-started-process-img-bg">
            <img src="images/process.png" alt="Process Steps" className="getting-started-process-img" />
          </div>
          <a href="/register" className="getting-started-register-btn-custom">
            <span className="register-btn-icon-custom">
              {/* Register SVG icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="20" height="16" rx="3" stroke="#fff" strokeWidth="2.2" fill="none"/>
                <rect x="8" y="10" width="8" height="2.5" rx="1.2" fill="#fff"/>
                <rect x="8" y="14" width="6" height="2.5" rx="1.2" fill="#fff"/>
                <circle cx="20" cy="18" r="2" fill="#fff"/>
              </svg>
            </span>
            Register Here
          </a>
        </section>

        {/* Supported By Section */}
        <section className="supported-by-section-custom">
          <h3 className="supported-by-title-custom">Supported By</h3>
          <div className="supported-logos-row-custom">
            <img src="images/dst.png" alt="DST" className="supported-logo-custom" />
            <img src="images/nmicps.png" alt="NM-ICPS" className="supported-logo-custom" />
            <img src="images/iitmd.png" alt="IIT Mandi" className="supported-logo-custom" />
            <img src="images/dpiit.png" alt="DPIIT" className="supported-logo-custom" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 