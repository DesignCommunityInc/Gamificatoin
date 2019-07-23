import React from 'react';

export default ({ enabled, onClick }) => {
  const className = enabled ? `Toggle active` : `Toggle`;
  return (
      <div className={className} onClick={onClick} />
    )
}