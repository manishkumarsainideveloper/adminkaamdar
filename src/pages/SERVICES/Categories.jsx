import React from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 'CAT-01', name: 'AC Service & Repair', services: 12, status: 'Active' },
    { id: 'CAT-02', name: 'Home Cleaning', services: 8, status: 'Active' },
    { id: 'CAT-03', name: 'Plumbing', services: 15, status: 'Active' },
    { id: 'CAT-04', name: 'Electrical', services: 10, status: 'Inactive' },
    { id: 'CAT-05', name: 'Appliance Repair', services: 6, status: 'Active' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Service Categories</h1><p>Manage top-level service categories for the platform.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Category</button>
      </div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Category..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Category Name</th><th>Total Services</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={i}>
                  <td className="text-gray">{c.id}</td>
                  <td className="font-semibold text-dark">{c.name}</td>
                  <td>{c.services}</td>
                  <td><span className={`status-badge ${c.status === 'Active' ? 'status-green' : 'status-red'}`}>{c.status}</span></td>
                  <td><button className="icon-btn"><MoreVertical size={18}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Categories;