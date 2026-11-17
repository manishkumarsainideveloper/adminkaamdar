import React from 'react';
import { Plus, Search, MoreVertical, Bell } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  const notifications = [
    { id: 'NTF-01', title: 'Diwali Offer Live!', audience: 'All Users', date: '24 Oct 2026', status: 'Sent' },
    { id: 'NTF-02', title: 'New AC Service Added', audience: 'Jaipur Users', date: '23 Oct 2026', status: 'Sent' },
    { id: 'NTF-03', title: 'App Update Available', audience: 'All Users', date: '25 Oct 2026', status: 'Scheduled' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Push Notifications</h1><p>Send alerts and announcements to users.</p></div>
        <button className="btn-primary"><Plus size={18}/> Send Notification</button>
      </div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Notification..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Notification Title</th><th>Audience</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {notifications.map((n, i) => (
                <tr key={i}>
                  <td className="text-gray">{n.id}</td>
                  <td>
                    <div className="cell-with-icon">
                      <Bell size={16} className="text-orange"/> <span className="font-semibold text-dark">{n.title}</span>
                    </div>
                  </td>
                  <td>{n.audience}</td>
                  <td className="text-gray">{n.date}</td>
                  <td><span className={`status-badge ${n.status === 'Sent' ? 'status-green' : 'status-blue'}`}>{n.status}</span></td>
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
export default Notifications;