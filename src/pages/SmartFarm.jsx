import React from 'react';
import { 
  Cpu, 
  Droplets, 
  Thermometer, 
  Sun, 
  Zap,
  Activity,
  Power
} from 'lucide-react';

const SmartFarm = () => {
  const farmDevices = [
    { id: 1, name: 'Main Irrigation Pump', status: 'Running', health: 'Healthy', energy: '1.2 kW', icon: Power, color: '#16a34a' },
    { id: 2, name: 'Soil Sensor #1 (East)', status: 'Active', health: 'Healthy', moisture: '32%', icon: Droplets, color: '#0ea5e9' },
    { id: 3, name: 'Weather Station', status: 'Active', health: 'Healthy', temp: '28°C', icon: Activity, color: '#f97316' },
  ];

  return (
    <div className="iot-page animate-fade-in">
      <div className="iot-header">
        <h1>Smart Farm (IoT)</h1>
        <p>Monitor and control your farm equipment in real-time using IoT sensors.</p>
      </div>

      <div className="iot-grid">
        {/* Device Control Cards */}
        {farmDevices.map(device => {
           const Icon = device.icon;
           return (
             <div key={device.id} className="device-card glass-card">
                <div className="device-header">
                   <div className="icon-box" style={{ background: `${device.color}15`, color: device.color }}>
                      <Icon size={24} />
                   </div>
                   <div className="status-badge" style={{ background: device.status === 'Running' ? '#dcfce7' : '#f1f5f9', color: device.status === 'Running' ? '#16a34a' : '#64748b' }}>
                      {device.status}
                   </div>
                </div>
                <div className="device-info">
                   <h3>{device.name}</h3>
                   <div className="metrics">
                      {device.moisture && <span>Moisture: <strong>{device.moisture}</strong></span>}
                      {device.temp && <span>Temp: <strong>{device.temp}</strong></span>}
                      {device.energy && <span>Energy: <strong>{device.energy}</strong></span>}
                      <span>Health: <strong style={{color: '#16a34a'}}>{device.health}</strong></span>
                   </div>
                </div>
                <div className="device-footer">
                   <button className="toggle-btn">Shut Down</button>
                   <button className="settings-btn">Settings</button>
                </div>
             </div>
           )
        })}
      </div>

      {/* Soil Moisture Heatmap (Mockup) */}
      <section className="heatmap-section glass-card">
         <div className="section-header">
            <h3>Soil Moisture Analysis</h3>
            <span className="last-updated">Last sync: 10 mins ago</span>
         </div>
         <div className="mock-map">
            <div className="grid-overlay">
               {[...Array(24)].map((_, i) => (
                 <div key={i} className="map-cell" style={{ 
                    opacity: 0.3 + Math.random() * 0.7,
                    backgroundColor: i % 5 === 0 ? '#ef4444' : '#22c55e'
                 }}></div>
               ))}
            </div>
            <div className="map-legend">
               <span>Dry</span>
               <div className="gradient-bar"></div>
               <span>Optimal</span>
            </div>
         </div>
      </section>

      <style>{`
        .iot-page { display: flex; flex-direction: column; gap: 24px; }
        .iot-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
           gap: 24px;
        }

        .device-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .device-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .status-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }

        .device-info h3 { font-size: 1.1rem; margin-bottom: 12px; }
        .metrics { display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; color: var(--text-muted); }
        .metrics strong { color: var(--text-main); margin-left: 4px; }

        .device-footer { display: flex; gap: 12px; }
        .toggle-btn { flex: 1; background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 10px; font-weight: 600; }
        .settings-btn { flex: 1; background: #f1f5f9; color: #475569; padding: 10px; border-radius: 10px; font-weight: 600; }

        .heatmap-section { padding: 30px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .last-updated { font-size: 0.8rem; color: var(--text-muted); }

        .mock-map {
           height: 300px;
           background: #e5e7eb;
           border-radius: 16px;
           position: relative;
           overflow: hidden;
        }
        .grid-overlay {
           display: grid;
           grid-template-columns: repeat(6, 1fr);
           grid-template-rows: repeat(4, 1fr);
           height: 100%;
           gap: 2px;
        }
        .map-cell { transition: var(--transition); border: 1px solid rgba(255,255,255,0.2); }
        
        .map-legend {
           position: absolute;
           bottom: 20px;
           right: 20px;
           background: white;
           padding: 10px;
           border-radius: 8px;
           display: flex;
           align-items: center;
           gap: 10px;
           font-size: 0.75rem;
           font-weight: 600;
           box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .gradient-bar {
           width: 100px;
           height: 10px;
           background: linear-gradient(to right, #ef4444, #22c55e);
           border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default SmartFarm;
