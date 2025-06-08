import React, { useState } from 'react';

const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const galleryItems = [
    {
      id: 1,
      title: 'Web Development Workshop',
      category: 'events',
      date: 'March 15, 2024',
      image: 'https://via.placeholder.com/600x400?text=Web+Development+Workshop'
    },
    {
      id: 2,
      title: 'Data Science Bootcamp',
      category: 'events',
      date: 'February 28, 2024',
      image: 'https://via.placeholder.com/600x400?text=Data+Science+Bootcamp'
    },
    {
      id: 3,
      title: 'Student Achievements',
      category: 'students',
      date: 'January 20, 2024',
      image: 'https://via.placeholder.com/600x400?text=Student+Achievements'
    },
    {
      id: 4,
      title: 'Campus Facilities',
      category: 'campus',
      date: 'December 10, 2023',
      image: 'https://via.placeholder.com/600x400?text=Campus+Facilities'
    },
    {
      id: 5,
      title: 'Industry Visit - TechCorp',
      category: 'industry',
      date: 'November 5, 2023',
      image: 'https://via.placeholder.com/600x400?text=Industry+Visit'
    },
    {
      id: 6,
      title: 'Annual Graduation Ceremony',
      category: 'events',
      date: 'October 25, 2023',
      image: 'https://via.placeholder.com/600x400?text=Graduation+Ceremony'
    },
    {
      id: 7,
      title: 'Hackathon Winners',
      category: 'students',
      date: 'September 18, 2023',
      image: 'https://via.placeholder.com/600x400?text=Hackathon+Winners'
    },
    {
      id: 8,
      title: 'Training Labs',
      category: 'campus',
      date: 'August 30, 2023',
      image: 'https://via.placeholder.com/600x400?text=Training+Labs'
    },
    {
      id: 9,
      title: 'Industry Partnership Signing',
      category: 'industry',
      date: 'July 12, 2023',
      image: 'https://via.placeholder.com/600x400?text=Industry+Partnership'
    }
  ];
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Photo Gallery</h1>
        <p>Capturing moments of learning, achievement, and growth at Skill India</p>
      </div>
      
      <div className="gallery-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('all')}
        >
          All Photos
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('events')}
        >
          Events
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'students' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('students')}
        >
          Students
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'campus' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('campus')}
        >
          Campus
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'industry' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('industry')}
        >
          Industry Visits
        </button>
      </div>
      
      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="gallery-pagination">
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">Next →</button>
      </div>
      
      <div className="gallery-submit">
        <h2>Share Your Moments</h2>
        <p>Are you a Skill India student or faculty member? Share your photos with us!</p>
        <button className="submit-button">Submit Photos</button>
      </div>
    </div>
  );
};

export default GalleryPage; 