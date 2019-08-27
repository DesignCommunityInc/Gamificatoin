import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  image: PropTypes.string,
  isLoading: PropTypes.bool,
};
const defaultProps = {
  image: null,
  isLoading: false,
};

class Info extends React.Component {
  constructor() {
    super();
    this.imageMoving = this.imageMoving.bind(this);
    this.image = React.createRef();
  }

  componentDidMount() {
    this.imageMoving();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  imageMoving() {
    const image = this.image.current;
    let direction = true;
    let scale = 1;
    const moving = () => {
      if (direction) scale += 0.001;
      else scale -= 0.001;
      if (scale <= 1 || scale >= 1.2) direction = !direction;
      image.style.transform = `scale(${scale})`;
    };
    this.interval = setInterval(
      moving,
      50,
    );
  }

  render() {
    const {
      image,
      isLoading,
    } = this.props;
    if (isLoading) {
      return (
        <div />
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
                ref={this.image}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}


Info.propTypes = propTypes;
Info.defaultProps = defaultProps;

export default Info;
