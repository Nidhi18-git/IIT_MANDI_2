import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// TODO: Replace with actual API interface when connecting to Django backend
interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  instructor: string;
  instructorProfile?: string;
  duration: string;
  level: string;
  rating: number;
  reviews?: { id: number; user: string; rating: number; comment: string; date: string }[];
  price: number;
  image: string;
  syllabus?: { id: number; title: string; duration: string; topics: string[] }[];
  requirements?: string[];
  whatYouWillLearn?: string[];
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch course details
  useEffect(() => {
    // TODO: Connect to Django backend API to fetch course details
    // Example:
    // api.courses.getById(id).then(data => {
    //   setCourse(data);
    //   setLoading(false);
    // }).catch(error => {
    //   console.error('Error fetching course details:', error);
    //   setLoading(false);
    // });
    
    // Mock data for now
    const mockCourse: Course = {
      id: parseInt(id || '1'),
      title: 'Complete Web Development Bootcamp',
      description: 'Learn web development with HTML, CSS, JavaScript, React, Node and more.',
      longDescription: 'This comprehensive course will take you from beginner to professional in web development. You will learn how to create responsive websites, interactive applications, and modern user interfaces. The course covers both front-end and back-end technologies, giving you a full-stack skillset that is in high demand in the job market.',
      category: 'IT & Software',
      instructor: 'John Doe',
      instructorProfile: 'Senior Web Developer with 10+ years of experience. Has taught over 50,000 students worldwide.',
      duration: '40 hours',
      level: 'Beginner',
      rating: 4.7,
      reviews: [
        { id: 1, user: 'Rahul Singh', rating: 5, comment: 'Amazing course! I learned so much and was able to build my own website by the end.', date: '2023-04-15' },
        { id: 2, user: 'Priya Sharma', rating: 4, comment: 'Very comprehensive. Sometimes moves a bit fast but overall excellent.', date: '2023-03-22' },
        { id: 3, user: 'Amit Patel', rating: 5, comment: 'Best web development course I have taken. The instructor explains concepts clearly.', date: '2023-02-18' }
      ],
      price: 499,
      image: 'https://via.placeholder.com/800x400',
      syllabus: [
        { id: 1, title: 'Introduction to HTML', duration: '3 hours', topics: ['Basic HTML structure', 'HTML5 semantics', 'Forms and inputs'] },
        { id: 2, title: 'CSS & Responsive Design', duration: '5 hours', topics: ['CSS selectors', 'Flexbox', 'Grid', 'Media queries'] },
        { id: 3, title: 'JavaScript Fundamentals', duration: '8 hours', topics: ['Variables', 'Functions', 'DOM manipulation', 'Events'] },
        { id: 4, title: 'React JS', duration: '10 hours', topics: ['Components', 'State & Props', 'Hooks', 'Context API'] },
        { id: 5, title: 'Backend Development', duration: '8 hours', topics: ['Node.js', 'Express', 'RESTful APIs', 'MongoDB'] },
        { id: 6, title: 'Deployment & Best Practices', duration: '6 hours', topics: ['Git & GitHub', 'Heroku', 'Netlify', 'Performance optimization'] }
      ],
      requirements: [
        'Basic computer skills',
        'No prior programming knowledge required',
        'Computer with internet connection',
        'Desire to learn and practice'
      ],
      whatYouWillLearn: [
        'Build responsive websites using HTML, CSS and JavaScript',
        'Create dynamic web applications with React',
        'Develop backend APIs with Node.js and Express',
        'Connect to databases like MongoDB',
        'Deploy your applications to production',
        'Implement authentication and authorization'
      ]
    };
    
    setTimeout(() => {
      setCourse(mockCourse);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleEnroll = () => {
    // TODO: Connect to Django backend for enrollment
    // Example:
    // setEnrolling(true);
    // api.enrollments.create(id).then(response => {
    //   navigate('/my-courses');
    // }).catch(error => {
    //   console.error('Enrollment failed:', error);
    //   setEnrolling(false);
    // });
    
    setEnrolling(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="btn btn-primary mt-3">Browse All Courses</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* Course Header */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-secondary mb-2">{course.category}</span>
              <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
              <p className="lead mb-3">{course.description}</p>
              <div className="d-flex align-items-center mb-3">
                <span className="me-3">
                  <span className="text-warning">★</span> {course.rating}
                </span>
                <span className="me-3">|</span>
                <span className="me-3">{course.level}</span>
                <span className="me-3">|</span>
                <span>{course.duration}</span>
              </div>
              <p className="mb-0">Instructor: <strong>{course.instructor}</strong></p>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="card shadow">
                <img src={course.image} className="card-img-top" alt={course.title} />
                <div className="card-body">
                  <h3 className="text-primary mb-3">₹{course.price}</h3>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Processing...' : 'Enroll Now'}
                    </button>
                    <button className="btn btn-outline-primary">Add to Wishlist</button>
                  </div>
                  <hr />
                  <h6 className="mb-3">This course includes:</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="bi bi-play-circle me-2"></i> {course.duration} of video content</li>
                    <li className="mb-2"><i className="bi bi-file-earmark-text me-2"></i> Downloadable resources</li>
                    <li className="mb-2"><i className="bi bi-trophy me-2"></i> Certificate of completion</li>
                    <li className="mb-2"><i className="bi bi-phone me-2"></i> Access on mobile and TV</li>
                    <li><i className="bi bi-infinity me-2"></i> Full lifetime access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Tabs */}
      <div className="bg-light py-4">
        <div className="container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'syllabus' ? 'active' : ''}`}
                onClick={() => setActiveTab('syllabus')}
              >
                Syllabus
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'instructor' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructor')}
              >
                Instructor
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container py-5">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="mb-4">About This Course</h3>
                <p className="mb-4">{course.longDescription}</p>

                <h4 className="mb-3">What You'll Learn</h4>
                <div className="row mb-4">
                  {course.whatYouWillLearn?.map((item, index) => (
                    <div className="col-md-6 mb-2" key={index}>
                      <div className="d-flex">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="mb-3">Requirements</h4>
                <ul className="mb-4">
                  {course.requirements?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div className="tab-content">
            <h3 className="mb-4">Course Content</h3>
            <p className="mb-4">
              {course.syllabus?.length} sections • {course.duration} total length
            </p>

            <div className="accordion" id="courseSyllabus">
              {course.syllabus?.map((section) => (
                <div className="accordion-item" key={section.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#section-${section.id}`}
                    >
                      <div className="w-100 d-flex justify-content-between">
                        <span>{section.title}</span>
                        <span className="text-muted ms-2">{section.duration}</span>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`section-${section.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#courseSyllabus"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        {section.topics.map((topic, index) => (
                          <li className="list-group-item d-flex align-items-center" key={index}>
                            <i className="bi bi-play-circle me-3"></i>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructor Tab */}
        {activeTab === 'instructor' && (
          <div className="tab-content">
            <h3 className="mb-4">Instructor</h3>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt={course.instructor} 
                      className="rounded-circle me-3"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div>
                    <h4 className="mb-1">{course.instructor}</h4>
                    <p className="text-muted mb-3">Web Development Instructor</p>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <span className="me-3">{course.rating} Instructor Rating</span>
                      <i className="bi bi-people-fill me-1"></i>
                      <span>50,000+ Students</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-play-circle-fill me-1"></i>
                      <span className="me-3">15 Courses</span>
                      <i className="bi bi-chat-fill me-1"></i>
                      <span>2,500+ Reviews</span>
                    </div>
                  </div>
                </div>
                <p className="mb-0">{course.instructorProfile}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Student Reviews</h3>
              <div>
                <span className="text-warning h4 me-2">★</span>
                <span className="h4 me-2">{course.rating}</span>
                <span className="text-muted">({course.reviews?.length} reviews)</span>
              </div>
            </div>

            {course.reviews?.map((review) => (
              <div className="card mb-3" key={review.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title">{review.user}</h5>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-warning">
                          {i < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="card-text">{review.comment}</p>
                  <p className="card-text">
                    <small className="text-muted">Reviewed on {review.date}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Courses - Would fetch from Django backend in real implementation */}
      <div className="bg-light py-5">
        <div className="container">
          <h3 className="mb-4">Similar Courses</h3>
          <div className="row g-4">
            {[1, 2, 3].map((num) => (
              <div className="col-md-4" key={num}>
                <div className="card h-100">
                  <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={`Similar Course ${num}`} />
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-secondary">IT & Software</span>
                      <span className="text-warning">★ 4.5</span>
                    </div>
                    <h5 className="card-title">Similar Course {num}</h5>
                    <p className="card-text text-truncate">This is a similar course that you might be interested in.</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-primary fw-bold">₹399</span>
                      <span className="text-muted small">30 hours</span>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    <div className="d-grid">
                      <Link to={`/courses/${course.id + num}`} className="btn btn-outline-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 