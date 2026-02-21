import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  User, 
  Image as ImageIcon,
  Plus
} from 'lucide-react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Vikram Singh',
      location: 'Rohtak, Haryana',
      content: 'Just tried the new organic pesticide for my tomato crop. The results are amazing! No pests for 2 weeks now.',
      likes: 24,
      comments: 5,
      time: '2 hours ago',
      tags: ['Organic', 'Tomato']
    },
    {
      id: 2,
      author: 'Amit Patel',
      location: 'Anand, Gujarat',
      content: 'Does anyone know the current market price for Onion in Lasalgaon Mandi? Looking to sell my harvest this week.',
      likes: 12,
      comments: 18,
      time: '5 hours ago',
      tags: ['MarketRates', 'Onion']
    },
    {
      id: 3,
      author: 'Saraswati Devi',
      location: 'Gorakhpur, UP',
      content: 'Sharing a photo of my rice field. The irrigation advice from the app really helped during the dry spell last month.',
      likes: 56,
      comments: 8,
      time: 'Yesterday',
      tags: ['Rice', 'Irrigation'],
      img: 'https://images.unsplash.com/photo-1530513475390-a5dfdaef0429?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  return (
    <div className="community-page animate-fade-in">
      <div className="community-header">
        <h1>Farmer Community</h1>
        <p>Connect, share, and learn from fellow farmers across the country.</p>
      </div>

      <div className="community-content">
        <div className="feed-section">
          {/* Create Post */}
          <div className="create-post glass-card">
             <div className="user-input">
                <div className="avatar">RK</div>
                <input type="text" placeholder="Share your experience or ask a question..." />
             </div>
             <div className="post-actions">
                <button className="action-item"><ImageIcon size={18} /> Photo</button>
                <button className="action-item"># Tags</button>
                <button className="premium-btn">Post <Plus size={16} /></button>
             </div>
          </div>

          {/* feed */}
          <div className="posts-list">
             {posts.map(post => (
               <div key={post.id} className="post-card glass-card">
                  <div className="post-header">
                     <div className="author-info">
                        <div className="author-avatar">{post.author.charAt(0)}</div>
                        <div>
                           <h4>{post.author}</h4>
                           <span className="post-meta">{post.location} • {post.time}</span>
                        </div>
                     </div>
                  </div>
                  <div className="post-body">
                     <p>{post.content}</p>
                     {post.img && <img src={post.img} alt="Post content" className="post-img" />}
                  </div>
                  <div className="post-tags">
                     {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                  </div>
                  <div className="post-footer">
                     <button className="footer-action"><ThumbsUp size={18} /> {post.likes}</button>
                     <button className="footer-action"><MessageSquare size={18} /> {post.comments}</button>
                     <button className="footer-action"><Share2 size={18} /></button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Sidebar Topics */}
        <div className="community-sidebar">
           <div className="topics-card glass-card">
              <h3>Trending Topics</h3>
              <div className="topic-list">
                 <div className="topic"><span>#WheatHarvest</span> <span>1.2k posts</span></div>
                 <div className="topic"><span>#NewSubsidies</span> <span>850 posts</span></div>
                 <div className="topic"><span>#OrganicFarming</span> <span>3.4k posts</span></div>
                 <div className="topic"><span>#RainAlerts</span> <span>500 posts</span></div>
              </div>
           </div>
           
           <div className="groups-card glass-card">
              <h3>Your Groups</h3>
              <div className="group-item">
                 <div className="group-icon">🌾</div>
                 <div className="group-info">
                    <h4>Haryana Wheat Farmers</h4>
                    <span>4.2k members</span>
                 </div>
              </div>
              <div className="group-item">
                 <div className="group-icon">🚜</div>
                 <div className="group-info">
                    <h4>Modern Agri Tech</h4>
                    <span>1.8k members</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .community-page { display: flex; flex-direction: column; gap: 24px; }
        .community-content { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }

        .create-post { padding: 20px; display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .user-input { display: flex; gap: 15px; align-items: center; }
        .user-input .avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .user-input input { flex: 1; border: none; background: rgba(45, 90, 39, 0.05); padding: 12px 20px; border-radius: 30px; outline: none; }

        .post-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border); }
        .action-item { background: transparent; display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; }
        
        .posts-list { display: flex; flex-direction: column; gap: 20px; }
        .post-card { padding: 24px; }
        .author-info { display: flex; gap: 12px; align-items: center; }
        .author-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--secondary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .author-info h4 { font-size: 1rem; }
        .post-meta { font-size: 0.75rem; color: var(--text-muted); }

        .post-body { margin: 16px 0; }
        .post-body p { font-size: 1rem; line-height: 1.6; color: var(--text-main); }
        .post-img { width: 100%; border-radius: 16px; margin-top: 16px; object-fit: cover; max-height: 400px; }

        .post-tags { display: flex; gap: 10px; margin-bottom: 16px; }
        .tag { font-size: 0.8rem; font-weight: 600; color: var(--primary); background: rgba(45, 90, 39, 0.05); padding: 4px 12px; border-radius: 20px; }

        .post-footer { display: flex; gap: 24px; padding-top: 16px; border-top: 1px solid var(--border); }
        .footer-action { background: transparent; display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-weight: 600; font-size: 0.85rem; }

        .community-sidebar { display: flex; flex-direction: column; gap: 24px; }
        .topics-card, .groups-card { padding: 20px; }
        .topics-card h3, .groups-card h3 { font-size: 1.1rem; margin-bottom: 15px; }

        .topic-list { display: flex; flex-direction: column; gap: 12px; }
        .topic { display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 500; }
        .topic span:last-child { color: var(--text-muted); font-size: 0.75rem; }

        .group-item { display: flex; gap: 12px; align-items: center; padding: 10px; border-radius: 12px; transition: var(--transition); }
        .group-item:hover { background: rgba(45, 90, 39, 0.03); cursor: pointer; }
        .group-icon { font-size: 1.5rem; }
        .group-info h4 { font-size: 0.9rem; }
        .group-info span { font-size: 0.75rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default Community;
