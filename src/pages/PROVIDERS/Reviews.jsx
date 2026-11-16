import React from 'react';
import { Star, Search } from 'lucide-react';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    { customer: 'Rahul Sharma', provider: 'Rakesh Kumar', rating: 5, text: "Very professional service. AC is working perfectly now.", date: '24 Oct 2026' },
    { customer: 'Priya Mehta', provider: 'Amit Sharma', rating: 4, text: "Good cleaning, but arrived 10 mins late.", date: '23 Oct 2026' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Reviews & Ratings</h1><p>Monitor customer feedback and quality.</p></div>
      </div>
      <div className="card table-card" style={{ padding: '24px' }}>
        <div className="search-box" style={{ marginBottom: '24px' }}><Search size={18} className="search-icon" /><input type="text" placeholder="Search by Provider or Customer..." /></div>
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-header">
                <div><h3>{r.customer}</h3><p>To: {r.provider}</p></div>
                <div className="stars">{[...Array(5)].map((_, index) => <Star key={index} size={16} fill={index < r.rating ? "#f59e0b" : "none"} color="#f59e0b" />)}</div>
              </div>
              <p className="review-text">"{r.text}"</p>
              <span className="review-date">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Reviews;