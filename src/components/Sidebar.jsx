import React from 'react';
import { 
  CloudSun, 
  Sprout, 
  TrendingUp, 
  ShoppingBag, 
  MessageCircle, 
  Gift, 
  Wallet, 
  Users, 
  Camera, 
  Cpu, 
  Truck,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sprout },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'mandi', label: 'Market Prices', icon: TrendingUp },
    { id: 'market', label: 'Marketplace', icon: ShoppingBag },
    { id: 'expert', label: 'Experts', icon: MessageCircle },
    { id: 'schemes', label: 'Schemes', icon: Gift },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'disease', label: 'AI Diagnosis', icon: Camera },
    { id: 'iot', label: 'Smart Farm', icon: Cpu },
    { id: 'logistics', label: 'Logistics', icon: Truck },
  ];

  return (
    <aside className="sidebar glass-card">
      <div className="sidebar-header">
        <h2 className="logo-text">AgroVistara</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <style>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 40px);
          margin: 20px;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          z-index: 100;
        }
        .sidebar-header {
          padding: 30px 24px;
        }
        .logo-text {
          font-size: 1.5rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 12px;
          overflow-y: auto;
        }
        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          margin-bottom: 6px;
          border-radius: 12px;
          color: var(--text-muted);
          background: transparent;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .nav-item:hover {
          background: rgba(45, 90, 39, 0.05);
          color: var(--primary);
        }
        .nav-item.active {
          background: var(--primary);
          color: white;
        }
        .nav-item.active:hover {
          background: var(--primary-light);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
