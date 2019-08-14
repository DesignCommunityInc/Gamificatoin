import React from 'react'
// import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom';
import { ROOT } from '../../../constants/Routes'

class Info extends React.Component {
  constructor() {
    super();
    this.imageMoving = this.imageMoving.bind(this);
  }
  componentDidMount() {
    this.imageMoving();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  imageMoving() {
    let direction = true;
    let scale = 1;
    const moving = () => {
      if(direction) scale += .001;
      else scale -= .001;
      if(scale <= 1 || scale >= 1.2) direction = !direction;
      this.image.style.transform = `scale(${scale})`;
    }
    this.interval = setInterval(
      moving,
      50,
    )
  }
  render() {
    const { image, isLoading } = this.props;
    
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
      <section className="Games Container Games-Preview">
      <Link to={ROOT} className="Container__title Container__title-backward">Игра</Link> 
      <div className="Games__container">
        <div className="Games__container__wrapper">
          <div className="game">
            <img 
              className="game__image" 
              src={image} 
              alt="geography"
              ref={(image) => {
                this.image = image;
              }}
            />
          </div>
        </div>
      </div>
      </section>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Info;