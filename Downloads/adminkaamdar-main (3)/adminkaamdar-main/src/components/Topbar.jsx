import React from 'react';
import { Search, Bell, MapPin, Calendar, ChevronDown } from 'lucide-react';
import './Topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search bookings, customers, providers..." 
          className="search-input" 
        />
      </div>

      <div className="topbar-right">
        <div className="info-pill">
          <MapPin size={16} className="text-orange" />
          <span>Jaipur, Rajasthan</span>
          <ChevronDown size={14} className="text-gray" />
        </div>
        
        <div className="info-pill">
          <Calendar size={16} className="text-orange" />
          <span>01 Oct - 31 Oct 2026</span>
        </div>

        <div className="notification-btn">
          <Bell size={20} className="text-gray" />
          <span className="badge">2</span>
        </div>

        <div className="profile-section">
          <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="avatar" />
          <div className="profile-info">
            <p className="name">Admin</p>
            <p className="role">Super Admin</p>
          </div>
          <ChevronDown size={16} className="text-gray" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;