import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Login from './pages/LOGIN/Login';
import OTP from './pages/OTP/Otp';
import Dashboard from './pages/Dashboard';
import AllBookings from './pages/BOOKINGS/AllBookings';
import LiveBookings from './pages/BOOKINGS/LiveBookings';
import CancelledBookings from './pages/BOOKINGS/CancelledBookings';
import Customers from './pages/CUSTOMERS/Customers';
import CustomerDetails from './pages/CUSTOMERS/CustomerDetails';
import Complaints from './pages/CUSTOMERS/Complaints';
import Providers from './pages/PROVIDERS/Providers';
import ProviderDetails from './pages/PROVIDERS/ProviderDetails';
import KYC from './pages/PROVIDERS/KYC';
import ProviderPayouts from './pages/PROVIDERS/ProviderPayouts';
import Reviews from './pages/PROVIDERS/Reviews';
import Categories from './pages/SERVICES/Categories';
import ServicesList from './pages/SERVICES/ServicesList';
import SubServices from './pages/SERVICES/SubServices';
import Pricing from './pages/SERVICES/Pricing';
import Invoices from './pages/FINANCE/Invoices';
import Payments from './pages/FINANCE/Payments';
import Wallet from './pages/FINANCE/Wallet';
import Revenue from './pages/FINANCE/Revenue';
import Banners from './pages/CMS&CONTENT/Banners';
import FAQs from './pages/CMS&CONTENT/FAQs';
import Notifications from './pages/CMS&CONTENT/Notifications';
import Pages from './pages/CMS&CONTENT/Pages';
import Reports from './pages/REPORTS&ANALYTICS/Reports';
import Insights from './pages/REPORTS&ANALYTICS/Insights';
import Settings from './pages/SETTINGS/Settings';
import AdminUsers from './pages/SETTINGS/AdminUsers';
import Roles from './pages/SETTINGS/Roles';
import System from './pages/SETTINGS/System';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Topbar />
          
          <main className="page-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<AllBookings />} />
              <Route path="/live-bookings" element={<LiveBookings />} />
              <Route path="/cancelled" element={<CancelledBookings />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-details" element={<CustomerDetails />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/provider-details" element={<ProviderDetails />} />
              <Route path="/kyc" element={<KYC />} />
              <Route path="/provider-payouts" element={<ProviderPayouts />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/services" element={<ServicesList />} />
              <Route path="/sub-services" element={<SubServices />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/banners" element={<Banners />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/Admin-Users" element={<AdminUsers/>}/>
              <Route path="/Roles" element={<Roles/>}/>
              <Route path="/system-settings" element={<System/>}/>              
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;