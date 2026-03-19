import React, { useState } from 'react';
import wpData from './whitepaper.json';

const WhitepaperViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="wp-viewer">
      <div className="wp-sidebar">
        {wpData.sections.map((sec, idx) => (
          <button 
            key={sec.id} 
            className={`wp-nav-item ${activeSection === idx ? 'active' : ''}`}
            onClick={() => setActiveSection(idx)}
          >
            {sec.title}
          </button>
        ))}
      </div>

      <div className="wp-content-area">
        <div className="wp-card original">
          <span className="badge">Original de Satoshi</span>
          <p>{wpData.sections[activeSection].original}</p>
        </div>

        <div className="wp-card simplified">
          <span className="badge">Traducción a Humano</span>
          <p>{wpData.sections[activeSection].simple}</p>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperViewer;
