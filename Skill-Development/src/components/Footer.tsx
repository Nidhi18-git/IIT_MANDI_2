import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => (
  <footer className="footer-root">
    <div className="footer-main">
      <div className="footer-logo-block">
        <img src="images/logo.png" alt="IIT Mandi iHub & HCi Foundation" className="footer-logo-img" />
        <p className="footer-mission"><b>To be an internationally recognized hub that nurtures HCI research, enables technology translation for industry, and scales skill development.</b></p>
      </div>
      <div className="footer-links-block">
        <div className="footer-links-col">
          <h4>DEPARTMENTS</h4>
          <ul>
            <li><a href="/skill-development">Skill Development</a></li>
            <li><a href="/incubation">Incubation Program</a></li>
            <li><a href="/fellowship">Fellowship Program</a></li>
            <li><a href="/dst">DST</a></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4>QUICK LINK</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://www.iitmandi.ac.in/" target="_blank" rel="noopener noreferrer">IIT Mandi Home</a></li>
            <li><a href="/about">About us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-map-block">
        <h4 className="footer-map-title">Visit Place</h4>
        <div className="footer-map-iframe-wrapper">
          <iframe
            title="IIT Mandi iHub and HCI Foundation Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4098.448958051239!2d76.98120378776287!3d31.77539970731251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904e5223b451c09%3A0xaa1593297a5c5125!2sIIT%20Mandi%20iHub%20and%20HCI%20Foundation!5e1!3m2!1sen!2sin!4v1747735238177!5m2!1sen!2sin"
            width="100%"
            height="140"
            style={{ border: 0, borderRadius: '10px', width: '100%', minWidth: '180px', maxWidth: '260px', height: '140px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="footer-social footer-social-below-map">
          <a href="https://facebook.com/iHubHCIFoundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M19 2h-3a7 7 0 0 0-7 7v3H5v4h4v10h4V16h3l1-4h-4v-3a2 2 0 0 1 2-2h2V2z" fill="#fff"/></svg>
          </a>
          <a href="https://twitter.com/iHubHCIFdn" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M7 7l14 14M21 7L7 21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/ihubhci/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect x="2" y="2" width="24" height="24" rx="4" fill="#fff"/><path d="M8 11v7M8 8v.01M14 11v7M14 11c0-1.1.9-2 2-2s2 .9 2 2v7" stroke="#222" strokeWidth="2"/></svg>
          </a>
          <a href="https://instagram.com/ihubhci" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect x="4" y="4" width="20" height="20" rx="6" stroke="#fff" strokeWidth="2"/><circle cx="14" cy="14" r="5" stroke="#fff" strokeWidth="2"/><circle cx="19" cy="9" r="1" fill="#fff"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2023 All Rights Reserved by <a href="https://www.iitmandicatalyst.in/" target="_blank" rel="noopener noreferrer">IIT Mandi Catalyst</a></span>
    </div>
  </footer>
);

export default Footer; 