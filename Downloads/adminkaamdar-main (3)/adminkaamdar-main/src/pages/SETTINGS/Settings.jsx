import React from 'react';
import { User, Shield, Save, Upload } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="page-container" style={{ maxWidth: '1000px' }}>
            <div className="page-header">
                <div>
                    <h1> Account Settings</h1>
                    <p>Manage your account and application settings.</p>
                </div>
            </div>

            <div className="settings-layout">
                <div className="settings-sidebar card">
                    <button className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <User size={18} /> Profile
                    </button>
                    <button className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                        <Shield size={18} /> Security
                    </button>
                </div>
                <div className="settings-content card">
                    {activeTab === 'profile' && (
                        <div className="tab-content">
                            <h2>Profile Settings</h2>
                            <p className="tab-desc">Update your profile information and preferences.</p>
                            <div className="profile-upload">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="settings-avatar" />
                                <div>
                                    <button className="btn-secondary"><Upload size={16} /> Change Photo</button>
                                    <p className="text-sm text-gray" style={{ marginTop: '8px' }}>JPG, GIF or PNG. Max size 2MB.</p>

                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue="Admin kaamdaar" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue="admin@kaamdaar.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" defaultValue="+91 98765 43210" />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input type="text" defaultValue="super Admin" disabled className="disabled-input" />
                                </div>
                            </div>
                            <div className="form-footer">
                                <button className="btn-primary">Save Changes</button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'security' && (
                        <div className="tab-content">
                            <h2>Security Settings</h2>
                            <p className="tab-desc">Update your password to keep your account secure.</p>
                            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" placeholder="Enter your current password" />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" placeholder="Enter your new password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" placeholder="Confirm your new password" />
                                </div>
                            </div>
                            <div className="form-footer">
                                <button className="btn-primary"><Save size={8} />Update Password</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;