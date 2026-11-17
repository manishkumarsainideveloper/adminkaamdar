import React, { useState } from 'react';
import { Plus, Search, MoreVertical, HelpCircle } from 'lucide-react';
import './FAQs.css';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { id: 'FAQ-01', question: 'How to cancel a booking?', category: 'Booking', date: '24 Oct 2026', status: 'Published' },
    { id: 'FAQ-02', question: 'What is the refund policy?', category: 'Payments', date: '22 Oct 2026', status: 'Published' },
    { id: 'FAQ-03', question: 'How to become a provider?', category: 'Provider', date: '20 Oct 2026', status: 'Draft' },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      f.question.toLowerCase().includes(searchLower) ||
      f.category.toLowerCase().includes(searchLower) ||
      f.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>FAQs</h1><p>Manage Frequently Asked Questions for customers.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add FAQ</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search FAQ by Question or Category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Question</th><th>Category</th><th>Last Updated</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((f, i) => (
                  <tr key={i}>
                    <td className="text-gray">{f.id}</td>
                    <td>
                      <div className="cell-with-icon">
                        <HelpCircle size={16} className="text-purple"/> <span className="font-semibold text-dark">{f.question}</span>
                      </div>
                    </td>
                    <td>{f.category}</td>
                    <td className="text-gray">{f.date}</td>
                    <td><span className={`status-badge ${f.status === 'Published' ? 'status-green' : 'status-orange'}`}>{f.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No FAQs found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FAQs;