import React, { useState } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import './ServicesList.css';

const ServicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    { id: 'SRV-101', name: 'AC Installation', category: 'AC Service', price: '₹899', status: 'Active' },
    { id: 'SRV-102', name: 'AC Gas Refill', category: 'AC Service', price: '₹1,499', status: 'Active' },
    { id: 'SRV-103', name: 'Deep Home Cleaning', category: 'Home Cleaning', price: '₹2,499', status: 'Active' },
    { id: 'SRV-104', name: 'Bathroom Cleaning', category: 'Home Cleaning', price: '₹499', status: 'Active' },
    { id: 'SRV-105', name: 'Tap Repair', category: 'Plumbing', price: '₹199', status: 'Inactive' },
  ];

  const filteredServices = services.filter((s) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      s.id.toLowerCase().includes(searchLower) ||
      s.name.toLowerCase().includes(searchLower) ||
      s.category.toLowerCase().includes(searchLower) ||
      s.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Services</h1><p>Manage all individual services offered under categories.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Service</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Service by Name, Category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Service Name</th><th>Category</th><th>Base Price</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((s, i) => (
                  <tr key={i}>
                    <td className="text-gray">{s.id}</td>
                    <td className="font-semibold text-dark">{s.name}</td>
                    <td>{s.category}</td>
                    <td className="font-semibold">{s.price}</td>
                    <td><span className={`status-badge ${s.status === 'Active' ? 'status-green' : 'status-red'}`}>{s.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No services found for "{searchTerm}"
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
export default ServicesList;