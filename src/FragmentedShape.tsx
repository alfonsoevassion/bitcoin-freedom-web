import React, { useState } from 'react';
import shapesData from './shapes.json';

const FragmentedShape: React.FC = () => {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const shapes = shapesData.shapes;

  const nextShape = () => {
    setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
  };

  const currentShape = shapes[currentShapeIndex];

  return (
    <div className="evolution-container">
      <div className="shape-display">
        <div className="polygons-wrapper">
          {currentShape.polygons.map((points, idx) => {
            const clipPathValue = `polygon(${points.map(p => `${p[0]}% ${p[1]}%`).join(', ')})`;
            return (
              <div 
                key={idx} 
                className="fragment" 
                style={{ 
                  clipPath: clipPathValue,
                  backgroundColor: `rgba(247, 147, 26, ${0.4 + (idx % 6) * 0.1})`
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="shape-info">
        <h3>{currentShape.name}</h3>
        <p>{currentShape.description}</p>
        <button className="cta-button" onClick={nextShape}>
          Transformar
        </button>
      </div>
    </div>
  );
};

export default FragmentedShape;
