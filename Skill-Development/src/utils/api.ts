import { connectToDatabase, findUserByEmail, createUser } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // In production, this should be environment variable

// Mock API endpoint for login
export async function loginUser(email: string, password: string, role: 'student' | 'admin') {
  try {
    const user = await findUserByEmail(email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.role !== role) {
      return { success: false, message: 'Invalid role' };
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return { success: false, message: 'Invalid password' };
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return {
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Server error' };
  }
}

// Mock API endpoint for registration
export async function registerUser(name: string, email: string, password: string, role: 'student' | 'admin') {
  try {
    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };
    
    const result = await createUser(newUser);
    
    if (!result) {
      return { success: false, message: 'Error creating user' };
    }
    
    const token = jwt.sign(
      { id: result.insertedId, email, role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return {
      success: true,
      user: {
        _id: result.insertedId,
        name,
        email,
        role,
      },
      token,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Server error' };
  }
}

// Mock API endpoint for Google login
export async function googleLogin(token: string, role: 'student' | 'admin') {
  try {
    // In a real implementation, you would verify the Google token
    // and extract user info from it
    
    // For demo purposes, let's create a mock user
    const mockUser = {
      _id: 'google_user_123',
      name: 'Google User',
      email: 'google@example.com',
      role,
    };
    
    const jwtToken = jwt.sign(
      { id: mockUser._id, email: mockUser.email, role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return {
      success: true,
      user: mockUser,
      token: jwtToken,
    };
  } catch (error) {
    console.error('Google login error:', error);
    return { success: false, message: 'Server error' };
  }
} 