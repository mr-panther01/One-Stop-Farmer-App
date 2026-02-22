import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import Weather from './pages/Weather'
import ExpertConsultation from './pages/ExpertConsultation'
import Community from './pages/Community'
import AIDiagnosis from './pages/AIDiagnosis'
import SmartFarm from './pages/SmartFarm'
import Finance from './pages/Finance'
import Schemes from './pages/Schemes'
import Logistics from './pages/Logistics'
import MarketPrices from './pages/MarketPrices'
import { Sprout, ArrowRight } from 'lucide-react'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState(localStorage.getItem('agroVistara_user') || '');
  const [tempName, setTempName] = useState('');

  const handleOnboarding = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      localStorage.setItem('agroVistara_user', tempName.trim());
      setUserName(tempName.trim());
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userName={userName} setActiveTab={setActiveTab} />;
      case 'weather':
        return <Weather />;
      case 'mandi':
        return <MarketPrices />;
      case 'market':
        return <Marketplace />;
      case 'expert':
        return <ExpertConsultation userName={userName} />;
      case 'community':
        return <Community userName={userName} />;
      case 'disease':
        return <AIDiagnosis />;
      case 'iot':
        return <SmartFarm />;
      case 'finance':
        return <Finance />;
      case 'schemes':
        return <Schemes />;
      case 'logistics':
        return <Logistics />;
      default:
        return (
          <div className="placeholder-content glass-card animate-fade-in">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
            <p>This feature is coming soon to AgroVistara.</p>
          </div>
        );
    }
  };

  if (!userName) {
    return (
      <div className="onboarding-container">
        <div className="onboarding-card glass-card animate-fade-in">
          <div className="onboarding-icon">
            <Sprout size={64} color="var(--primary)" />
          </div>
          <h1>Namaste!</h1>
          <p>Welcome to <strong>AgroVistara</strong>. What should we call you?</p>
          <form onSubmit={handleOnboarding} className="onboarding-form">
            <input 
              type="text" 
              placeholder="Enter your name..." 
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              required
              autoFocus
            />
            <button type="submit" className="premium-btn">
              Get Started <ArrowRight size={20} />
            </button>
          </form>
        </div>
        <style>{`
          .onboarding-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: var(--bg-main);
            padding: 20px;
          }
          .onboarding-card {
            max-width: 450px;
            width: 100%;
            padding: 50px 40px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .onboarding-icon {
            background: rgba(45, 90, 39, 0.05);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
          }
          .onboarding-card h1 {
            font-size: 2.5rem;
          }
          .onboarding-card p {
            color: var(--text-muted);
            font-size: 1.1rem;
          }
          .onboarding-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 10px;
          }
          .onboarding-form input {
            padding: 15px 20px;
            border-radius: 12px;
            border: 1px solid var(--border);
            font-family: inherit;
            font-size: 1.1rem;
            outline: none;
            text-align: center;
            background: rgba(255, 255, 255, 0.5);
          }
          .onboarding-form input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(45, 90, 39, 0.1);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <header className="top-header glass-card">
          <div className="user-profile">
            <span className="welcome-text">Namaste, <strong>{userName}</strong></span>
            <div className="avatar">{getInitials(userName)}</div>
          </div>
        </header>
        <div className="content-scrollable">
          {renderContent()}
        </div>
      </main>

      <style>{`
        .app-container {
          display: flex;
          min-height: 100vh;
          background: var(--bg-main);
        }
        .main-content {
          margin-left: 300px;
          flex: 1;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .top-header {
          padding: 15px 30px;
          margin: 20px 20px 0 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
        }
        .content-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px 40px 0;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .placeholder-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  )
}

export default App
