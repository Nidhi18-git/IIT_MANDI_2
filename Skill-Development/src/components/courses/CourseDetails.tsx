import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface CourseData {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  imageUrl: string;
  enrollmentCount: number;
  syllabus: {
    weekNumber: number;
    title: string;
    description: string;
  }[];
  reviews: {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [activeTab, setActiveTab] = useState('syllabus');

  useEffect(() => {
    // In a real application, fetch course data from an API
    // For now, we'll simulate loading and set mock data
    setLoading(true);
    
    setTimeout(() => {
      const mockCourse: CourseData = {
        id: Number(id),
        title: 'Web Development Fundamentals',
        description: 'Learn the core technologies that power the web: HTML, CSS, and JavaScript. This comprehensive course will take you from a beginner to building interactive web applications.',
        instructor: 'Raj Malhotra',
        duration: '8 weeks',
        level: 'Beginner',
        imageUrl: 'https://via.placeholder.com/800x400?text=Web+Development',
        enrollmentCount: 124,
        syllabus: [
          {
            weekNumber: 1,
            title: 'Introduction to HTML',
            description: 'Learn the basics of HTML, document structure, and semantic elements.'
          },
          {
            weekNumber: 2,
            title: 'CSS Fundamentals',
            description: 'Master CSS selectors, box model, layout techniques, and responsive design.'
          },
          {
            weekNumber: 3,
            title: 'JavaScript Basics',
            description: 'Understand JavaScript syntax, variables, data types, and control structures.'
          },
          {
            weekNumber: 4,
            title: 'DOM Manipulation',
            description: 'Learn to interact with the Document Object Model using JavaScript.'
          },
          {
            weekNumber: 5,
            title: 'Forms and Validation',
            description: 'Build interactive forms with client-side validation.'
          },
          {
            weekNumber: 6,
            title: 'API Integration',
            description: 'Connect to external APIs and work with JSON data.'
          },
          {
            weekNumber: 7,
            title: 'Responsive Web Design',
            description: 'Create websites that work on all devices and screen sizes.'
          },
          {
            weekNumber: 8,
            title: 'Final Project',
            description: 'Apply all learned concepts to build a complete web application.'
          }
        ],
        reviews: [
          {
            id: 1,
            userName: 'Ananya Patel',
            rating: 5,
            comment: 'Excellent course! The instructor explains concepts very clearly.',
            date: '2023-10-15'
          },
          {
            id: 2,
            userName: 'Rohan Singh',
            rating: 4,
            comment: 'Great content, but some parts could be more detailed.',
            date: '2023-09-22'
          },
          {
            id: 3,
            userName: 'Kavita Sharma',
            rating: 5,
            comment: 'This course helped me land my first web development job!',
            date: '2023-08-30'
          }
        ]
      };
      
      setCourse(mockCourse);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="error-container">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="btn-primary">
          Back to All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <div className="course-header">
        <div className="course-header-image">
          <img src={course.imageUrl} alt={course.title} />
        </div>
        <div className="course-header-overlay">
          <div className="container">
            <h1>{course.title}</h1>
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
              <div className="meta-item">
                <span className="meta-label">Students:</span>
                <span className="meta-value">{course.enrollmentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="course-body">
        <div className="course-actions">
          <button className="enroll-button">Enroll Now</button>
          <button className="favorite-button">Add to Favorites</button>
        </div>

        <div className="course-description">
          <h2>About This Course</h2>
          <p>{course.description}</p>
        </div>

        <div className="course-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'syllabus' ? 'active' : ''}`}
              onClick={() => setActiveTab('syllabus')}
            >
              Syllabus
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'syllabus' && (
              <div className="syllabus-content">
                <h3>Course Curriculum</h3>
                <div className="syllabus-list">
                  {course.syllabus.map(week => (
                    <div key={week.weekNumber} className="syllabus-item">
                      <div className="week-header">
                        <span className="week-number">Week {week.weekNumber}</span>
                        <h4 className="week-title">{week.title}</h4>
                      </div>
                      <p className="week-description">{week.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Student Reviews</h3>
                <div className="reviews-list">
                  {course.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-author">{review.userName}</span>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`star ${i < review.rating ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 