
import React, { useEffect, useState } from 'react';

import {
  Users, Briefcase, Calendar, CheckCircle, XCircle,
  IndianRupee, ArrowUpRight, ArrowDownRight, Star
} from 'lucide-react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

import './Dashboard.css';

const API_URL =
  'http://192.168.1.26:4000/api/v1/admin/dashboard/summary';

// Format numbers
const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString('en-IN')
    : '—';
};

// Format currency
const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const number = Number(value);

  if (!Number.isFinite(number)) return '—';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(number);
};

const Dashboard = () => {

  // API states
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ==================================
  // FETCH DASHBOARD SUMMARY API
  // ==================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);
        setError('');

        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error(
            'Access token not found. Please login again.'
          );
        }

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          signal: controller.signal
        });

        const result = await response.json();

        console.log('DASHBOARD SUMMARY RESPONSE:', result);

        if (!response.ok || result.success !== true) {
          throw new Error(
            result.message || 'Unable to fetch dashboard summary.'
          );
        }

        if (!result.data) {
          throw new Error('Dashboard summary data is missing.');
        }

        setSummary(result.data);

      } catch (err) {
        if (err.name === 'AbortError') return;

        console.error('Dashboard Summary API Error:', err);

        setError(
          err.message || 'Something went wrong while fetching dashboard data.'
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardSummary();

    return () => {
      controller.abort();
    };
  }, []);

  // ==================================
  // DYNAMIC KPI DATA
  // ==================================

  const kpiData = [
    {
      title: 'Total Customers',
      value: formatNumber(summary?.customers?.total),
      icon: <Users size={24} />,
      color: '#3b82f6',
      bg: '#eff6ff'
    },
    {
      title: 'Total Providers',
      value: formatNumber(summary?.providers?.total),
      icon: <Briefcase size={24} />,
      color: '#10b981',
      bg: '#ecfdf5'
    },
    {
      title: 'Total Bookings',
      value: formatNumber(summary?.bookings?.total),
      icon: <Calendar size={24} />,
      color: '#f59e0b',
      bg: '#fffbeb'
    },
    {
      title: 'Completed Bookings',
      value: formatNumber(summary?.bookings?.completed),
      icon: <CheckCircle size={24} />,
      color: '#8b5cf6',
      bg: '#f5f3ff'
    },
    {
      title: 'Cancelled Bookings',
      value: formatNumber(summary?.bookings?.cancelled),
      icon: <XCircle size={24} />,
      color: '#ef4444',
      bg: '#fef2f2'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(summary?.revenue?.net_amount),
      icon: <IndianRupee size={24} />,
      color: '#eab308',
      bg: '#fefce8'
    }
  ];

  // ==================================
  // EXISTING STATIC DASHBOARD DATA
  // ==================================

  const liveBookings = [
    { name: 'Rahul Sharma', service: 'AC Service', location: 'Malviya Nagar', status: 'Provider Assigned', time: '2 min ago', statusClass: 'status-blue' },
    { name: 'Priya Mehta', service: 'Home Cleaning', location: 'Vaishali Nagar', status: 'In Progress', time: '10 min ago', statusClass: 'status-green' },
    { name: 'Amit Verma', service: 'Plumbing', location: 'Mansarovar', status: 'On the Way', time: '15 min ago', statusClass: 'status-orange' },
    { name: 'Sneha Gupta', service: 'Electrical Work', location: 'Tonk Road', status: 'Searching Provider', time: '18 min ago', statusClass: 'status-purple' }
  ];

  const latestBookings = [
    { id: '#BKG-10245', customer: 'Rahul Sharma', service: 'AC Service', location: 'Malviya Nagar', amount: '₹299', status: 'Assigned', statusClass: 'status-blue', time: '2 min ago' },
    { id: '#BKG-10244', customer: 'Priya Mehta', service: 'Home Cleaning', location: 'Vaishali Nagar', amount: '₹349', status: 'In Progress', statusClass: 'status-green', time: '10 min ago' },
    { id: '#BKG-10243', customer: 'Amit Verma', service: 'Plumbing Repair', location: 'Mansarovar', amount: '₹299', status: 'On the Way', statusClass: 'status-orange', time: '15 min ago' }
  ];

  const topProviders = [
    { name: 'Rakesh Kumar', bookings: 342, rating: 4.8, revenue: '₹85,420' },
    { name: 'Amit Sharma', bookings: 298, rating: 4.7, revenue: '₹72,300' },
    { name: 'Sunil Yadav', bookings: 276, rating: 4.6, revenue: '₹68,950' }
  ];

  const lineData = [
    { name: '1 Oct', bookings: 200, completed: 120, cancelled: 20 },
    { name: '5 Oct', bookings: 350, completed: 200, cancelled: 30 },
    { name: '10 Oct', bookings: 280, completed: 180, cancelled: 25 },
    { name: '15 Oct', bookings: 450, completed: 300, cancelled: 40 },
    { name: '20 Oct', bookings: 380, completed: 250, cancelled: 35 },
    { name: '25 Oct', bookings: 500, completed: 350, cancelled: 45 },
    { name: '30 Oct', bookings: 420, completed: 280, cancelled: 30 }
  ];

  const barData = [
    { name: '1 Oct', commission: 50000, payout: 80000 },
    { name: '5 Oct', commission: 70000, payout: 100000 },
    { name: '10 Oct', commission: 60000, payout: 90000 },
    { name: '15 Oct', commission: 90000, payout: 120000 },
    { name: '20 Oct', commission: 80000, payout: 110000 },
    { name: '25 Oct', commission: 100000, payout: 140000 },
    { name: '30 Oct', commission: 110000, payout: 150000 }
  ];

  const pieData = [
    { name: 'AC Service', value: 28, color: '#3b82f6' },
    { name: 'Home Cleaning', value: 18, color: '#10b981' },
    { name: 'Plumbing', value: 12, color: '#f59e0b' },
    { name: 'Electrical', value: 10, color: '#ef4444' },
    { name: 'Others', value: 32, color: '#8b5cf6' }
  ];

  // ==================================
  // DASHBOARD UI
  // ==================================

  return (
    <div className="dashboard-container">

      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with Kaamdaar today.</p>
        </div>

        <button className="btn-export">
          Export Report
        </button>
      </div>

      {/* API ERROR */}
      {error && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: '#fef2f2',
            color: '#dc2626',
            borderRadius: '8px'
          }}
        >
          {error}
        </div>
      )}

      {/* KPI CARDS */}
      <div className="kpi-grid">

        {kpiData.map((stat, index) => (
          <div key={index} className="kpi-card">

            <div className="kpi-top">
              <div
                className="kpi-icon"
                style={{
                  backgroundColor: stat.bg,
                  color: stat.color
                }}
              >
                {stat.icon}
              </div>

              <span className="kpi-change">
                {loading ? 'Loading...' : 'API Data'}
              </span>
            </div>

            <div className="kpi-bottom">
              <h3>{stat.title}</h3>

              <p className="value">
                {loading ? '...' : stat.value}
              </p>

              <p className="sub-text">
                {loading
                  ? 'Fetching data...'
                  : error
                    ? 'Data unavailable'
                    : 'Live dashboard summary'}
              </p>
            </div>

          </div>
        ))}

      </div>

      {/* BOOKINGS OVERVIEW & LIVE BOOKINGS */}
      <div className="charts-row">

        <div className="card chart-card">
          <div className="card-header">
            <h2>Bookings Overview</h2>
            <select>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card live-card">
          <div className="card-header">
            <h2>Live Bookings</h2>
            <button className="btn-link">View All</button>
          </div>

          <div className="live-list">
            {liveBookings.map((b, i) => (
              <div key={i} className="live-item">
                <div className="live-user">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 15}`}
                    alt="user"
                  />
                  <div>
                    <p className="user-name">{b.name}</p>
                    <p className="user-service">
                      {b.service} • {b.location}
                    </p>
                  </div>
                </div>

                <div className="live-status">
                  <span className={`status-badge ${b.statusClass}`}>
                    {b.status}
                  </span>
                  <span className="time">{b.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* REVENUE & CATEGORY CHARTS */}
      <div className="bottom-row">

        <div className="card bar-card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
          </div>

          <div className="chart-container" style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={5}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                <Bar
                  dataKey="commission"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="payout"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card pie-card">
          <div className="card-header">
            <h2>Service Categories</h2>
          </div>

          <div className="pie-layout">
            <div className="pie-chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="pie-center-text">
                <h3>{loading ? '...' : formatNumber(summary?.bookings?.total)}</h3>
                <p>Total</p>
              </div>
            </div>

            <div className="pie-legend">
              {pieData.map((item, i) => (
                <div key={i} className="legend-item">
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-val">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card map-card">
          <div className="card-header">
            <h2>Bookings by Location</h2>
            <select>
              <option>Jaipur</option>
            </select>
          </div>

          <div className="map-placeholder">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Jaipur&zoom=11&size=600x300&maptype=roadmap&style=feature:all|element:geometry|color:0xf5f5f5"
              alt="map"
            />
          </div>
        </div>

      </div>

      {/* LATEST BOOKINGS & TOP PROVIDERS */}
      <div className="tables-row">

        <div className="card table-card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h2>Latest Bookings</h2>
            <button className="btn-link">View All</button>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {latestBookings.map((b, i) => (
                  <tr key={i}>
                    <td className="text-gray text-sm">{b.id}</td>
                    <td className="font-semibold">{b.customer}</td>
                    <td>{b.service}</td>
                    <td className="text-gray">{b.location}</td>
                    <td className="font-semibold">{b.amount}</td>
                    <td>
                      <span className={`status-badge ${b.statusClass}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-gray text-sm">{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card table-card">
          <div className="card-header">
            <h2>Top Providers</h2>
            <button className="btn-link">View All</button>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Bookings</th>
                  <th>Rating</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {topProviders.map((p, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{p.name}</td>
                    <td>{p.bookings}</td>
                    <td className="rating-cell">
                      <Star
                        size={14}
                        fill="#f59e0b"
                        color="#f59e0b"
                      />
                      {p.rating}
                    </td>
                    <td className="font-semibold">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
