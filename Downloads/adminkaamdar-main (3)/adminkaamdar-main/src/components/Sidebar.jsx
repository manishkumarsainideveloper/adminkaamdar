import React from 'react';
import { 
  LayoutDashboard, CalendarDays, Users, UserCheck, 
  Settings, PieChart, FileText, Bell, LogOut, 
  Tag, List, Layers, Image, HelpCircle 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuGroups = [
    {
      title: 'BOOKINGS',
      items: [
        { name: 'All Bookings', icon: <CalendarDays size={18} />, path: '/bookings' },
        { name: 'Live Bookings', icon: <CalendarDays size={18} />, path: '/live-bookings' },
        { name: 'Cancelled Bookings', icon: <CalendarDays size={18} />, path: '/cancelled' },
      ]
    },
    {
      title: 'CUSTOMERS',
      items: [
        { name: 'Customers', icon: <Users size={18} />, path: '/customers' },
        { name: 'Customer Details', icon: <UserCheck size={18} />, path: '/customer-details' },
        { name: 'Customer Complaints', icon: <Bell size={18} />, path: '/complaints' },
      ]
    },
    {
      title: 'PROVIDERS',
      items: [
        { name: 'Service Providers', icon: <Users size={18} />, path: '/providers' },
        { name: 'Provider Details', icon: <UserCheck size={18} />, path: '/provider-details' },
        { name: 'KYC Queue', icon: <FileText size={18} />, path: '/kyc' },
        { name: 'Provider Payouts', icon: <PieChart size={18} />, path: '/provider-payouts' },
        { name: 'Reviews', icon: <Settings size={18} />, path: '/reviews' },
      ]
    },
    {
      title: 'SERVICES',
      items: [
        { name: 'Categories', icon: <Tag size={18} />, path: '/categories' },
        { name: 'Services', icon: <List size={18} />, path: '/services' },
        { name: 'Sub Services', icon: <Layers size={18} />, path: '/sub-services' },
        { name: 'Pricing & Commission', icon: <PieChart size={18} />, path: '/pricing' },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { name: 'Invoices', icon: <FileText size={18} />, path: '/invoices' },
        { name: 'Payments', icon: <FileText size={18} />, path: '/payments' },
        { name: 'Wallet Transactions', icon: <PieChart size={18} />, path: '/wallet' },
        { name: 'Commission & Revenue', icon: <PieChart size={18} />, path: '/revenue' },
      ]
    },
    {
      title: 'CMS & CONTENT',
      items: [
        { name: 'Banners', icon: <Image size={18} />, path: '/banners' },
        { name: 'FAQs', icon: <HelpCircle size={18} />, path: '/faqs' },
        { name: 'Notifications', icon: <Bell size={18} />, path: '/notifications' },
        { name: 'Pages', icon: <FileText size={18} />, path: '/pages' },
      ]
    },
    {
      title: 'REPORTS & ANALYTICS',
      items: [
        { name: 'Reports', icon: <FileText size={18} />, path: '/reports' },
        { name: 'Insights', icon: <PieChart size={18} />, path: '/insights' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'Admin Users', icon: <Users size={18} />, path: '/admin-users' },
        { name: 'Roles & Permissions', icon: <UserCheck size={18} />, path: '/roles' },
        { name: 'System Settings', icon: <Settings size={18} />, path: '/system-settings' },
        { name: 'Account Settings', icon: <Settings size={18} />, path: '/settings' },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">K</div>
        <div>
          <h1 className="logo-title">Kaamdaar</h1>
          <p className="logo-subtitle">Har Kaam Turant</p>
        </div>
      </div>

      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/" className={`menu-link ${currentPath === '/' ? 'active' : ''}`}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          
          {menuGroups.map((group, idx) => (
            <div key={idx} className="menu-group">
              <p className="group-title">{group.title}</p>
              {group.items.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className={`menu-link ${currentPath === item.path ? 'active' : ''}`}>
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <Link to="/login" className="menu-link logout">
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;