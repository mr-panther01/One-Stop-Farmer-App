import { useState } from 'react'
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
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'weather':
        return <Weather />;
      case 'market':
        return <Marketplace />;
      case 'expert':
        return <ExpertConsultation />;
      case 'community':
        return <Community />;
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

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <header className="top-header glass-card">
          <div className="user-profile">
            <span className="welcome-text">Namaste, <strong>Rajesh Kumar</strong></span>
            <div className="avatar">RK</div>
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
