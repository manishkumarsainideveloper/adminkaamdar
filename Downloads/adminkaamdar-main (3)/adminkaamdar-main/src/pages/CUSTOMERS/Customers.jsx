import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Mail, Phone } from 'lucide-react';
import './Customers.css';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const customersData = [
    { id: 'CUST-001', name: 'Rahul Sharma', email: 'rahul.s@gmail.com', phone: '+91 98765 43210', bookings: 12, spent: '₹4,500', status: 'Active', joined: '12 Jan 2026' },
    { id: 'CUST-002', name: 'Priya Mehta', email: 'priya.m@yahoo.com', phone: '+91 87654 32109', bookings: 5, spent: '₹1,250', status: 'Active', joined: '05 Feb 2026' },
    { id: 'CUST-003', name: 'Amit Verma', email: 'amit.verma@gmail.com', phone: '+91 76543 21098', bookings: 0, spent: '₹0', status: 'Inactive', joined: '20 Mar 2026' },
    { id: 'CUST-004', name: 'Sneha Gupta', email: 'sneha.g@hotmail.com', phone: '+91 65432 10987', bookings: 8, spent: '₹3,200', status: 'Active', joined: '15 Apr 2026' },
    { id: 'CUST-005', name: 'Vikram Singh', email: 'vikram.s@gmail.com', phone: '+91 54321 09876', bookings: 3, spent: '₹950', status: 'Blocked', joined: '01 May 2026' },
  ];

  const filteredCustomers = customersData.filter((cust) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      cust.name.toLowerCase().includes(searchLower) ||
      cust.email.toLowerCase().includes(searchLower) ||
      cust.phone.toLowerCase().includes(searchLower) ||
      cust.id.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'All Status' || cust.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Customers</h1><p>Manage all registered customers and their details.</p></div>
        <button className="btn-export"><Download size={18} /> Export CSV</button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Name, Email, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn-secondary"><Filter size={16} /> Filter</button>
            <select 
              className="custom-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Blocked</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr><th>Customer</th><th>Contact Info</th><th>Total Bookings</th><th>Total Spent</th><th>Status</th><th>Joined Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar-placeholder">{cust.name.charAt(0)}</div>
                        <div>
                          <p className="font-semibold text-dark">{cust.name}</p>
                          <p className="text-sm text-gray">{cust.id}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <p className="text-sm"><Mail size={14} className="icon-inline"/> {cust.email}</p>
                        <p className="text-sm text-gray"><Phone size={14} className="icon-inline"/> {cust.phone}</p>
                      </div>
                    </td>
                    <td className="font-semibold">{cust.bookings}</td>
                    <td className="font-semibold">{cust.spent}</td>
                    <td>
                      <span className={`status-badge ${cust.status === 'Active' ? 'status-green' : cust.status === 'Blocked' ? 'status-red' : 'status-orange'}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="text-gray">{cust.joined}</td>
                    <td><button className="icon-btn"><MoreVertical size={18} /></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No customers found.
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
export default Customers;