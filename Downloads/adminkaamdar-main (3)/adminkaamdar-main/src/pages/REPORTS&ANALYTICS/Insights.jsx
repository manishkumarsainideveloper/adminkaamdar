import React from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Insights.css';

const Insights = () => {
  const userGrowth = [
    { name: 'Week 1', customers: 400, providers: 120 },
    { name: 'Week 2', customers: 600, providers: 180 },
    { name: 'Week 3', customers: 850, providers: 250 },
    { name: 'Week 4', customers: 1100, providers: 320 },
  ];

  const insights = [
    { title: 'Customer Growth', value: '+24%', sub: 'Compared to last month', icon: <Users size={24}/>, color: '#3b82f6', bg: '#eff6ff' },
    { title: 'Provider Growth', value: '+12%', sub: 'Compared to last month', icon: <TrendingUp size={24}/>, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Top Category', value: 'AC Service', sub: '32% of total bookings', icon: <Award size={24}/>, color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Completion Rate', value: '94.2%', sub: 'Industry average: 88%', icon: <Target size={24}/>, color: '#8b5cf6', bg: '#f5f3ff' },
  ];

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>Business Insights</h1><p>Deep dive into platform performance metrics.</p></div></div>

      <div className="insights-grid">
        {insights.map((item, index) => (
          <div key={index} className="insight-card card">
            <div className="insight-icon" style={{ backgroundColor: item.bg, color: item.color }}>{item.icon}</div>
            <div>
              <p className="insight-title">{item.title}</p>
              <h2 className="insight-value">{item.value}</h2>
              <p className="insight-sub">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px', height: '350px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>User Growth Trend (This Month)</h2>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} name="Customers" />
            <Line type="monotone" dataKey="providers" stroke="#10b981" strokeWidth={3} name="Providers" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Insights;