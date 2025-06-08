import axios from 'axios';

// Update URL to point to our Django backend
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to login page if needed
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth service
const authService = {
  // Student login
  loginStudent: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/api/login/student/', credentials);
    return response.data;
  },

  // Admin login
  loginAdmin: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/api/login/admin/', credentials);
    return response.data;
  },

  // Student registration
  registerStudent: async (userData: { username: string; email: string; password: string }) => {
    const response = await apiClient.post('/api/register/student/', userData);
    return response.data;
  },

  // Admin registration
  registerAdmin: async (userData: { username: string; email: string; password: string }) => {
    const response = await apiClient.post('/api/register/admin/', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout/');
    localStorage.removeItem('authToken');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me/');
    return response.data;
  },

  // Google Login
  googleLogin: async (data: { credential: string; role: 'student' | 'admin' }) => {
    const response = await apiClient.post('/api/auth/google/', data);
    return response.data;
  },
};

// User profile service
const userService = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile/');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/users/profile/', profileData);
    return response.data;
  },
  
  updatePassword: async (passwordData: { 
    current_password: string; 
    new_password: string; 
    confirm_password: string;
  }) => {
    const response = await apiClient.post('/users/change-password/', passwordData);
    return response.data;
  },
  
  getAllUsers: async () => {
    const response = await apiClient.get('/users/');
    return response.data;
  },
  
  createNewUser: async (userData: { username: string; email: string }) => {
    const response = await apiClient.post('/users/', userData);
    return response.data;
  },
  
  getUserById: async (userId: string) => {
    const response = await apiClient.get(`/users/${userId}/`);
    return response.data;
  },
};

// Courses service
const coursesService = {
  getAll: async (params?: { 
    search?: string; 
    category?: string; 
    level?: string;
    page?: number;
    page_size?: number;
  }) => {
    const response = await apiClient.get('/courses/', { params });
    return response.data;
  },
  
  getById: async (id: string | number) => {
    const response = await apiClient.get(`/courses/${id}/`);
    return response.data;
  },
  
  getEnrolledCourses: async () => {
    const response = await apiClient.get('/courses/enrolled/');
    return response.data;
  },
  
  getCategories: async () => {
    const response = await apiClient.get('/courses/categories/');
    return response.data;
  },
};

// Enrollments service
const enrollmentsService = {
  enroll: async (courseId: string | number) => {
    const response = await apiClient.post(`/enrollments/`, { course_id: courseId });
    return response.data;
  },
  
  trackProgress: async (enrollmentId: string | number, data: { completed_lesson_id: number }) => {
    const response = await apiClient.post(`/enrollments/${enrollmentId}/progress/`, data);
    return response.data;
  },
};

// Certificates service
const certificatesService = {
  getAll: async () => {
    const response = await apiClient.get('/certificates/');
    return response.data;
  },
  
  getById: async (id: string | number) => {
    const response = await apiClient.get(`/certificates/${id}/`);
    return response.data;
  },
  
  download: async (id: string | number) => {
    const response = await apiClient.get(`/certificates/${id}/download/`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

// Ratings and reviews service
const reviewsService = {
  getForCourse: async (courseId: string | number) => {
    const response = await apiClient.get(`/courses/${courseId}/reviews/`);
    return response.data;
  },
  
  create: async (courseId: string | number, reviewData: { rating: number; comment: string }) => {
    const response = await apiClient.post(`/courses/${courseId}/reviews/`, reviewData);
    return response.data;
  },
  
  update: async (reviewId: string | number, reviewData: { rating: number; comment: string }) => {
    const response = await apiClient.put(`/reviews/${reviewId}/`, reviewData);
    return response.data;
  },
  
  delete: async (reviewId: string | number) => {
    const response = await apiClient.delete(`/reviews/${reviewId}/`);
    return response.data;
  },
};

// Export all API services
const api = {
  auth: authService,
  user: userService,
  courses: coursesService,
  enrollments: enrollmentsService,
  certificates: certificatesService,
  reviews: reviewsService,
};

export default api; 


