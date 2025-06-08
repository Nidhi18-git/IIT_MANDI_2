import React from 'react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="resources-page">
      <div className="page-header">
        <h1>Learning Resources</h1>
        <p>Access our collection of valuable resources to enhance your learning journey</p>
      </div>

      <div className="resources-categories">
        <div className="category-tabs">
          <button className="category-tab active">All Resources</button>
          <button className="category-tab">E-Books</button>
          <button className="category-tab">Video Tutorials</button>
          <button className="category-tab">Cheat Sheets</button>
          <button className="category-tab">Practice Projects</button>
        </div>
      </div>

      <div className="resources-grid">
        <div className="resource-card">
          <div className="resource-icon">📕</div>
          <div className="resource-content">
            <h3>Web Development Fundamentals</h3>
            <p>A comprehensive guide to HTML, CSS, and JavaScript for beginners.</p>
            <div className="resource-meta">
              <span className="resource-type">E-Book</span>
              <span className="resource-size">8.5 MB</span>
            </div>
            <a href="#" className="download-btn">Download PDF</a>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon">🎬</div>
          <div className="resource-content">
            <h3>Data Science Tutorial Series</h3>
            <p>A complete video series covering data analysis, visualization, and machine learning.</p>
            <div className="resource-meta">
              <span className="resource-type">Video Course</span>
              <span className="resource-duration">12 hours</span>
            </div>
            <a href="#" className="watch-btn">Watch Now</a>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon">📋</div>
          <div className="resource-content">
            <h3>SQL Cheat Sheet</h3>
            <p>Quick reference guide for common SQL commands and operations.</p>
            <div className="resource-meta">
              <span className="resource-type">Cheat Sheet</span>
              <span className="resource-size">2.1 MB</span>
            </div>
            <a href="#" className="download-btn">Download PDF</a>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon">💻</div>
          <div className="resource-content">
            <h3>E-Commerce Website Project</h3>
            <p>Hands-on project to build a complete e-commerce website with shopping cart functionality.</p>
            <div className="resource-meta">
              <span className="resource-type">Practice Project</span>
              <span className="resource-level">Intermediate</span>
            </div>
            <a href="#" className="view-btn">View Project</a>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon">📕</div>
          <div className="resource-content">
            <h3>Digital Marketing Essentials</h3>
            <p>A guide to SEO, content marketing, social media, and digital advertising strategies.</p>
            <div className="resource-meta">
              <span className="resource-type">E-Book</span>
              <span className="resource-size">10.2 MB</span>
            </div>
            <a href="#" className="download-btn">Download PDF</a>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon">🎬</div>
          <div className="resource-content">
            <h3>Interview Preparation Masterclass</h3>
            <p>Learn effective techniques to succeed in technical and behavioral interviews.</p>
            <div className="resource-meta">
              <span className="resource-type">Video Course</span>
              <span className="resource-duration">6 hours</span>
            </div>
            <a href="#" className="watch-btn">Watch Now</a>
          </div>
        </div>
      </div>

      <div className="resource-pagination">
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">Next →</button>
      </div>

      <div className="resource-request">
        <h2>Need Specific Resources?</h2>
        <p>Can't find what you're looking for? Request additional learning materials.</p>
        <button className="request-button">Request Resource</button>
      </div>
    </div>
  );
};

export default ResourcesPage; 