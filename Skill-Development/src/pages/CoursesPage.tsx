import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: Replace with actual API interface when connecting to Django backend
interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  price: number;
  image: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
  // Mock categories and levels - would come from API in real implementation
  const categories = ['IT & Software', 'Business', 'Design', 'Marketing', 'Personal Development'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Fetch courses from API
  useEffect(() => {
    // TODO: Connect to Django backend API to fetch courses
    // Example:
    // api.courses.getAll().then(data => {
    //   setCourses(data);
    //   setLoading(false);
    // }).catch(error => {
    //   console.error('Error fetching courses:', error);
    //   setLoading(false);
    // });
    
    // Mock data for now
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development with HTML, CSS, JavaScript, React, Node and more.',
        category: 'IT & Software',
        instructor: 'John Doe',
        duration: '40 hours',
        level: 'Beginner',
        rating: 4.7,
        price: 499,
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 2,
        title: 'Advanced React & Redux',
        description: 'Take your React skills to the next level with Redux and advanced patterns.',
        category: 'IT & Software',
        instructor: 'Jane Smith',
        duration: '25 hours',
        level: 'Advanced',
        rating: 4.9,
        price: 699,
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 3,
        title: 'Business Analytics Fundamentals',
        description: 'Learn how to analyze business data to make better decisions.',
        category: 'Business',
        instructor: 'Michael Johnson',
        duration: '30 hours',
        level: 'Intermediate',
        rating: 4.5,
        price: 599,
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 4,
        title: 'UI/UX Design Masterclass',
        description: 'Create beautiful user interfaces with modern design principles.',
        category: 'Design',
        instructor: 'Sarah Wilson',
        duration: '35 hours',
        level: 'All Levels',
        rating: 4.8,
        price: 649,
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 5,
        title: 'Digital Marketing Strategy',
        description: 'Learn effective digital marketing strategies for growth.',
        category: 'Marketing',
        instructor: 'David Brown',
        duration: '20 hours',
        level: 'Beginner',
        rating: 4.6,
        price: 549,
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 6,
        title: 'Leadership and Management Skills',
        description: 'Develop essential leadership skills for the modern workplace.',
        category: 'Personal Development',
        instructor: 'Emily Clark',
        duration: '15 hours',
        level: 'Intermediate',
        rating: 4.4,
        price: 399,
        image: 'https://via.placeholder.com/300x200'
      }
    ];
    
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || course.category === selectedCategory) &&
      (selectedLevel === '' || course.level === selectedLevel)
    );
  });

  return (
    <div className="courses-page py-5">
      <div className="container">
        <h1 className="mb-4">Explore Courses</h1>
        
        {/* Search and Filters */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Course Listings */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading courses...</p>
          </div>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              <div className="row g-4">
                {filteredCourses.map(course => (
                  <div key={course.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm hover-shadow">
                      <img src={course.image} className="card-img-top" alt={course.title} />
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="badge bg-secondary">{course.category}</span>
                          <span className="text-warning">★ {course.rating}</span>
                        </div>
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text text-truncate">{course.description}</p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span className="text-primary fw-bold">₹{course.price}</span>
                          <span className="text-muted small">{course.duration}</span>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top-0">
                        <div className="d-grid">
                          <Link to={`/courses/${course.id}`} className="btn btn-outline-primary">View Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="lead">No courses found matching your criteria.</p>
                <button 
                  className="btn btn-outline-primary mt-3"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedLevel('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 