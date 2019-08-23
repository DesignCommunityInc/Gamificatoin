import React from 'react'
import PropTypes from 'prop-types';

const propTypes = {
  image: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

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
      if (direction) scale += 0.001;
      else scale -= 0.001;
      if (scale <= 1 || scale >= 1.2) direction = !direction;
      this.image.style.transform = `scale(${scale})`;
    };
    this.interval = setInterval(moving, 50);
  }

  render() {
    const { image, isLoading } = this.props;
    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <section className="Games Container Games-Preview">
        <div className="Games__container">
          <div className="Games__container__wrapper">
            <div className="game">
              <img
                className="game__image"
                src={image}
                alt="geography"
                ref={(img) => {
                  this.image = img;
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}


Info.propTypes = propTypes;

export default Info;
