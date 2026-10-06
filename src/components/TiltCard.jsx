import React, { useState } from 'react';

const TiltCard = ({ children, className = '', style = {} }) => {
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="tilt-card-inner"
        style={{
          transform: transformStyle,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(15, 39, 39, 0.22), 0 0 1px 1px rgba(217, 119, 6, 0.3)' 
            : '0 10px 30px -5px rgba(15, 39, 39, 0.08), 0 0 1px 1px rgba(15, 39, 39, 0.05)',
          ...style
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
