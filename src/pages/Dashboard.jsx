import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('Detecting...');
  const [loadingWeather, setLoadingWeather] = useState(true);

  const fetchDashboardWeather = async (lat, lon) => {
    try {
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=precipitation_probability_max&timezone=auto`
      );

      try {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const addr = geoRes.data.address;
        setLocationName(addr.city || addr.town || addr.village || 'Unknown Location');
      } catch (e) {
        setLocationName('Your Farm');
      }

      setWeatherData(weatherRes.data);
      setLoadingWeather(false);
    } catch (err) {
      console.error(err);
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchDashboardWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchDashboardWeather(29.6857, 76.9907) // Fallback to Karnal
      );
    } else {
      fetchDashboardWeather(29.6857, 76.9907);
    }
  }, []);

  const current = weatherData?.current;
  const precipitation = weatherData?.daily?.precipitation_probability_max[0];

  const weatherCards = [
    { 
      label: 'Temperature', 
      value: loadingWeather ? '...' : `${Math.round(current?.temperature_2m)}°C`, 
      icon: Thermometer, 
      color: '#f97316' 
    },
    { 
      label: 'Humidity', 
      value: loadingWeather ? '...' : `${current?.relative_humidity_2m}%`, 
      icon: Droplets, 
      color: '#0ea5e9' 
    },
    { 
      label: 'Wind Speed', 
      value: loadingWeather ? '...' : `${current?.wind_speed_10m} km/h`, 
      icon: Wind, 
      color: '#64748b' 
    },
    { 
      label: 'Rain Chance', 
      value: loadingWeather ? '...' : `${precipitation}%`, 
      icon: CloudRain, 
      color: '#2563eb' 
    },
  ];

  const cropReminders = [
    { id: 1, text: 'Time for irrigation in Wheat plot #1', type: 'Irrigation', time: 'In 2 hours' },
    { id: 2, text: 'Check for Pests in Tomato patch', type: 'Pest Control', time: 'Today' },
    { id: 3, text: 'Fertilizer application due for Rice', type: 'Fertilization', time: 'Tomorrow' },
  ];

  const mandiPrices = [
    { crop: 'Wheat (Gehun)', price: '₹2,450', change: '+₹25', trend: 'up' },
    { crop: 'Tomato (Tamatar)', price: '₹1,200', change: '-₹40', trend: 'down' },
    { crop: 'Onion (Pyaz)', price: '₹2,100', change: '+₹110', trend: 'up' },
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Weather Banner */}
      <section className="hero-banner glass-card">
        <div className="hero-content">
          <div className="location-chip">
            <MapPin size={16} />
            <span>{locationName}</span>
          </div>
          
          {current?.temperature_2m > 35 && (
            <div className="weather-alert">
               <AlertTriangle size={20} />
               <span>Heatwave alert: Temperatures crossing 35°C. Increase irrigation frequency.</span>
            </div>
          )}

          {precipitation > 50 && (
            <div className="weather-alert rain">
               <CloudRain size={20} />
               <span>High chance of rain today ({precipitation}%). Delay pesticide spraying.</span>
            </div>
          )}

          {!loadingWeather && current?.temperature_2m <= 35 && precipitation <= 50 && (
            <div className="weather-alert optimal">
               <Thermometer size={20} />
               <span>Weather is optimal for field work today.</span>
            </div>
          )}

          <h1>Good Morning, Rajesh!</h1>
          <p>Your crops in <strong>{locationName}</strong> are looking healthy. Here's your daily summary.</p>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="stats-grid">
        {weatherCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="stat-card glass-card">
              <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                {loadingWeather && idx === 0 ? <Loader2 size={24} className="spin" /> : <Icon size={24} />}
              </div>
              <div className="stat-info">
                <span className="stat-label">{card.label}</span>
                <span className="stat-value">{card.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="main-grid">
        {/* Mandi Prices */}
        <section className="mandi-section glass-card">
          <div className="section-header">
            <h3>Mandi Rates</h3>
            <button className="view-all">View All <ChevronRight size={16} /></button>
          </div>
          <div className="mandi-list">
            {mandiPrices.map((item, idx) => (
              <div key={idx} className="mandi-item">
                <div className="crop-info">
                  <span className="crop-name">{item.crop}</span>
                  <span className="price-unit">Per Quintal</span>
                </div>
                <div className="price-info">
                  <span className="current-price">{item.price}</span>
                  <span className={`price-change ${item.trend}`}>{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crop Advisory */}
        <section className="advisory-section glass-card">
          <div className="section-header">
            <h3>Crop Advisory</h3>
            <span className="badge">3 New</span>
          </div>
          <div className="reminders-list">
            {cropReminders.map((reminder) => (
              <div key={reminder.id} className="reminder-item">
                <div className="reminder-dot"></div>
                <div className="reminder-content">
                  <p>{reminder.text}</p>
                  <span className="reminder-time">{reminder.time}</span>
                </div>
                <button className="reminder-action">Done</button>
              </div>
            ))}
          </div>
        </section>

        {/* AI Disease Detection Shortcut */}
        <section className="ai-cta glass-card">
          <div className="ai-cta-content">
            <h3>Detect Crop Diseases</h3>
            <p>Upload a photo of your crop and our AI will diagnose the issue instantly.</p>
            <button className="premium-btn">Start Diagnosis</button>
          </div>
        </section>
      </div>

      <style>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hero-banner {
          padding: 40px;
          background: linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(118, 200, 147, 0.1) 100%);
          border: 1px solid rgba(45, 90, 39, 0.1);
          position: relative;
        }
        .location-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          width: fit-content;
          margin-bottom: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .weather-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(249, 199, 79, 0.15);
          color: #b45309;
          padding: 10px 18px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
          width: fit-content;
        }
        .weather-alert.optimal { background: rgba(45, 90, 39, 0.1); color: var(--primary); }
        .weather-alert.rain { background: rgba(37, 99, 235, 0.1); color: #1e40af; }

        .hero-content h1 {
          font-size: 2.2rem;
          margin-bottom: 10px;
        }
        .hero-content p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spin { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .stat-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .stat-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .mandi-section, .advisory-section, .ai-cta {
          padding: 24px;
        }
        .view-all {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .mandi-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mandi-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: rgba(45, 90, 39, 0.03);
          border-radius: 12px;
        }
        .crop-name {
          display: block;
          font-weight: 600;
        }
        .price-unit {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .current-price {
          display: block;
          font-weight: 700;
          text-align: right;
        }
        .price-change {
          font-size: 0.75rem;
          font-weight: 600;
        }
        .price-change.up { color: #16a34a; }
        .price-change.down { color: #dc2626; }

        .reminders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .reminder-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .reminder-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          margin-top: 6px;
        }
        .reminder-content p {
          font-size: 0.9rem;
          font-weight: 500;
        }
        .reminder-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .reminder-action {
          margin-left: auto;
          background: var(--bg-main);
          padding: 4px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          border: 1px solid var(--border);
        }
        .badge {
          background: var(--primary);
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.75rem;
        }
        .ai-cta {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .ai-cta h3 { color: white; margin-bottom: 12px; }
        .ai-cta p { color: rgba(255, 255, 255, 0.8); margin-bottom: 20px; font-size: 0.9rem; }
        .ai-cta .premium-btn {
          background: white;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
