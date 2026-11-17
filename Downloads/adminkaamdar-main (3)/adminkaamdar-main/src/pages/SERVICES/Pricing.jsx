import React from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const pricingData = [
    { id: 'PRC-01', service: 'AC Installation', basePrice: '₹899', commission: '15%', providerPay: '₹764', status: 'Active' },
    { id: 'PRC-02', service: 'Home Cleaning', basePrice: '₹349', commission: '15%', providerPay: '₹297', status: 'Active' },
    { id: 'PRC-03', service: 'Plumbing Repair', basePrice: '₹299', commission: '18%', providerPay: '₹245', status: 'Active' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Pricing & Commission</h1><p>Manage service prices and platform commission rates.</p></div>
        <button className="btn-primary"><Plus size={18}/> Add Pricing Rule</button>
      </div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Service..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>ID</th><th>Service Name</th><th>Base Price</th><th>Commission</th><th>Provider Payout</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {pricingData.map((p, i) => (
                <tr key={i}>
                  <td className="text-gray">{p.id}</td>
                  <td className="font-semibold text-dark">{p.service}</td>
                  <td className="font-semibold">{p.basePrice}</td>
                  <td className="text-orange font-semibold">{p.commission}</td>
                  <td className="text-green font-semibold">{p.providerPay}</td>
                  <td><span className={`status-badge ${p.status === 'Active' ? 'status-green' : 'status-red'}`}>{p.status}</span></td>
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
export default Pricing;