import React from 'react';
import { PropTypes } from 'prop-types';
import Utils from '../utils/Utils';
import GME from '../utils/GamingMouseEvents';

const propTypes = {
  wheelable: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
const defaultProps = {
  wheelable: false,
};

class ScrollWrapper extends React.Component {
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.wrapper = React.createRef();
    this.scrollContainer = React.createRef();
  }

  componentDidMount() {
    const { current: wrapper } = this.wrapper;
    if (wrapper) wrapper.addEventListener('DOMNodeInserted', this.scrollVisibility);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleMove(e, direction) {
    const { wheelable } = this.props;
    if (!wheelable) return;
    if (e.buttons !== 1) return;
    const { current: container } = this.scrollContainer;
    if (direction) {
      this.interval = setInterval(() => {
        Utils.forward(container, -600);
      }, 300);
    } else {
      this.interval = setInterval(() => {
        Utils.backward(container, 600);
      }, 300);
    }
  }

  moveForward() {
    const { current: container } = this.scrollContainer;
    Utils.forward(container, -600);
  }

  moveBack() {
    const { current: container } = this.scrollContainer;
    Utils.backward(container, 600);
  }

  render() {
    const {
      children,
    } = this.props;
    return (
      <>
        <span
          className="Games__scroller"
          type="backward"
          onClick={this.moveBack}
          onMouseEnter={e => this.handleMove(e, false)}
          onMouseLeave={() => clearInterval(this.interval)}
          tabIndex="0"
          onKeyDown={() => {}}
          role="button"
        />
        <span
          className="Games__scroller"
          type="forward"
          onMouseEnter={e => this.handleMove(e, true)}
          onMouseLeave={() => clearInterval(this.interval)}
          onClick={this.moveForward}
          tabIndex="0"
          onKeyDown={() => {}}
          role="button"
        />
        <div
          className="Games__container Games__container-scroll"
          ref={this.scrollContainer}
        >
          <div
            className="Games__container__wrapper"
            ref={this.wrapper}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
}


ScrollWrapper.propTypes = propTypes;
ScrollWrapper.defaultProps = defaultProps;

export default ScrollWrapper;
