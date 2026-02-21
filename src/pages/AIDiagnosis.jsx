import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIDiagnosis = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    // Mock image selection
    setImage('https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80');
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        diagnosis: 'Late Blight (Pichheti Jhulsa)',
        confidence: '94%',
        remedy: 'Apply Metalaxyl + Mancozeb spray immediately. Ensure proper drainage in the field.',
        status: 'Critical'
      });
    }, 3000);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsScanning(false);
  };

  return (
    <div className="ai-page animate-fade-in">
      <div className="ai-header">
        <h1>AI Crop Diagnosis</h1>
        <p>Our advanced AI scans your crops for over 100+ diseases and pest infestations.</p>
      </div>

      <div className="ai-container">
        {!image ? (
          <div className="upload-section glass-card">
            <div className="upload-placeholder">
              <Camera size={64} color="var(--primary)" />
              <h3>Take a photo or upload</h3>
              <p>Show us the affected part of the plant for better accuracy.</p>
              <div className="btn-group">
                <button className="premium-btn">
                  <Camera size={20} />
                  Use Camera
                </button>
                <button className="upload-btn" onClick={handleUpload}>
                  <Upload size={20} />
                  Choose File
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="scanning-section">
            <div className="image-preview glass-card">
               <img src={image} alt="Crop Preview" />
               {isScanning && (
                 <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="scan-line"
                 />
               )}
            </div>

            <div className="result-side">
               {isScanning ? (
                 <div className="scanning-status glass-card">
                    <RefreshCw size={40} className="spin-icon" />
                    <h3>Analyzing Sample...</h3>
                    <p>Comparing with 10,000+ agricultural disease patterns.</p>
                 </div>
               ) : result ? (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="result-card glass-card"
                 >
                    <div className="result-header">
                       <CheckCircle2 size={32} color="#16a34a" />
                       <div>
                          <span className="confidence">Confidence: {result.confidence}</span>
                          <h3>{result.diagnosis}</h3>
                       </div>
                    </div>
                    <div className="result-body">
                       <div className="info-block">
                          <strong>Recommended Action:</strong>
                          <p>{result.remedy}</p>
                       </div>
                       <div className="warning-block">
                          <AlertCircle size={20} />
                          <span>This disease spreads quickly in humid conditions. Warn your neighbors.</span>
                       </div>
                    </div>
                    <div className="result-footer">
                        <button className="premium-btn">Order Medicine</button>
                        <button className="secondary-btn" onClick={reset}>Scan New</button>
                    </div>
                 </motion.div>
               ) : null}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ai-page { display: flex; flex-direction: column; gap: 24px; }
        .ai-header h1 { font-size: 2rem; }
        
        .upload-section {
          padding: 80px;
          display: flex;
          justify-content: center;
          text-align: center;
          border: 2px dashed var(--border);
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .btn-group { display: flex; gap: 16px; margin-top: 10px; }
        .upload-btn {
          background: white;
          border: 1px solid var(--border);
          padding: 12px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: var(--text-main);
        }

        .scanning-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .image-preview {
          position: relative;
          height: 400px;
          overflow: hidden;
          padding: 0;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--secondary);
          box-shadow: 0 0 20px var(--secondary);
          z-index: 10;
        }

        .scanning-status {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 40px;
        }

        .spin-icon { color: var(--primary); animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .result-card {
           padding: 30px;
           height: 100%;
           display: flex;
           flex-direction: column;
           gap: 24px;
        }

        .result-header { display: flex; gap: 16px; align-items: flex-start; }
        .confidence { font-size: 0.8rem; font-weight: 700; color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 6px; }

        .info-block {
          background: rgba(45, 90, 39, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .info-block strong { display: block; margin-bottom: 8px; font-size: 0.9rem; }

        .warning-block {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: #fffbeb;
          color: #92400e;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .result-footer {
          margin-top: auto;
          display: flex;
          gap: 16px;
        }

        .secondary-btn {
          flex: 1;
          background: white;
          border: 1px solid var(--border);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default AIDiagnosis;
