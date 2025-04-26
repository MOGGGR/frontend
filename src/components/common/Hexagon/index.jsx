import React from 'react';

import styles from './style.module.css';


/* TODO: Rodar o lint */
function Hexagon({ size = 200, src, alt = 'Hexagon Image' }) {
  const dimensionW = typeof size === 'number' ? `${size}px` : size;
  const dimensionH = typeof size === 'number' ? `${size * 0.86602540378}px` : size;

  const containerStyle = {
    width: dimensionW,
    height: dimensionH,
    background: 'linear-gradient(to right, #0075FF, #00c8ff)',
    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  return (
    <div style={containerStyle}>
      <img src={src} alt={alt} style={imgStyle} />
    </div>
  );
}

export default Hexagon;
