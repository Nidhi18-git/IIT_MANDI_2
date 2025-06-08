import React from 'react';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Rajiv Kumar',
      position: 'Program Director',
      bio: 'Dr. Kumar has over 20 years of experience in education and skill development. He previously led national-level skill initiatives before joining Skill India.',
      image: 'https://via.placeholder.com/300x300?text=Dr.+Rajiv+Kumar'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'Head of Curriculum Development',
      bio: 'Priya brings 15 years of experience in designing educational content for various technical domains, with expertise in digital learning methodologies.',
      image: 'https://via.placeholder.com/300x300?text=Priya+Sharma'
    },
    {
      id: 3,
      name: 'Vikram Mehta',
      position: 'Technical Training Lead',
      bio: 'Vikram is a technology expert with background in software development and IT infrastructure. He oversees the technical training programs.',
      image: 'https://via.placeholder.com/300x300?text=Vikram+Mehta'
    },
    {
      id: 4,
      name: 'Anjali Patel',
      position: 'Industry Partnerships Manager',
      bio: 'Anjali coordinates with industry partners to ensure our training meets current market needs and creates employment opportunities for students.',
      image: 'https://via.placeholder.com/300x300?text=Anjali+Patel'
    },
    {
      id: 5,
      name: 'Rahul Singh',
      position: 'Student Success Coordinator',
      bio: 'Rahul works directly with students to provide guidance, track progress, and ensure they receive the support needed to complete their courses successfully.',
      image: 'https://via.placeholder.com/300x300?text=Rahul+Singh'
    },
    {
      id: 6,
      name: 'Neha Gupta',
      position: 'Digital Marketing Specialist',
      bio: 'Neha handles our digital presence and marketing initiatives, ensuring that our programs reach those who can benefit most from them.',
      image: 'https://via.placeholder.com/300x300?text=Neha+Gupta'
    }
  ];

  const advisors = [
    {
      id: 1,
      name: 'Mr. Amit Agarwal',
      position: 'Industry Advisor',
      company: 'TechSolutions India',
      image: 'https://via.placeholder.com/200x200?text=Amit+Agarwal'
    },
    {
      id: 2,
      name: 'Ms. Sunita Reddy',
      position: 'Education Policy Advisor',
      company: 'National Education Board',
      image: 'https://via.placeholder.com/200x200?text=Sunita+Reddy'
    },
    {
      id: 3,
      name: 'Dr. Prakash Joshi',
      position: 'Research Advisor',
      company: 'Indian Institute of Technology',
      image: 'https://via.placeholder.com/200x200?text=Prakash+Joshi'
    }
  ];

  return (
    <div className="team-page">
      <div className="page-header">
        <h1>Our Team</h1>
        <p>Meet the dedicated professionals behind Skill India's success</p>
      </div>

      <section className="team-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Skill India, our mission is to empower India's youth with industry-relevant skills, 
            helping them achieve meaningful employment and contribute to the nation's growth. 
            We are committed to providing high-quality, accessible education that bridges the gap 
            between academic learning and workplace requirements.
          </p>
        </div>
      </section>

      <section className="leadership-team">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-position">{member.position}</p>
                <p className="member-bio">{member.bio}</p>
                <div className="social-links">
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="advisory-board">
        <h2>Advisory Board</h2>
        <div className="advisors-grid">
          {advisors.map(advisor => (
            <div key={advisor.id} className="advisor-card">
              <div className="advisor-image">
                <img src={advisor.image} alt={advisor.name} />
              </div>
              <div className="advisor-info">
                <h3>{advisor.name}</h3>
                <p className="advisor-position">{advisor.position}</p>
                <p className="advisor-company">{advisor.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="join-team">
        <div className="join-content">
          <h2>Join Our Team</h2>
          <p>
            We're always looking for passionate individuals who share our vision of 
            empowering India through skill development. Explore our current openings 
            and become part of our mission.
          </p>
          <a href="#" className="careers-button">View Careers</a>
        </div>
      </section>
    </div>
  );
};

export default TeamPage; 