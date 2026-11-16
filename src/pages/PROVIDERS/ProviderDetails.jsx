import React from 'react';
import { Phone, Star, ShieldCheck, ArrowLeft, MoreHorizontal, MapPin } from 'lucide-react';
import './ProviderDetails.css';

const ProviderDetails = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-secondary" style={{ padding: '8px' }}><ArrowLeft size={20} /></button>
          <div><h1>Provider Profile</h1><p>View partner performance and details.</p></div>
        </div>
        <button className="btn-secondary"><MoreHorizontal size={18} /> Options</button>
      </div>

      <div className="profile-layout">
        <div className="card profile-sidebar">
          <div className="profile-avatar-lg provider-avatar">R</div>
          <h2>Rakesh Kumar</h2>
          <p className="text-gray">AC Service Expert</p>
          
          <div className="profile-stats">
             <div className="stat-box"><h3>342</h3><p>Jobs Done</p></div>
             <div className="stat-box"><h3>4.8</h3><p>Rating</p></div>
          </div>

          <div className="profile-info-list">
            <p><Phone size={16}/> +91 99887 76655</p>
            <p><MapPin size={16}/> Malviya Nagar, Jaipur</p>
            <p><ShieldCheck size={16} className="text-green"/> KYC Verified Partner</p>
          </div>
        </div>

        <div className="profile-main">
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Recent Jobs</h2>
            <div className="table-responsive">
              <table className="custom-table">
                <thead><tr><th>Booking ID</th><th>Customer</th><th>Date</th><th>Earnings</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td className="font-semibold">#BKG-10245</td><td>Rahul Sharma</td><td>24 Oct 2026</td><td>₹254</td><td><span className="status-badge status-green">Completed</span></td></tr>
                  <tr><td className="font-semibold">#BKG-10210</td><td>Priya Mehta</td><td>20 Oct 2026</td><td>₹297</td><td><span className="status-badge status-green">Completed</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProviderDetails;