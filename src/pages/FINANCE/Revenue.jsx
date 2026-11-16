import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Revenue.css';

const Revenue = () => {
  const data = [
    { name: 'Week 1', commission: 25000, payout: 80000 },
    { name: 'Week 2', commission: 35000, payout: 110000 },
    { name: 'Week 3', commission: 45000, payout: 130000 },
    { name: 'Week 4', commission: 40000, payout: 120000 },
  ];

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>Commission & Revenue</h1><p>Analyze platform earnings and payouts.</p></div></div>
      <div className="card" style={{ padding: '24px', height: '400px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Monthly Revenue Split</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data} barGap={10}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="commission" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Platform Commission" />
            <Bar dataKey="payout" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Provider Payout" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Revenue;