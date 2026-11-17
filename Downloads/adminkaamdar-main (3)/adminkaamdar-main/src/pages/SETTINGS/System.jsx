import React from 'react';
import { Save } from 'lucide-react';
import './System.css';

const System = () => {
  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <div className="page-header"><div><h1>System Settings</h1><p>Configure global platform settings.</p></div></div>
      <div className="card" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>General Configuration</h2>
        
        <div className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Platform Name</label>
            <input type="text" defaultValue="Kaamdaar" style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Support Email</label>
            <input type="email" defaultValue="support@kaamdaar.com" style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Default Platform Commission (%)</label>
            <input type="number" defaultValue="15" style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
          </div>
        </div>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary"><Save size={18} /> Save Configuration</button>
        </div>
      </div>
    </div>
  );
};
export default System;