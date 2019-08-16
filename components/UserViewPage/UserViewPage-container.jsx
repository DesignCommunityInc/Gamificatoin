import React from 'react';
// import PropTypes from 'prop-types';
import UserContainer from './UserContainer';
import Header from '../Header';
import Settings from '../Settings';
import Utils from '../../utils/Utils';

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
      <main className="page">
        <Header />
        <Settings />
        <UserContainer />
      </main>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
