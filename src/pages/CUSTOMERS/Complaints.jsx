import React, { useState } from 'react';
import { Search, AlertCircle, MessageSquare, Filter } from 'lucide-react';
import './Complaints.css';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');

  const complaintsData = [
    { id: 'TKT-501', customer: 'Rahul Sharma', issue: 'Provider arrived late', category: 'Service Delay', date: '24 Oct 2026', status: 'Open', priority: 'High' },
    { id: 'TKT-502', customer: 'Priya Mehta', issue: 'AC not working after service', category: 'Quality', date: '23 Oct 2026', status: 'In Progress', priority: 'Medium' },
    { id: 'TKT-503', customer: 'Amit Verma', issue: 'Charged extra amount', category: 'Billing', date: '22 Oct 2026', status: 'Resolved', priority: 'Low' },
    { id: 'TKT-504', customer: 'Sneha Gupta', issue: 'Provider misbehaved', category: 'Behavior', date: '21 Oct 2026', status: 'Open', priority: 'High' },
  ];

  const filteredComplaints = complaintsData.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      t.id.toLowerCase().includes(searchLower) ||
      t.customer.toLowerCase().includes(searchLower) ||
      t.issue.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower);

    const matchesPriority = priorityFilter === 'All Priorities' || t.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Customer Complaints</h1><p>Resolve customer issues and disputes.</p></div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Ticket ID, Customer, or Issue..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn-secondary"><Filter size={16} /> Filter</button>
            <select 
              className="custom-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Ticket ID</th><th>Customer</th><th>Issue</th><th>Category</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((t, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-dark">{t.id}</td>
                    <td>{t.customer}</td>
                    <td className="font-semibold"><AlertCircle size={14} className="text-orange icon-inline"/> {t.issue}</td>
                    <td><span className="category-tag">{t.category}</span></td>
                    <td><span className={`priority-badge ${t.priority === 'High' ? 'priority-high' : t.priority === 'Medium' ? 'priority-med' : 'priority-low'}`}>{t.priority}</span></td>
                    <td><span className={`status-badge ${t.status === 'Resolved' ? 'status-green' : t.status === 'In Progress' ? 'status-blue' : 'status-red'}`}>{t.status}</span></td>
                    <td><button className="btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }}><MessageSquare size={14}/> Reply</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No complaints found.
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
export default Complaints;