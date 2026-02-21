import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Sunrise, 
  Sunset,
  AlertCircle,
  MapPin,
  Loader2
} from 'lucide-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('Detecting location...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherIcon = (code) => {
    if (code === 0) return { Icon: Sun, color: '#F9C74F', desc: 'Clear Sky' };
    if (code >= 1 && code <= 3) return { Icon: CloudSun, color: '#4A8C42', desc: 'Partly Cloudy' };
    if (code >= 61 && code <= 65) return { Icon: CloudRain, color: '#2563eb', desc: 'Rainy' };
    if (code >= 95) return { Icon: CloudRain, color: '#4338ca', desc: 'Thunderstorm' };
    return { Icon: CloudSun, color: '#4A8C42', desc: 'Variable' };
  };

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      // Fetch Weather Data
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
      );

      // Fetch Location Name (Reverse Geocoding)
      try {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const address = geoRes.data.address;
        setLocationName(`${address.city || address.town || address.village || 'Unknown'}, ${address.state || ''}`);
      } catch (geoErr) {
        setLocationName(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      }

      setWeatherData(weatherRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('Location permission denied. Showing default weather for Karnal.');
        // Default to Karnal, Haryana if permission denied
        fetchWeather(29.6857, 76.9907);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="weather-loading glass-card animate-fade-in">
        <Loader2 className="spin" size={48} color="var(--primary)" />
        <h2>Fetching Hyperlocal Weather...</h2>
        <p>This will only take a moment.</p>
        <style>{`
          .weather-loading {
            height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            text-align: center;
          }
          .spin { animation: rotate 2s linear infinite; }
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const currentInfo = getWeatherIcon(current?.weather_code);
  const CurrentIcon = currentInfo.Icon;

  const forecast = daily?.time.map((t, i) => {
    const info = getWeatherIcon(daily.weather_code[i]);
    const date = new Date(t);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    return {
      day: dayName,
      temp: `${Math.round(daily.temperature_2m_max[i])}°`,
      icon: info.Icon,
      desc: info.desc,
      color: info.color
    };
  });

  return (
    <div className="weather-page animate-fade-in">
      <div className="weather-header">
        <h1>Weather Forecast</h1>
        <p className="loc-display">
          <MapPin size={16} /> 
          Hyperlocal updates for <strong>{locationName}</strong>
        </p>
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="weather-main-grid">
        {/* Current Weather */}
        <div className="current-weather glass-card">
          <div className="current-temp-section">
            <CurrentIcon size={80} color={currentInfo.color} />
            <div className="temp-info">
              <span className="current-temp">{Math.round(current?.temperature_2m)}°C</span>
              <span className="weather-desc">{currentInfo.desc}</span>
            </div>
          </div>
          <div className="weather-details-grid">
            <div className="detail-item">
              <Droplets size={20} />
              <span>Humidity: {current?.relative_humidity_2m}%</span>
            </div>
            <div className="detail-item">
              <Wind size={20} />
              <span>Wind: {current?.wind_speed_10m} km/h</span>
            </div>
            <div className="detail-item">
              <Sunrise size={20} />
              <span>Sunrise: {daily?.sunrise[0]?.split('T')[1]}</span>
            </div>
            <div className="detail-item">
              <Sunset size={20} />
              <span>Sunset: {daily?.sunset[0]?.split('T')[1]}</span>
            </div>
          </div>
        </div>

        {/* Alerts & Warnings */}
        <div className="weather-alerts glass-card">
          <h3>Active Alerts</h3>
          {Math.round(current?.temperature_2m) > 35 ? (
            <div className="alert-item high">
              <AlertCircle size={24} />
              <div className="alert-text">
                <strong>Heatwave Warning</strong>
                <p>High temperatures detected. Ensure extra hydration for crops today.</p>
              </div>
            </div>
          ) : (
            <div className="alert-item info">
              <Sun size={24} />
              <div className="alert-text">
                <strong>Optimal Conditions</strong>
                <p>Weather is favorable for most harvesting and sowing activities.</p>
              </div>
            </div>
          )}
          
          {daily?.weather_code.some(code => code >= 61) && (
            <div className="alert-item info">
              <CloudRain size={24} />
              <div className="alert-text">
                <strong>Rain Prediction</strong>
                <p>Rain detected in the 7-day forecast. Plan your irrigation accordingly.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-scroll">
        {forecast?.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="forecast-card glass-card">
              <span className="forecast-day">{item.day}</span>
              <Icon size={32} color={item.color} />
              <span className="forecast-temp">{item.temp}</span>
              <span className="forecast-desc">{item.desc}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .weather-page { display: flex; flex-direction: column; gap: 24px; }
        .weather-header h1 { font-size: 2rem; }
        .loc-display { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
        
        .error-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(220, 38, 38, 0.05);
          color: #dc2626;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(220, 38, 38, 0.1);
        }

        .weather-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }

        .current-weather {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          background: linear-gradient(135deg, rgba(249, 199, 79, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%);
        }

        .current-temp-section {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .current-temp {
          font-size: 4rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1;
        }

        .weather-desc {
          display: block;
          font-size: 1.25rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .weather-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .weather-alerts { padding: 24px; }
        .weather-alerts h3 { margin-bottom: 20px; }

        .alert-item {
          display: flex;
          gap: 15px;
          padding: 16px;
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .alert-item.high { background: rgba(220, 38, 38, 0.05); color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.1); }
        .alert-item.info { background: rgba(37, 99, 235, 0.05); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.1); }

        .alert-text strong { display: block; margin-bottom: 4px; }
        .alert-text p { font-size: 0.85rem; opacity: 0.9; }

        .section-title { margin-top: 10px; }

        .forecast-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .forecast-card {
          min-width: 120px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .forecast-day { font-weight: 600; color: var(--text-muted); }
        .forecast-temp { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .forecast-desc { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default Weather;
