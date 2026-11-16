import React from 'react';
import { Check, X, FileText, ExternalLink } from 'lucide-react';
import './KYC.css';

const KYC = () => {
  const kycRequests = [
    { id: 'PRV-9901', name: 'Suresh Kumar', service: 'Plumbing', date: '24 Oct 2026', docs: ['Aadhar Card', 'PAN Card'] },
    { id: 'PRV-9902', name: 'Ramesh Singh', service: 'AC Service', date: '23 Oct 2026', docs: ['Aadhar Card', 'Driving License'] },
  ];

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>KYC Verification Queue</h1><p>Review and verify provider documents.</p></div></div>
      <div className="kyc-grid">
        {kycRequests.map((req, index) => (
          <div key={index} className="kyc-card card">
            <div className="kyc-header">
              <div className="user-cell"><div className="avatar-placeholder">{req.name.charAt(0)}</div><div><h3>{req.name}</h3><p>{req.id} • {req.service}</p></div></div>
              <span className="status-badge status-orange">Pending</span>
            </div>
            <div className="kyc-body">
              <p className="kyc-date">Submitted on: {req.date}</p>
              <div className="kyc-docs">
                {req.docs.map((doc, i) => (
                  <div key={i} className="doc-item"><FileText size={18} className="text-blue" /><span>{doc}</span><button className="icon-btn ml-auto"><ExternalLink size={16} /></button></div>
                ))}
              </div>
            </div>
            <div className="kyc-footer">
              <button className="btn-reject"><X size={16} /> Reject</button>
              <button className="btn-approve"><Check size={16} /> Approve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default KYC;