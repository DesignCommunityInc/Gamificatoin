import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../../utils/Utils';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};
const defaultProps = {
  children: null,
};

class List extends React.Component {
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
  }

  scrollVisibility() {
    if (this.wrapper.offsetWidth <= this.scrollContainer.offsetWidth && this.forward) {
      this.forward.classList.add('hidden');
    }
  }

  handleScroll() {
    const container = this.scrollContainer;
    const limit = container.scrollWidth - container.clientWidth;
    switch (Math.floor(container.scrollLeft)) {
      case limit: this.forward.classList.add('hidden');
        break;
      case 0: this.backward.classList.add('hidden');
        break;
      default:
        this.backward.classList.remove('hidden');
        this.forward.classList.remove('hidden');
        break;
    }
  }

  moveForward() {
    Utils.forward(this.scrollContainer, -350);
  }

  moveBack() {
    Utils.backward(this.scrollContainer, 350);
  }

  render() {
    const {
      title,
      isLoading,
      children,
    } = this.props;
    return (isLoading ? (
      <div />
    ) : (
      <div className="Options__inside__wrapper">
        <div className="Options__inside__wrapper__title">{title}</div>
        <span
          className="Games__scroller Games__scroller--indents"
          type="backward"
          onClick={this.moveBack}
          tabIndex="0"
          role="button"
          onKeyDown={() => {}}
          ref={(button) => {
            this.backward = button;
          }}
        />
        <span
          className="Games__scroller Games__scroller--indents"
          type="forward"
          onClick={this.moveForward}
          tabIndex="0"
          role="button"
          onKeyDown={() => {}}
          ref={(button) => {
            this.forward = button;
          }}
        />
        <div
          className="Games__container Games__container-scroll Classes__container"
          ref={(container) => {
            this.scrollContainer = container;
          }}
          onScroll={this.handleScroll}
        >
          <div
            className="Games__container__wrapper Inside__container__wrapper Games__container__wrapper__last"
            ref={(wrapper) => {
              this.wrapper = wrapper;
            }}
          >
            {children}
          </div>
        </div>
      </div>
    ));
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
