import React from 'react';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Reports.css';

const Reports = () => {
  const data = [
    { name: 'Jan', revenue: 40000, bookings: 120 },
    { name: 'Feb', revenue: 30000, bookings: 98 },
    { name: 'Mar', revenue: 50000, bookings: 150 },
    { name: 'Apr', revenue: 45000, bookings: 130 },
    { name: 'May', revenue: 60000, bookings: 180 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Platform Reports</h1><p>Analyze overall platform growth and revenue.</p></div>
        <button className="btn-export"><Download size={18} /> Download Report</button>
      </div>
      <div className="card" style={{ padding: '24px', height: '400px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Revenue & Bookings Trend</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar yAxisId="right" dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Reports;