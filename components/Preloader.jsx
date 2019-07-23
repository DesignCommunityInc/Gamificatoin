import React from 'react';

export default class Preloader extends React.Component {
  render() {
    const { isActive } = this.props;
    const className = isActive ? 'Preloader visible' : 'Preloader hidden';
      return (
        <div 
          className={className} 
          ref={(container) => {
            this.container = container;
          }}
        />
      )
  }
}