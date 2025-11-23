import React from 'react';

const Logo: React.FC<{ className?: string; alt?: string }> = ({
  className = 'h-6',
  alt = 'Apointa Logo',
}) => {
  return <img src="/images/logo.jpeg" className={className} alt={alt} />;
};

export default Logo;
