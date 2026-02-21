import React from 'react';
import { 
  Gift, 
  MapPin, 
  Truck, 
  ChevronRight,
  Package,
  Calendar,
  Clock
} from 'lucide-react';

const Logistics = () => {
  const shipments = [
    { id: 'SH-9821', goods: 'Wheat Harvest (20 Quintals)', destination: 'Adani Logistics Hub', status: 'In Transit', progress: 65, eta: 'Tomorrow, 02:00 PM' },
    { id: 'SH-9744', goods: 'Organic Tomato (500 Kg)', destination: 'Reliance Fresh Store', status: 'Delivered', progress: 100, eta: 'Completed' },
  ];

  return (
    <div className="logistics-page animate-fade-in">
      <div className="logistics-header">
        <h1>Supply Chain & Logistics</h1>
        <p>Track your produce from farm to market with full transparency.</p>
      </div>

      <div className="logistics-content">
        {/* Tracking List */}
        <div className="shipment-list glass-card">
           <div className="section-header">
              <h3>Active Shipments</h3>
              <button className="premium-btn">Book New Truck <Truck size={18} /></button>
           </div>
           <div className="shipments">
              {shipments.map(ship => (
                <div key={ship.id} className="shipment-card">
                   <div className="ship-main">
                      <div className="ship-icon"><Package size={24} /></div>
                      <div className="ship-details">
                         <h4>{ship.goods}</h4>
                         <span className="dest-info"><MapPin size={14} /> To: {ship.destination}</span>
                      </div>
                      <div className="ship-status-col">
                         <span className={`status-pill ${ship.status === 'Delivered' ? 'success' : 'active'}`}>{ship.status}</span>
                         <span className="ship-id">ID: {ship.id}</span>
                      </div>
                   </div>
                   <div className="progress-section">
                      <div className="progress-bar">
                         <div className="progress-fill" style={{ width: `${ship.progress}%` }}></div>
                      </div>
                      <div className="progress-labels">
                         <div className="label-item">
                            <Clock size={14} />
                            <span>ETA: {ship.eta}</span>
                         </div>
                         <span>{ship.progress}% Journey</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Fleet Availability */}
        <div className="fleet-section glass-card">
           <h3>Available Transporters</h3>
           <div className="transporter-card">
              <div className="t-info">
                 <strong>National Agro-Logistics</strong>
                 <span>Rate: ₹12/Km • 4.8★</span>
              </div>
              <button className="book-btn">Request Quote</button>
           </div>
           <div className="transporter-card">
              <div className="t-info">
                 <strong>Local Farmers Coop Truck</strong>
                 <span>Rate: ₹10/Km • 4.5★</span>
              </div>
              <button className="book-btn">Request Quote</button>
           </div>
        </div>
      </div>

      <style>{`
        .logistics-page { display: flex; flex-direction: column; gap: 24px; }
        .logistics-content { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }

        .shipment-list { padding: 30px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        
        .shipments { display: flex; flex-direction: column; gap: 20px; }
        .shipment-card { 
           padding: 24px; 
           border: 1px solid var(--border); 
           border-radius: 16px; 
           background: rgba(45, 90, 39, 0.02);
        }

        .ship-main { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .ship-icon { width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .ship-details { flex: 1; }
        .ship-details h4 { margin-bottom: 4px; }
        .dest-info { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: var(--text-muted); }

        .ship-status-col { text-align: right; display: flex; flex-direction: column; gap: 5px; }
        .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .status-pill.active { background: #e0f2fe; color: #0369a1; }
        .status-pill.success { background: #dcfce7; color: #15803d; }
        .ship-id { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

        .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
        .progress-fill { height: 100%; background: var(--primary); border-radius: 4px; }
        .progress-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .label-item { display: flex; align-items: center; gap: 6px; }

        .fleet-section { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .transporter-card { 
           padding: 16px; 
           border: 1px solid var(--border); 
           border-radius: 12px; 
           display: flex; 
           flex-direction: column; 
           gap: 12px; 
        }
        .t-info strong { display: block; font-size: 0.95rem; }
        .t-info span { font-size: 0.8rem; color: var(--text-muted); }
        .book-btn { width: 100%; padding: 8px; background: white; border: 1px solid var(--border); font-weight: 600; color: var(--primary); }
      `}</style>
    </div>
  );
};

export default Logistics;
