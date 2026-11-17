import React from 'react';
import { Mail, Phone, MapPin, ArrowLeft, MoreHorizontal } from 'lucide-react';
import './CustomerDetails.css';

const CustomerDetails = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-secondary" style={{ padding: '8px' }}><ArrowLeft size={20} /></button>
          <div><h1>Customer Profile</h1><p>View complete details and booking history.</p></div>
        </div>
        <button className="btn-secondary"><MoreHorizontal size={18} /> Options</button>
      </div>

      <div className="profile-layout">
       
        <div className="card profile-sidebar">
          <div className="profile-avatar-lg">R</div>
          <h2>Rahul Sharma</h2>
          <p className="text-gray">Customer since Jan 2026</p>
          
          <div className="profile-stats">
             <div className="stat-box"><h3>12</h3><p>Bookings</p></div>
             <div className="stat-box"><h3>₹4.5k</h3><p>Spent</p></div>
          </div>

          <div className="profile-info-list">
            <p><Mail size={16}/> rahul.s@gmail.com</p>
            <p><Phone size={16}/> +91 98765 43210</p>
            <p><MapPin size={16}/> Malviya Nagar, Jaipur</p>
          </div>
        </div>

       
        <div className="profile-main">
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Recent Bookings</h2>
            <div className="table-responsive">
              <table className="custom-table">
                <thead><tr><th>Booking ID</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td className="font-semibold">#BKG-10245</td><td>AC Service</td><td>24 Oct 2026</td><td>₹299</td><td><span className="status-badge status-green">Completed</span></td></tr>
                  <tr><td className="font-semibold">#BKG-10120</td><td>Home Cleaning</td><td>10 Oct 2026</td><td>₹349</td><td><span className="status-badge status-green">Completed</span></td></tr>
                  <tr><td className="font-semibold">#BKG-10050</td><td>Plumbing</td><td>02 Sep 2026</td><td>₹199</td><td><span className="status-badge status-red">Cancelled</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetails;