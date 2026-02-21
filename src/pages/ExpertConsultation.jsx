import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Star, 
  CheckCircle,
  Search,
  Send
} from 'lucide-react';

const ExpertConsultation = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  const experts = [
    { 
      id: 1, 
      name: 'Dr. Ramesh Chandra', 
      specialty: 'Soil Pathologist', 
      experience: '15+ Years', 
      rating: 4.9, 
      status: 'online',
      img: 'https://images.unsplash.com/photo-1559839734-2b71f1e67831?auto=format&fit=crop&w=300&q=80',
      languages: ['Hindi', 'English', 'Punjabi']
    },
    { 
      id: 2, 
      name: 'Er. Sunita Verma', 
      specialty: 'Irrigation Systems', 
      experience: '8+ Years', 
      rating: 4.7, 
      status: 'busy',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      languages: ['Hindi', 'English']
    },
    { 
      id: 3, 
      name: 'Dr. Arjun Singh', 
      specialty: 'Pest Management', 
      experience: '20+ Years', 
      rating: 5.0, 
      status: 'online',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      languages: ['Hindi', 'Marathi']
    }
  ];

  return (
    <div className="expert-page animate-fade-in">
      <div className="expert-header">
        <h1>Agri-Expert Consultation</h1>
        <p>Talk to certified professionals about your crop health and chemical dosages.</p>
      </div>

      <div className="expert-content">
        {/* Expert List */}
        <div className="expert-list-section glass-card">
          <div className="search-box">
             <Search size={18} />
             <input type="text" placeholder="Search by name or specialty..." />
          </div>
          <div className="experts-grid">
            {experts.map(expert => (
              <div 
                key={expert.id} 
                className={`expert-card ${selectedExpert?.id === expert.id ? 'active' : ''}`}
                onClick={() => setSelectedExpert(expert)}
              >
                <div className="expert-avatar">
                   <img src={expert.img} alt={expert.name} />
                   <span className={`status-dot ${expert.status}`}></span>
                </div>
                <div className="expert-details">
                   <div className="name-row">
                      <h4>{expert.name}</h4>
                      {expert.rating === 5.0 && <CheckCircle size={14} color="var(--primary)" />}
                   </div>
                   <span className="specialty">{expert.specialty}</span>
                   <div className="meta-row">
                      <Star size={12} fill="#F9C74F" color="#F9C74F" />
                      <span>{expert.rating}</span>
                      <span className="divider">•</span>
                      <span>{expert.experience}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat / Profile View */}
        <div className="expert-interaction-section glass-card">
           {selectedExpert ? (
             <div className="chat-container">
                <div className="chat-header">
                   <div className="peer-info">
                      <img src={selectedExpert.img} alt={selectedExpert.name} />
                      <div>
                         <h3>{selectedExpert.name}</h3>
                         <span className="status-text">{selectedExpert.status === 'online' ? 'Active now' : 'Busy'}</span>
                      </div>
                   </div>
                   <div className="call-actions">
                      <button className="icon-btn"><Phone size={20} /></button>
                      <button className="icon-btn"><Video size={20} /></button>
                   </div>
                </div>
                
                <div className="chat-messages">
                   <div className="message system">
                      <p>Consultation started with {selectedExpert.name}</p>
                   </div>
                   <div className="message expert">
                      <p>Namaste Rajesh ji! I've reviewed your recent crop scans. How can I help you today?</p>
                      <span className="time">10:02 AM</span>
                   </div>
                </div>

                <div className="chat-input-area">
                   <input type="text" placeholder="Explain your issue in detail..." />
                   <button className="send-btn"><Send size={18} /></button>
                </div>
             </div>
           ) : (
             <div className="empty-state">
                <MessageCircle size={64} color="var(--border)" />
                <h3>Select an expert to start</h3>
                <p>Chat via text, voice, or video with agricultural scientists.</p>
             </div>
           )}
        </div>
      </div>

      <style>{`
        .expert-page { display: flex; flex-direction: column; gap: 24px; height: 100%; }
        .expert-content {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 24px;
          flex: 1;
          height: 600px;
        }

        .expert-list-section { display: flex; flex-direction: column; padding: 20px; }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(45, 90, 39, 0.05);
          padding: 10px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .search-box input { border: none; background: transparent; outline: none; width: 100%; }

        .experts-grid { flex: 1; overflow-y: auto; padding-right: 5px; }
        .expert-card {
           display: flex;
           gap: 15px;
           padding: 15px;
           border-radius: 16px;
           cursor: pointer;
           transition: var(--transition);
           margin-bottom: 10px;
        }
        .expert-card:hover { background: rgba(45, 90, 39, 0.03); }
        .expert-card.active { background: rgba(45, 90, 39, 0.08); border: 1px solid var(--border); }

        .expert-avatar { position: relative; width: 50px; height: 50px; }
        .expert-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        
        .status-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
        }
        .status-dot.online { background: #16a34a; }
        .status-dot.busy { background: #f97316; }

        .expert-details { flex: 1; }
        .name-row { display: flex; align-items: center; gap: 6px; }
        .name-row h4 { font-size: 0.95rem; margin-bottom: 2px; }
        .specialty { font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 4px; }
        
        .meta-row { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .divider { color: var(--border); }

        .expert-interaction-section { display: flex; flex-direction: column; overflow: hidden; }
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-muted);
          gap: 15px;
        }

        .chat-container { display: flex; flex-direction: column; height: 100%; }
        .chat-header {
           padding: 20px;
           border-bottom: 1px solid var(--border);
           display: flex;
           justify-content: space-between;
           align-items: center;
        }
        .peer-info { display: flex; gap: 12px; align-items: center; }
        .peer-info img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
        .peer-info h3 { font-size: 1rem; }
        .status-text { font-size: 0.75rem; color: #16a34a; font-weight: 600; }

        .call-actions { display: flex; gap: 10px; }
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(45, 90, 39, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-messages { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; }
        .message { padding: 12px 16px; border-radius: 12px; max-width: 80%; }
        .message.expert { background: rgba(45, 90, 39, 0.05); align-self: flex-start; }
        .message.system { 
           align-self: center; 
           background: transparent; 
           color: var(--text-muted); 
           font-size: 0.75rem; 
           font-weight: 600; 
        }
        .message p { font-size: 0.9rem; line-height: 1.5; }
        .time { font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; display: block; }

        .chat-input-area {
           padding: 20px;
           border-top: 1px solid var(--border);
           display: flex;
           gap: 15px;
        }
        .chat-input-area input {
           flex: 1;
           background: rgba(45, 90, 39, 0.03);
           border: 1px solid var(--border);
           border-radius: 12px;
           padding: 12px 16px;
           outline: none;
        }
        .send-btn { background: var(--primary); color: white; padding: 0 16px; border-radius: 12px; }
      `}</style>
    </div>
  );
};

export default ExpertConsultation;
