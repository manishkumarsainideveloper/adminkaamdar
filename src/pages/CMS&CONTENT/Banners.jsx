import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Image as ImageIcon } from 'lucide-react';
import './Banners.css';

const Banners = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const banners = [
    { id: 'BNR-01', title: 'Diwali Special Offer', position: 'Home Top', date: '20 Oct 2026', status: 'Published' },
    { id: 'BNR-02', title: 'AC Service 20% Off', position: 'Home Middle', date: '22 Oct 2026', status: 'Published' },
    { id: 'BNR-03', title: 'Refer & Earn', position: 'App Popup', date: '24 Oct 2026', status: 'Draft' },
  ];

  const filteredBanners = banners.filter((banner) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      banner.id.toLowerCase().includes(searchLower) ||
      banner.title.toLowerCase().includes(searchLower) ||
      banner.position.toLowerCase().includes(searchLower) ||
      banner.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Banners</h1><p>Manage promotional banners for the app.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Banner</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Banner by Title, Position..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th><th>Banner Title</th><th>Position</th>
                <th>Last Updated</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.length > 0 ? (
                filteredBanners.map((b, i) => (
                  <tr key={i}>
                    <td className="text-gray">{b.id}</td>
                    <td>
                      <div className="cell-with-icon">
                        <ImageIcon size={16} className="text-blue"/> <span className="font-semibold text-dark">{b.title}</span>
                      </div>
                    </td>
                    <td>{b.position}</td>
                    <td className="text-gray">{b.date}</td>
                    <td><span className={`status-badge ${b.status === 'Published' ? 'status-green' : 'status-orange'}`}>{b.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No banners found for "{searchTerm}"
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

export default Banners;