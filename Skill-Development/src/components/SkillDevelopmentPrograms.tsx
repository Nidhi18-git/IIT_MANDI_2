import React from 'react';
import './SkillDevelopmentPrograms.css';

const SkillDevelopmentPrograms: React.FC = () => (
  <section className="sdp-root">
    <h2 className="sdp-title">Skill Development Programs</h2>

    {/* PMKVY Card with full-width grey strip */}
    <div className="sdp-card-strip">
      <div className="sdp-card sdp-card-grey">
        <div className="sdp-card-img-col">
          <img src="images/pmkvy.png" alt="PMKVY" className="sdp-card-img" />
        </div>
        <div className="sdp-card-content-col">
          <div className="sdp-card-heading sdp-orange">Training Partner for PMKVY</div>
          <div className="sdp-card-desc">
            IIT Mandi iHub and HCi Foundation, the Technology Innovation Hub focusing on Human-Computer Interaction (HCi), has been selected as a Skill Hub by National Skill Development Corporation (NSDC) to provide training on Future Skills under the Pradhan Mantri Kaushal Vikas Yojana (PMKVY) 4.0 program.<br /><br />
            PMKVY is a flagship scheme of the Ministry of Skill Development and Entrepreneurship (MSDE) implemented by National Skill Development Corporation to enable Indian youth to take up industry-relevant skill training to help them to secure better livelihoods.
          </div>
          <div className="pmkvy-btn-align">
            <button className="sdp-card-btn">
              Show More <span className="sdp-arrow">&#8250;</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* HPKVN Card */}
    <div className="sdp-card sdp-card-white">
      <div className="sdp-card-content-col">
        <div className="sdp-card-heading sdp-orange">Training Partner for HPKVN</div>
        <div className="sdp-card-desc">
          At IIT Mandi iHub and HCi Foundation, we are proud to partner with Himachal Pradesh Kaushal Vikas Nigam (HPKVN) to provide a range of skill development courses aimed at enhancing the employability and capabilities of youth in Himachal Pradesh. Our mission is to empower individuals with the skills and knowledge required to excel in today's dynamic job market.
        </div>
        <button className="sdp-card-btn">
          Show More <span className="sdp-arrow">&#8250;</span>
        </button>
      </div>
      <div className="sdp-card-img-col">
        <img src="images/hpkvn.png" alt="HPKVN" className="sdp-card-img bordered" />
      </div>
    </div>
  </section>
);

export default SkillDevelopmentPrograms; 