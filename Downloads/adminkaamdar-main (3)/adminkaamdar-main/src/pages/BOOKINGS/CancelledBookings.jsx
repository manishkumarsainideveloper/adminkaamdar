import React, { useState } from 'react';
import { Search, XCircle, Download } from 'lucide-react';
import './CancelledBookings.css';

const CancelledBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cancelledData = [
    { id: 'BKG-10242', customer: 'Sneha Gupta', service: 'Electrical Work', provider: 'Pending', reason: 'Provider not found', date: '23 Oct 2026', amount: '₹399' },
    { id: 'BKG-10238', customer: 'Rohan Kapoor', service: 'Plumbing', provider: 'Sunil Yadav', reason: 'Customer cancelled', date: '22 Oct 2026', amount: '₹299' },
    { id: 'BKG-10235', customer: 'Meera Singh', service: 'AC Service', provider: 'Rakesh Kumar', reason: 'Time slot issue', date: '21 Oct 2026', amount: '₹499' },
  ];

  const filteredCancelledData = cancelledData.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.id.toLowerCase().includes(searchLower) ||
      booking.customer.toLowerCase().includes(searchLower) ||
      booking.provider.toLowerCase().includes(searchLower) ||
      booking.service.toLowerCase().includes(searchLower) ||
      booking.reason.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Cancelled Bookings</h1><p>Review cancelled bookings and reasons.</p></div>
        <button className="btn-export"><Download size={18} /> Export Data</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Cancelled ID, Reason..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Booking ID</th><th>Customer</th><th>Service</th><th>Provider</th>
                <th>Cancellation Reason</th><th>Date</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredCancelledData.length > 0 ? (
                filteredCancelledData.map((b, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-dark">{b.id}</td>
                    <td>{b.customer}</td>
                    <td>{b.service}</td>
                    <td className={b.provider === 'Pending' ? 'text-orange' : ''}>{b.provider}</td>
                    <td className="text-red"><XCircle size={14} className="icon-inline"/> {b.reason}</td>
                    <td className="text-gray">{b.date}</td>
                    <td className="font-semibold">{b.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No cancelled bookings found for "{searchTerm}"
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

export default CancelledBookings;