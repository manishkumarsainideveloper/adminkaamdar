import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import './Invoices.css';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    { id: 'INV-2026-001', customer: 'Rahul Sharma', date: '24 Oct 2026', amount: '₹299', status: 'Paid' },
    { id: 'INV-2026-002', customer: 'Priya Mehta', date: '23 Oct 2026', amount: '₹349', status: 'Pending' },
    { id: 'INV-2026-003', customer: 'Amit Verma', date: '22 Oct 2026', amount: '₹899', status: 'Paid' },
  ];

  const filteredInvoices = invoices.filter((inv) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      inv.id.toLowerCase().includes(searchLower) ||
      inv.customer.toLowerCase().includes(searchLower) ||
      inv.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Invoices</h1><p>View and download customer billing history.</p></div>
        <button className="btn-export"><Download size={18} /> Export All</button>
      </div>
      
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Invoice No, Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Invoice No</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-dark">{inv.id}</td>
                    <td>{inv.customer}</td>
                    <td className="text-gray">{inv.date}</td>
                    <td className="font-semibold">{inv.amount}</td>
                    <td><span className={`status-badge ${inv.status === 'Paid' ? 'status-green' : 'status-orange'}`}>{inv.status}</span></td>
                    <td><button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}><Download size={14} /> PDF</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No invoices found for "{searchTerm}"
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
export default Invoices;