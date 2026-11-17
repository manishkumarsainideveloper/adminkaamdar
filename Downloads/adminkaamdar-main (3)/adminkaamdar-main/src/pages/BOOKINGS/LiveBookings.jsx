import React, { useState } from 'react';
import { Search, MapPin, Clock, Filter } from 'lucide-react';
import './LiveBookings.css';

const LiveBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const liveData = [
    { id: 'BKG-10245', customer: 'Rahul Sharma', provider: 'Rakesh Kumar', service: 'AC Service', location: 'Malviya Nagar', status: 'On the Way', time: '2 min ago' },
    { id: 'BKG-10246', customer: 'Priya Mehta', provider: 'Amit Sharma', service: 'Home Cleaning', location: 'Vaishali Nagar', status: 'In Progress', time: '10 min ago' },
    { id: 'BKG-10247', customer: 'Amit Verma', provider: 'Searching...', service: 'Plumbing', location: 'Mansarovar', status: 'Pending', time: '15 min ago' },
    { id: 'BKG-10248', customer: 'Sneha Gupta', provider: 'Sunil Yadav', service: 'Electrical', location: 'Tonk Road', status: 'On the Way', time: '18 min ago' },
  ];

  const filteredLiveData = liveData.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.id.toLowerCase().includes(searchLower) ||
      booking.customer.toLowerCase().includes(searchLower) ||
      booking.provider.toLowerCase().includes(searchLower) ||
      booking.service.toLowerCase().includes(searchLower) ||
      booking.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Live Bookings</h1><p>Track ongoing services in real-time.</p></div>
        <button className="btn-secondary"><Filter size={16} /> Filter Live</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Live Booking..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Customer</th><th>Provider</th><th>Service</th>
                <th>Location</th><th>Status</th><th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredLiveData.length > 0 ? (
                filteredLiveData.map((b, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{b.id}</td>
                    <td>{b.customer}</td>
                    <td className={b.provider === 'Searching...' ? 'text-orange font-semibold' : 'text-blue font-semibold'}>{b.provider}</td>
                    <td>{b.service}</td>
                    <td className="text-gray"><MapPin size={14} className="icon-inline"/> {b.location}</td>
                    <td><span className={`status-badge ${b.status === 'In Progress' ? 'status-green' : b.status === 'On the Way' ? 'status-orange' : 'status-blue'}`}>{b.status}</span></td>
                    <td className="text-gray"><Clock size={14} className="icon-inline"/> {b.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No live bookings found for "{searchTerm}"
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

export default LiveBookings;