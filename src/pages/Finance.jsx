import React from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  PiggyBank, 
  TrendingUp,
  ArrowRight,
  FileText,
  CreditCard
} from 'lucide-react';

const Finance = () => {
  const services = [
    { title: 'Kisan Micro-Loans', desc: 'Get low-interest loans up to ₹2,00,000 for seeds & equipment.', icon: Wallet, color: '#2D5A27' },
    { title: 'Crop Insurance', desc: 'Secure your harvest against drought, flood, and pests.', icon: ShieldCheck, color: '#0ea5e9' },
    { title: 'Agri-Savings', desc: 'High-yield savings account tailored for seasonal incomes.', icon: PiggyBank, color: '#f97316' },
    { title: 'Market Derivative', desc: 'Price lock options to protect against market volatility.', icon: TrendingUp, color: '#8b5cf6' },
  ];

  return (
    <div className="finance-page animate-fade-in">
      <div className="finance-header">
        <h1>Financial Services</h1>
        <p>Empowering farmers with tailored financial tools and risk management.</p>
      </div>

      <div className="finance-grid">
        {services.map((service, idx) => {
           const Icon = service.icon;
           return (
             <div key={idx} className="service-card glass-card">
                <div className="icon-wrapper" style={{ background: `${service.color}15`, color: service.color }}>
                   <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="apply-btn" style={{ color: service.color }}>
                   Check Eligibility <ArrowRight size={16} />
                </button>
             </div>
           )
        })}
      </div>

      <div className="quick-stats-row">
         <div className="credit-score-card glass-card">
            <div className="score-header">
               <CreditCard size={20} />
               <span>Agri-Credit Score</span>
            </div>
            <div className="score-display">
               <span className="score">742</span>
               <span className="max">/ 900</span>
            </div>
            <p>Your credit score is <strong>Excellent</strong>. You qualify for a 2% interest reduction.</p>
         </div>

         <div className="documents-card glass-card">
            <h3>Active Policies</h3>
            <div className="policy-item">
               <FileText size={18} />
               <div>
                  <strong>PM Bima Yojna (Kharif)</strong>
                  <span>Valid until Oct 2026</span>
               </div>
               <span className="status">Active</span>
            </div>
            <div className="policy-item">
               <FileText size={18} />
               <div>
                  <strong>Equipment Loan #422</strong>
                  <span>Next EMI: ₹4,200 (Apr 05)</span>
               </div>
               <span className="status pending">Pending</span>
            </div>
         </div>
      </div>

      <style>{`
        .finance-page { display: flex; flex-direction: column; gap: 24px; }
        .finance-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
           gap: 24px;
        }

        .service-card { padding: 30px; display: flex; flex-direction: column; gap: 15px; }
        .icon-wrapper { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .service-card h3 { font-size: 1.25rem; }
        .service-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
        
        .apply-btn { 
           background: transparent; 
           display: flex; 
           align-items: center; 
           gap: 8px; 
           font-weight: 700; 
           padding: 0; 
           text-align: left; 
        }

        .quick-stats-row { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; }
        
        .credit-score-card { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .score-header { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-weight: 600; }
        .score-display { display: flex; align-items: baseline; gap: 5px; }
        .score { font-size: 3rem; font-weight: 700; color: var(--primary); }
        .max { color: var(--text-muted); font-weight: 600; }
        .credit-score-card p { font-size: 0.9rem; color: var(--text-muted); }

        .documents-card { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .policy-item { 
           display: flex; 
           align-items: center; 
           gap: 15px; 
           padding: 15px; 
           background: rgba(45, 90, 39, 0.03); 
           border-radius: 12px; 
        }
        .policy-item div { flex: 1; }
        .policy-item strong { display: block; font-size: 0.95rem; }
        .policy-item span { font-size: 0.75rem; color: var(--text-muted); }
        .status { padding: 4px 10px; border-radius: 20px; background: #dcfce7; color: #16a34a; font-size: 0.7rem; font-weight: 700; }
        .status.pending { background: #fff7ed; color: #f97316; }
      `}</style>
    </div>
  );
};

export default Finance;
