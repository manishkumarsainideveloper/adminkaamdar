import React from 'react';
import { Search, Download } from 'lucide-react';
import './ProviderPayouts.css';

const ProviderPayouts = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Provider Payouts</h1><p>Manage payments and settlements to providers.</p></div>
        <button className="btn-export"><Download size={18} /> Export Payouts</button>
      </div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Payout ID..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Payout ID</th><th>Provider Name</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td className="font-semibold">PO-801</td><td>Rakesh Kumar</td><td className="text-green font-semibold">₹12,500</td><td>24 Oct 2026</td><td><span className="status-badge status-orange">Pending</span></td><td><button className="btn-primary" style={{padding: '6px 12px', fontSize: '12px'}}>Process</button></td></tr>
              <tr><td className="font-semibold">PO-802</td><td>Amit Sharma</td><td className="text-green font-semibold">₹8,200</td><td>23 Oct 2026</td><td><span className="status-badge status-blue">Processing</span></td><td><button className="btn-secondary" disabled style={{padding: '6px 12px', fontSize: '12px'}}>Wait</button></td></tr>
              <tr><td className="font-semibold">PO-803</td><td>Sunil Yadav</td><td className="text-green font-semibold">₹15,000</td><td>20 Oct 2026</td><td><span className="status-badge status-green">Completed</span></td><td><button className="btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>View</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProviderPayouts;