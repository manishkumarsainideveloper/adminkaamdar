import React, { useState } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import './SubServices.css';

const SubServices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const subServices = [
    { id: 'SUB-01', name: 'Split AC Installation', parent: 'AC Installation', price: '₹1,199', status: 'Active' },
    { id: 'SUB-02', name: 'Window AC Installation', parent: 'AC Installation', price: '₹699', status: 'Active' },
    { id: 'SUB-03', name: '1.5 Ton Gas Refill', parent: 'AC Gas Refill', price: '₹1,499', status: 'Active' },
    { id: 'SUB-04', name: 'Deep Clean Sofa', parent: 'Home Cleaning', price: '₹999', status: 'Inactive' },
  ];

  const filteredSubServices = subServices.filter((s) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      s.id.toLowerCase().includes(searchLower) ||
      s.name.toLowerCase().includes(searchLower) ||
      s.parent.toLowerCase().includes(searchLower) ||
      s.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Sub Services</h1><p>Manage detailed sub-services and variants.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Sub-Service</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Sub-Service by Name, Parent..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Sub-Service Name</th><th>Parent Service</th><th>Price</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredSubServices.length > 0 ? (
                filteredSubServices.map((s, i) => (
                  <tr key={i}>
                    <td className="text-gray">{s.id}</td>
                    <td className="font-semibold text-dark">{s.name}</td>
                    <td>{s.parent}</td>
                    <td className="font-semibold">{s.price}</td>
                    <td><span className={`status-badge ${s.status === 'Active' ? 'status-green' : 'status-red'}`}>{s.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No sub-services found for "{searchTerm}"
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
export default SubServices;