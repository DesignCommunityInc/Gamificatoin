import React from 'react';
// import PropTypes from 'prop-types';
import Utils from '../../../utils/Utils';

const propTypes = {
};

const defaultProps = {
  gamesError: false,
};

class UserPage extends React.Component {
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    return (
      <section className="ViewPage">
        <div>asd</div>
      </section>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
