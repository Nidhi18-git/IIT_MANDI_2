import React from 'react';

const BlogsPage: React.FC = () => {
  const blogs = [
    {
      id: 1,
      title: 'Top 10 In-Demand Skills for 2024',
      author: 'Priya Sharma',
      date: '2024-04-15',
      excerpt: 'Discover the most sought-after skills that employers are looking for in 2024 and how you can acquire them.',
      image: 'https://via.placeholder.com/800x400?text=Skills+2024',
      category: 'Career Insights'
    },
    {
      id: 2,
      title: 'How to Prepare for a Technical Interview',
      author: 'Rahul Kumar',
      date: '2024-04-10',
      excerpt: 'Expert tips and strategies to help you ace your next technical interview and land your dream job.',
      image: 'https://via.placeholder.com/800x400?text=Technical+Interview',
      category: 'Job Preparation'
    },
    {
      id: 3,
      title: 'The Rise of Remote Work: Opportunities and Challenges',
      author: 'Neha Patel',
      date: '2024-04-05',
      excerpt: 'Explore how remote work is reshaping the job market and what it means for job seekers and employers.',
      image: 'https://via.placeholder.com/800x400?text=Remote+Work',
      category: 'Workplace Trends'
    },
    {
      id: 4,
      title: 'Why Continuous Learning is Essential in Today\'s Job Market',
      author: 'Amit Singh',
      date: '2024-03-28',
      excerpt: 'Learn why upskilling and continuous learning have become crucial for career growth and job security.',
      image: 'https://via.placeholder.com/800x400?text=Continuous+Learning',
      category: 'Professional Development'
    },
    {
      id: 5,
      title: 'The Impact of AI on Various Industries',
      author: 'Vikram Mehta',
      date: '2024-03-20',
      excerpt: 'An in-depth analysis of how artificial intelligence is transforming different sectors and creating new job roles.',
      image: 'https://via.placeholder.com/800x400?text=AI+Impact',
      category: 'Technology Trends'
    }
  ];

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1>Skill Development Blogs</h1>
        <p>Insights, advice, and news from the world of skill development and career growth</p>
      </div>

      <div className="blog-categories">
        <button className="category-button active">All</button>
        <button className="category-button">Career Insights</button>
        <button className="category-button">Job Preparation</button>
        <button className="category-button">Technology Trends</button>
        <button className="category-button">Professional Development</button>
        <button className="category-button">Workplace Trends</button>
      </div>

      <div className="featured-blog">
        <div className="featured-blog-image">
          <img src={blogs[0].image} alt={blogs[0].title} />
          <span className="blog-category">{blogs[0].category}</span>
        </div>
        <div className="featured-blog-content">
          <h2>{blogs[0].title}</h2>
          <div className="blog-meta">
            <span className="blog-author">By {blogs[0].author}</span>
            <span className="blog-date">{new Date(blogs[0].date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <p className="blog-excerpt">{blogs[0].excerpt}</p>
          <a href={`/blogs/${blogs[0].id}`} className="read-more-btn">Read Full Article</a>
        </div>
      </div>

      <div className="blogs-grid">
        {blogs.slice(1).map(blog => (
          <div key={blog.id} className="blog-card">
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
              <span className="blog-category">{blog.category}</span>
            </div>
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <div className="blog-meta">
                <span className="blog-author">By {blog.author}</span>
                <span className="blog-date">{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <a href={`/blogs/${blog.id}`} className="read-more-link">Read More</a>
            </div>
          </div>
        ))}
      </div>

      <div className="blog-pagination">
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">Next →</button>
      </div>

      <div className="subscribe-section">
        <h2>Stay Updated with Our Latest Articles</h2>
        <p>Subscribe to our newsletter to receive the latest blogs and updates directly in your inbox.</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default BlogsPage; 