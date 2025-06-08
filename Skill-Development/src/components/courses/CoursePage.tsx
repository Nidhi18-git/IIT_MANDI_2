import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  imageUrl: string;
  enrollmentCount: number;
}

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn the core technologies that power the web: HTML, CSS, and JavaScript.',
      instructor: 'Raj Malhotra',
      duration: '8 weeks',
      level: 'Beginner',
      imageUrl: 'https://via.placeholder.com/300x200?text=Web+Development',
      enrollmentCount: 124
    },
    {
      id: 2,
      title: 'Digital Marketing Essentials',
      description: 'Master the fundamentals of digital marketing, including SEO, content marketing, and social media strategies.',
      instructor: 'Priya Sharma',
      duration: '6 weeks',
      level: 'Intermediate',
      imageUrl: 'https://via.placeholder.com/300x200?text=Digital+Marketing',
      enrollmentCount: 98
    },
    {
      id: 3,
      title: 'Data Science and Analytics',
      description: 'Dive into the world of data analysis, machine learning, and predictive modeling.',
      instructor: 'Vikram Mehta',
      duration: '10 weeks',
      level: 'Advanced',
      imageUrl: 'https://via.placeholder.com/300x200?text=Data+Science',
      enrollmentCount: 76
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'beginner') return matchesSearch && course.level === 'Beginner';
    if (filter === 'intermediate') return matchesSearch && course.level === 'Intermediate';
    if (filter === 'advanced') return matchesSearch && course.level === 'Advanced';
    
    return matchesSearch;
  });

  return (
    <div className="courses-page">
      <h1>Explore Courses</h1>
      
      <div className="courses-controls">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-options">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'beginner' ? 'active' : ''}`}
            onClick={() => handleFilterChange('beginner')}
          >
            Beginner
          </button>
          <button 
            className={`filter-btn ${filter === 'intermediate' ? 'active' : ''}`}
            onClick={() => handleFilterChange('intermediate')}
          >
            Intermediate
          </button>
          <button 
            className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`}
            onClick={() => handleFilterChange('advanced')}
          >
            Advanced
          </button>
        </div>
      </div>
      
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.imageUrl} alt={course.title} />
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-label">Instructor:</span>
                    <span className="meta-value">{course.instructor}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Level:</span>
                    <span className="meta-value">{course.level}</span>
                  </div>
                </div>
                <div className="course-footer">
                  <span className="enrollment-count">{course.enrollmentCount} students enrolled</span>
                  <Link to={`/courses/${course.id}`} className="view-course-btn">
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses">
            <p>No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage; 