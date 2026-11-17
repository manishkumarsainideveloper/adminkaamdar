import React from 'react';
import { Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import './Wallet.css';

const Wallet = () => {
  const walletTxns = [
    { id: 'WLT-001', type: 'Credit', desc: 'Refund from cancelled booking', amount: '+ ₹299', date: '24 Oct 2026', status: 'Success' },
    { id: 'WLT-002', type: 'Debit', desc: 'Payment for AC Service', amount: '- ₹299', date: '23 Oct 2026', status: 'Success' },
  ];

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>Wallet Transactions</h1><p>Track customer wallet credits and debits.</p></div></div>
      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Search Transaction..." /></div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead><tr><th>Transaction ID</th><th>Description</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {walletTxns.map((txn, i) => (
                <tr key={i}>
                  <td className="font-semibold">{txn.id}</td>
                  <td>
                    <div className={`wallet-type ${txn.type === 'Credit' ? 'text-green' : 'text-red'}`}>
                      {txn.type === 'Credit' ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                      {txn.desc}
                    </div>
                  </td>
                  <td className="text-gray">{txn.date}</td>
                  <td className={`font-semibold ${txn.type === 'Credit' ? 'text-green' : 'text-red'}`}>{txn.amount}</td>
                  <td><span className="status-badge status-green">{txn.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Wallet;