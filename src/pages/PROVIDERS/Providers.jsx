import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Star, ShieldCheck, Clock } from 'lucide-react';
import './Providers.css';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('All KYC Status');

  const providersData = [
    { id: 'PRV-101', name: 'Rakesh Kumar', service: 'AC Service', phone: '+91 99887 76655', rating: 4.8, jobs: 342, earnings: '₹85,420', kyc: 'Verified', status: 'Active' },
    { id: 'PRV-102', name: 'Amit Sharma', service: 'Home Cleaning', phone: '+91 88776 65544', rating: 4.7, jobs: 298, earnings: '₹72,300', kyc: 'Verified', status: 'Active' },
    { id: 'PRV-103', name: 'Sunil Yadav', service: 'Plumbing Repair', phone: '+91 77665 54433', rating: 4.6, jobs: 276, earnings: '₹68,950', kyc: 'Pending', status: 'On Leave' },
    { id: 'PRV-104', name: 'Manoj Meena', service: 'Electrical Work', phone: '+91 66554 43322', rating: 4.6, jobs: 253, earnings: '₹61,200', kyc: 'Verified', status: 'Active' },
  ];

  const filteredProviders = providersData.filter((prv) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      prv.name.toLowerCase().includes(searchLower) ||
      prv.id.toLowerCase().includes(searchLower) ||
      prv.service.toLowerCase().includes(searchLower) ||
      prv.phone.toLowerCase().includes(searchLower);
    
    const matchesKyc = kycFilter === 'All KYC Status' || prv.kyc === kycFilter;

    return matchesSearch && matchesKyc;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Service Providers</h1><p>Manage all service partners, their KYC, and performance.</p></div>
        <button className="btn-export"><Download size={18} /> Export CSV</button>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Name, ID, Service..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn-secondary"><Filter size={16} /> Filter</button>
            <select 
              className="custom-select"
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
            >
              <option>All KYC Status</option>
              <option>Verified</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Provider Info</th><th>Service</th><th>Rating</th><th>Jobs</th><th>Earnings</th><th>KYC Status</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredProviders.length > 0 ? (
                filteredProviders.map((prv, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar-placeholder provider-avatar">{prv.name.charAt(0)}</div>
                        <div><p className="font-semibold text-dark">{prv.name}</p><p className="text-sm text-gray">{prv.id}</p></div>
                      </div>
                    </td>
                    <td><span className="service-tag">{prv.service}</span></td>
                    <td><div className="rating-cell"><Star size={14} fill="#f59e0b" color="#f59e0b" /><span className="font-semibold">{prv.rating}</span></div></td>
                    <td>{prv.jobs}</td><td className="font-semibold">{prv.earnings}</td>
                    <td>
                      <div className={`kyc-badge ${prv.kyc === 'Verified' ? 'kyc-verified' : 'kyc-pending'}`}>
                        {prv.kyc === 'Verified' ? <ShieldCheck size={14} /> : <Clock size={14}/>} {prv.kyc}
                      </div>
                    </td>
                    <td><span className={`status-badge ${prv.status === 'Active' ? 'status-green' : 'status-orange'}`}>{prv.status}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={18} /></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                    No providers found for "{searchTerm}"
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
export default Providers;