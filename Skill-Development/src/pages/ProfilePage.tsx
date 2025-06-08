import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: Replace with actual API interfaces when connecting to Django backend
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture: string;
  location: string;
  joinedDate: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

interface EnrolledCourse {
  id: number;
  title: string;
  category: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  image: string;
  instructor: string;
  lastAccessed: string;
}

interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  courseId: number;
  downloadUrl: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  // Fetch user profile data
  useEffect(() => {
    // TODO: Connect to Django backend API to fetch user profile and enrolled courses
    // Example:
    // Promise.all([
    //   api.user.getProfile(),
    //   api.courses.getEnrolledCourses(),
    //   api.certificates.getAll()
    // ]).then(([profileData, coursesData, certificatesData]) => {
    //   setProfile(profileData);
    //   setEnrolledCourses(coursesData);
    //   setCertificates(certificatesData);
    //   setFormData(profileData);
    //   setLoading(false);
    // }).catch(error => {
    //   console.error('Error fetching profile data:', error);
    //   setLoading(false);
    // });

    // Mock data for now
    const mockProfile: UserProfile = {
      id: 1,
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
      bio: 'Software developer passionate about learning new technologies and building innovative solutions.',
      profilePicture: 'https://via.placeholder.com/150',
      location: 'Bangalore, India',
      joinedDate: '2023-01-15',
      skills: ['JavaScript', 'React', 'Python', 'Django', 'HTML/CSS'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/rahulsharma',
        github: 'https://github.com/rahulsharma',
        twitter: 'https://twitter.com/rahulsharma',
      }
    };

    const mockEnrolledCourses: EnrolledCourse[] = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        category: 'IT & Software',
        progress: 65,
        completedLessons: 26,
        totalLessons: 40,
        image: 'https://via.placeholder.com/300x200',
        instructor: 'John Doe',
        lastAccessed: '2023-05-18'
      },
      {
        id: 2,
        title: 'Advanced React & Redux',
        category: 'IT & Software',
        progress: 30,
        completedLessons: 8,
        totalLessons: 25,
        image: 'https://via.placeholder.com/300x200',
        instructor: 'Jane Smith',
        lastAccessed: '2023-05-15'
      },
      {
        id: 3,
        title: 'UI/UX Design Masterclass',
        category: 'Design',
        progress: 100,
        completedLessons: 35,
        totalLessons: 35,
        image: 'https://via.placeholder.com/300x200',
        instructor: 'Sarah Wilson',
        lastAccessed: '2023-05-10'
      }
    ];

    const mockCertificates: Certificate[] = [
      {
        id: 1,
        title: 'UI/UX Design Masterclass',
        issueDate: '2023-04-20',
        courseId: 3,
        downloadUrl: '#'
      },
      {
        id: 2,
        title: 'Python for Beginners',
        issueDate: '2023-03-15',
        courseId: 4,
        downloadUrl: '#'
      }
    ];

    setTimeout(() => {
      setProfile(mockProfile);
      setEnrolledCourses(mockEnrolledCourses);
      setCertificates(mockCertificates);
      setFormData(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    // TODO: Connect to Django backend to update profile
    // Example:
    // api.user.updateProfile(formData).then(response => {
    //   setProfile({...profile, ...formData});
    //   setEditMode(false);
    // }).catch(error => {
    //   console.error('Error updating profile:', error);
    // });

    // For now, just update the state
    setProfile({...profile, ...formData} as UserProfile);
    setEditMode(false);
  };

  const handleAddSkill = (skill: string) => {
    if (profile && skill.trim() !== '' && !profile.skills.includes(skill)) {
      const updatedSkills = [...profile.skills, skill];
      setProfile({...profile, skills: updatedSkills});
      setFormData({...formData, skills: updatedSkills});
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (profile) {
      const updatedSkills = profile.skills.filter(skill => skill !== skillToRemove);
      setProfile({...profile, skills: updatedSkills});
      setFormData({...formData, skills: updatedSkills});
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-5 text-center">
        <h2>Profile not found</h2>
        <p>Please log in to view your profile.</p>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-page py-5">
      <div className="container">
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <img 
                  src={profile.profilePicture} 
                  alt={`${profile.firstName} ${profile.lastName}`} 
                  className="rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p className="text-muted">{profile.location}</p>
                <p className="mb-1">
                  <small className="text-muted">Member since {new Date(profile.joinedDate).toLocaleDateString()}</small>
                </p>
                
                {!editMode && (
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
                
                {/* Social Links */}
                {!editMode && profile.socialLinks && (
                  <div className="social-links mt-3">
                    {profile.socialLinks.linkedin && (
                      <a href={profile.socialLinks.linkedin} className="btn btn-outline-secondary me-2" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    )}
                    {profile.socialLinks.github && (
                      <a href={profile.socialLinks.github} className="btn btn-outline-secondary me-2" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    {profile.socialLinks.twitter && (
                      <a href={profile.socialLinks.twitter} className="btn btn-outline-secondary me-2" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                      </a>
                    )}
                    {profile.socialLinks.website && (
                      <a href={profile.socialLinks.website} className="btn btn-outline-secondary" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-globe"></i>
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              {!editMode && (
                <div className="card-body border-top">
                  <h5 className="card-title">About</h5>
                  <p>{profile.bio}</p>
                  
                  <h5 className="card-title mt-4">Contact</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      {profile.email}
                    </li>
                    <li>
                      <i className="bi bi-phone me-2"></i>
                      {profile.phone}
                    </li>
                  </ul>
                  
                  <h5 className="card-title mt-4">Skills</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="badge bg-primary">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Edit Profile Form */}
              {editMode && (
                <div className="card-body border-top">
                  <h5 className="card-title mb-3">Edit Profile</h5>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">About</label>
                      <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio || ''}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="d-flex gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setEditMode(false);
                          setFormData(profile);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
                      onClick={() => setActiveTab('courses')}
                    >
                      My Courses
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'certificates' ? 'active' : ''}`}
                      onClick={() => setActiveTab('certificates')}
                    >
                      Certificates
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="card-body">
                {/* My Courses Tab */}
                {activeTab === 'courses' && (
                  <>
                    <h4 className="mb-4">Enrolled Courses</h4>
                    {enrolledCourses.length > 0 ? (
                      <>
                        {enrolledCourses.map(course => (
                          <div className="card mb-3" key={course.id}>
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img 
                                  src={course.image} 
                                  className="img-fluid rounded-start h-100 object-fit-cover" 
                                  alt={course.title} 
                                />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title">{course.title}</h5>
                                  <p className="card-text">
                                    <small className="text-muted">
                                      Instructor: {course.instructor} • Category: {course.category}
                                    </small>
                                  </p>
                                  <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                      <span>Progress: {course.progress}%</span>
                                      <span className="text-muted small">
                                        {course.completedLessons}/{course.totalLessons} lessons
                                      </span>
                                    </div>
                                    <div className="progress">
                                      <div 
                                        className="progress-bar" 
                                        role="progressbar" 
                                        style={{ width: `${course.progress}%` }}
                                        aria-valuenow={course.progress} 
                                        aria-valuemin={0} 
                                        aria-valuemax={100}
                                      ></div>
                                    </div>
                                  </div>
                                  <p className="card-text">
                                    <small className="text-muted">
                                      Last accessed on {new Date(course.lastAccessed).toLocaleDateString()}
                                    </small>
                                  </p>
                                  <Link to={`/courses/${course.id}`} className="btn btn-primary">
                                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p>You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="btn btn-primary mt-2">Browse Courses</Link>
                      </div>
                    )}
                  </>
                )}
                
                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                  <>
                    <h4 className="mb-4">Your Certificates</h4>
                    {certificates.length > 0 ? (
                      <div className="row g-4">
                        {certificates.map(certificate => (
                          <div className="col-md-6" key={certificate.id}>
                            <div className="card border">
                              <div className="card-body">
                                <h5 className="card-title">{certificate.title}</h5>
                                <p className="card-text">
                                  <small className="text-muted">
                                    Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                                  </small>
                                </p>
                                <div className="d-flex gap-2">
                                  <a href={certificate.downloadUrl} className="btn btn-outline-primary">
                                    <i className="bi bi-download me-1"></i> Download
                                  </a>
                                  <Link to={`/courses/${certificate.courseId}`} className="btn btn-outline-secondary">
                                    View Course
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p>You haven't earned any certificates yet.</p>
                        <p className="text-muted">Complete a course to earn a certificate.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 