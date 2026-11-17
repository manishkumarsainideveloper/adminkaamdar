import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import './ProviderPayouts.css';

const ProviderPayouts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payoutsData = [
    { id: 'PO-801', provider: 'Rakesh Kumar', amount: '₹12,500', date: '24 Oct 2026', status: 'Pending', statusClass: 'status-orange', btnText: 'Process', btnClass: 'btn-primary', disabled: false },
    { id: 'PO-802', provider: 'Amit Sharma', amount: '₹8,200', date: '23 Oct 2026', status: 'Processing', statusClass: 'status-blue', btnText: 'Wait', btnClass: 'btn-secondary', disabled: true },
    { id: 'PO-803', provider: 'Sunil Yadav', amount: '₹15,000', date: '20 Oct 2026', status: 'Completed', statusClass: 'status-green', btnText: 'View', btnClass: 'btn-secondary', disabled: false },
  ];

  const filteredPayouts = payoutsData.filter((p) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      p.id.toLowerCase().includes(searchLower) ||
      p.provider.toLowerCase().includes(searchLower) ||
      p.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Provider Payouts</h1><p>Manage payments and settlements to providers.</p></div>
        <button className="btn-export"><Download size={18} /> Export Payouts</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Payout ID or Provider Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Payout ID</th><th>Provider Name</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredPayouts.length > 0 ? (
                filteredPayouts.map((p, index) => (
                  <tr key={index}>
                    <td className="font-semibold">{p.id}</td>
                    <td>{p.provider}</td>
                    <td className="text-green font-semibold">{p.amount}</td>
                    <td>{p.date}</td>
                    <td><span className={`status-badge ${p.statusClass}`}>{p.status}</span></td>
                    <td>
                      <button 
                        className={p.btnClass} 
                        disabled={p.disabled} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        {p.btnText}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No payouts found for "{searchTerm}"
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
export default ProviderPayouts;