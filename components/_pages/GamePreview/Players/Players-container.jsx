import React from 'react';
import PropTypes from 'prop-types';
import Classmates from '../../Classmates';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  classmates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class Players extends React.Component {
  render() {
    const { isLoading, classmates } = this.props;
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
      <section className="Container">
        {/* <Classmates
          isLoading={isLoading}
          classmates={classmates}
        /> */}
      </section>
    )
  }
}


Players.propTypes = propTypes;

export default Players;
