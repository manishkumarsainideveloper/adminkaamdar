import React from 'react';
import { Plus, ShieldAlert } from 'lucide-react';
import './Roles.css';

const Roles = () => {
  const roles = [
    { name: 'Super Admin', desc: 'Full access to all system features.', users: 1 },
    { name: 'Manager', desc: 'Can manage bookings, providers, and customers.', users: 3 },
    { name: 'Support', desc: 'Can only view and reply to complaints.', users: 5 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Roles & Permissions</h1><p>Define what different admin roles can access.</p></div>
        <button className="btn-primary"><Plus size={18}/> Create Role</button>
      </div>
      <div className="roles-grid">
        {roles.map((r, i) => (
          <div key={i} className="card role-card">
            <div className="role-header">
              <div className="role-icon"><ShieldAlert size={24} className="text-blue"/></div>
              <div><h3>{r.name}</h3><p className="text-gray text-sm">{r.users} Users assigned</p></div>
            </div>
            <p className="role-desc">{r.desc}</p>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>Edit Permissions</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Roles;