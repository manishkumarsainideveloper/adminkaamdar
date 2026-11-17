import React from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import './AdminUsers.css';

const AdminUsers = () => {
  const admins = [
    { name: 'Super Admin', email: 'admin@kaamdaar.com', role: 'Super Admin', status: 'Active' },
    { name: 'Support Manager', email: 'support@kaamdaar.com', role: 'Manager', status: 'Active' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Admin Users</h1><p>Manage platform administrators and their access.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Admin</button>
      </div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Admin..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Name</th><th>Email Address</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {admins.map((a, i) => (
                <tr key={i}>
                  <td className="font-semibold text-dark">{a.name}</td>
                  <td className="text-gray">{a.email}</td>
                  <td><span className="role-badge">{a.role}</span></td>
                  <td><span className="status-badge status-green">{a.status}</span></td>
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
export default AdminUsers;