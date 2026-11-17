import React from 'react';
import { Search, Download, MoreVertical, IndianRupee, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import './Payments.css';

const Payments = () => {
  const summaryData = [
    { title: 'Total Revenue', value: '₹12,56,780', icon: <IndianRupee size={24} />, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Platform Commission', value: '₹2,15,430', icon: <ArrowUpRight size={24} />, color: '#3b82f6', bg: '#eff6ff' },
    { title: 'Pending Payouts', value: '₹45,200', icon: <Clock size={24} />, color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Settled Payouts', value: '₹9,85,450', icon: <CheckCircle size={24} />, color: '#8b5cf6', bg: '#f5f3ff' },
  ];

  const transactions = [
    { id: 'TXN-90812', date: '24 Oct 2026', customer: 'Rahul Sharma', provider: 'Rakesh Kumar', amount: '₹299', commission: '₹45', payout: '₹254', status: 'Completed' },
    { id: 'TXN-90811', date: '24 Oct 2026', customer: 'Priya Mehta', provider: 'Amit Sharma', amount: '₹349', commission: '₹52', payout: '₹297', status: 'Completed' },
    { id: 'TXN-90810', date: '23 Oct 2026', customer: 'Amit Verma', provider: 'Pending', amount: '₹299', commission: '₹0', payout: '₹0', status: 'Refunded' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Payments & Transactions</h1><p>Track revenue, commission, and provider payouts.</p></div>
        <button className="btn-export"><Download size={18} /> Export Report</button>
      </div>

      <div className="finance-summary-grid">
        {summaryData.map((item, index) => (
          <div key={index} className="finance-card">
            <div className="finance-icon" style={{ backgroundColor: item.bg, color: item.color }}>{item.icon}</div>
            <div><p className="finance-title">{item.title}</p><h2 className="finance-value">{item.value}</h2></div>
          </div>
        ))}
      </div>

      <div className="card table-card">
        <div className="card-header" style={{ padding: '24px 24px 0 24px' }}>
          <h2>Recent Transactions</h2>
          <div className="search-box" style={{ width: '300px' }}><Search size={18} className="search-icon" /><input type="text" placeholder="Search Transaction ID..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Transaction ID</th><th>Date</th><th>Customer</th><th>Provider</th><th>Total Amt</th><th>Commission</th><th>Payout</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td className="font-semibold text-dark">{txn.id}</td><td className="text-gray">{txn.date}</td><td>{txn.customer}</td>
                  <td className={txn.provider === 'Pending' ? 'text-orange font-semibold' : ''}>{txn.provider}</td>
                  <td className="font-semibold">{txn.amount}</td><td className="text-green font-semibold">{txn.commission}</td><td className="font-semibold">{txn.payout}</td>
                  <td><span className={`status-badge ${txn.status === 'Completed' ? 'status-green' : txn.status === 'Pending' ? 'status-orange' : 'status-red'}`}>{txn.status}</span></td>
                  <td><button className="icon-btn"><MoreVertical size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Payments;