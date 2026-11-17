import React, { useState } from 'react';
import { Plus, Search, MoreVertical, FileText } from 'lucide-react';
import './Pages.css';

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    { id: 'PG-01', title: 'Privacy Policy', slug: '/privacy', date: '01 Oct 2026', status: 'Published' },
    { id: 'PG-02', title: 'Terms & Conditions', slug: '/terms', date: '01 Oct 2026', status: 'Published' },
    { id: 'PG-03', title: 'About Us', slug: '/about', date: '15 Oct 2026', status: 'Published' },
  ];

  const filteredPages = pages.filter((p) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(searchLower) ||
      p.slug.toLowerCase().includes(searchLower) ||
      p.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Static Pages</h1><p>Manage content for app/web pages.</p></div>
        <button className="btn-primary"><Plus size={18}/> Create Page</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Page by Title or Slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Page Title</th><th>Slug / URL</th><th>Last Updated</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredPages.length > 0 ? (
                filteredPages.map((p, i) => (
                  <tr key={i}>
                    <td className="text-gray">{p.id}</td>
                    <td>
                      <div className="cell-with-icon">
                        <FileText size={16} className="text-gray"/> <span className="font-semibold text-dark">{p.title}</span>
                      </div>
                    </td>
                    <td className="text-blue">{p.slug}</td>
                    <td className="text-gray">{p.date}</td>
                    <td><span className={`status-badge ${p.status === 'Published' ? 'status-green' : 'status-orange'}`}>{p.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No pages found for "{searchTerm}"
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
export default Pages;