import React from 'react';
import { 
  Gift, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Schemes = () => {
  const schemes = [
    { 
      title: 'PM-Kisan Samman Nidhi', 
      desc: 'Government income support of ₹6,000 per year in three equal installments.', 
      eligibility: 'All Landholding Farmer Families', 
      status: 'Open',
      color: '#15803d'
    },
    { 
      title: 'Pradhan Mantri Fasal Bima Yojana', 
      desc: 'Crop insurance for unpredictable weather and pest damages with low premium.', 
      eligibility: 'All Farmers', 
      status: 'Ongoing',
      color: '#0369a1'
    },
    { 
      title: 'Soil Health Card Scheme', 
      desc: 'Free soil testing and customized recommendations for fertilizer use.', 
      eligibility: 'Registered Farmers', 
      status: 'Registering',
      color: '#b45309'
    }
  ];

  return (
    <div className="schemes-page animate-fade-in">
      <div className="schemes-header">
        <h1>Government Schemes & Subsidies</h1>
        <p>Easily navigate available agricultural schemes and check your eligibility.</p>
      </div>

      <div className="schemes-grid">
         {schemes.map((scheme, idx) => (
           <div key={idx} className="scheme-card glass-card">
              <div className="scheme-badge" style={{ background: `${scheme.color}15`, color: scheme.color }}>
                 <Gift size={24} />
              </div>
              <div className="scheme-content">
                 <h3>{scheme.title}</h3>
                 <p>{scheme.desc}</p>
                 <div className="eligibility-box">
                    <strong>Who can apply?</strong>
                    <span>{scheme.eligibility}</span>
                 </div>
              </div>
              <div className="scheme-footer">
                 <button className="premium-btn">Apply Now <ExternalLink size={16} /></button>
                 <button className="secondary-btn">Details</button>
              </div>
           </div>
         ))}
      </div>

      <div className="schemes-faq glass-card">
         <h3>Application Support</h3>
         <div className="support-list">
            <div className="support-item">
               <CheckCircle2 size={20} color="#15803d" />
               <p>Our experts help you with documentation for <strong>Farmer ID</strong> and <strong>Land Records</strong>.</p>
            </div>
            <div className="support-item">
               <AlertCircle size={20} color="#0369a1" />
               <p>New subsidy for <strong>Solar Pumps</strong> has been announced. Check eligibility today!</p>
            </div>
         </div>
      </div>

      <style>{`
        .schemes-page { display: flex; flex-direction: column; gap: 24px; }
        .schemes-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
           gap: 24px;
        }

        .scheme-card { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .scheme-badge { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        
        .scheme-content h3 { font-size: 1.25rem; margin-bottom: 10px; }
        .scheme-content p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }
        
        .eligibility-box { background: rgba(0,0,0,0.03); padding: 12px; border-radius: 10px; font-size: 0.85rem; }
        .eligibility-box strong { display: block; color: var(--text-main); margin-bottom: 4px; }

        .scheme-footer { display: flex; gap: 12px; margin-top: auto; }
        .scheme-footer .premium-btn { flex: 1.5; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .secondary-btn { flex: 1; background: white; border: 1px solid var(--border); font-weight: 600; }

        .schemes-faq { padding: 30px; }
        .schemes-faq h3 { margin-bottom: 20px; }
        .support-list { display: flex; flex-direction: column; gap: 15px; }
        .support-item { display: flex; gap: 12px; align-items: center; padding: 15px; background: rgba(45, 90, 39, 0.03); border-radius: 12px; }
        .support-item p { font-size: 0.95rem; }
      `}</style>
    </div>
  );
};

export default Schemes;
