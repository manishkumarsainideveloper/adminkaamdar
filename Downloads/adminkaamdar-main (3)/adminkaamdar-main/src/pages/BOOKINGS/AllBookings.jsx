import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical } from 'lucide-react';
import './AllBookings.css';

const AllBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bookingsData = [
    { id: 'BKG-10245', customer: 'Rahul Sharma', service: 'AC Service', provider: 'Rakesh Kumar', date: '24 Oct 2026, 10:30 AM', amount: '₹299', status: 'Completed', statusClass: 'status-green' },
    { id: 'BKG-10244', customer: 'Priya Mehta', service: 'Home Cleaning', provider: 'Amit Sharma', date: '24 Oct 2026, 09:15 AM', amount: '₹349', status: 'In Progress', statusClass: 'status-blue' },
    { id: 'BKG-10243', customer: 'Amit Verma', service: 'Plumbing Repair', provider: 'Pending', date: '23 Oct 2026, 05:45 PM', amount: '₹299', status: 'Pending', statusClass: 'status-orange' },
    { id: 'BKG-10242', customer: 'Sneha Gupta', service: 'Electrical Work', provider: 'Pending', date: '23 Oct 2026, 02:20 PM', amount: '₹399', status: 'Cancelled', statusClass: 'status-red' },
    { id: 'BKG-10241', customer: 'Vikram Singh', service: 'AC Installation', provider: 'Manoj Meena', date: '22 Oct 2026, 11:00 AM', amount: '₹899', status: 'Completed', statusClass: 'status-green' },
  ];

  const filteredBookings = bookingsData.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.id.toLowerCase().includes(searchLower) ||
      booking.customer.toLowerCase().includes(searchLower) ||
      booking.service.toLowerCase().includes(searchLower) ||
      booking.provider.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>All Bookings</h1><p>Manage and track all customer bookings here.</p></div>
        <button className="btn-export"><Download size={18} /> Export CSV</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, Provider..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn-secondary"><Filter size={16} /> Filter</button>
            <select className="custom-select">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Customer</th><th>Service</th><th>Provider</th>
                <th>Date & Time</th><th>Amount</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-dark">{b.id}</td>
                    <td>{b.customer}</td>
                    <td>{b.service}</td>
                    <td className={b.provider === 'Pending' ? 'text-orange font-semibold' : ''}>{b.provider}</td>
                    <td className="text-gray">{b.date}</td>
                    <td className="font-semibold">{b.amount}</td>
                    <td><span className={`status-badge ${b.statusClass}`}>{b.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18} /></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No bookings found for "{searchTerm}"
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

export default AllBookings;