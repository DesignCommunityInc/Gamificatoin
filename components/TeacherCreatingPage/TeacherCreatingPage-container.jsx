import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Gamelist from '../Gamelist';

const propTypes = {
  fetchTeacherGames: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class TeacherCreatingPage extends React.Component {
  componentDidMount() {
    const { fetchTeacherGames } = this.props;
    // fetchTeacherGames();
  }

  render() {
    const {
      isLoading,
      data: {
        started = {},
        not_started = {},
        completed = {},
      } = {},
      location: {
        pathname,
      } = {},
    } = this.props;
    console.log(started);
    return (
      <main className="page">
        <Header />
        <Settings />
        <section className="Games Container">
          <Link to="/" className="Container__title Container__title-backward">Мои игры</Link>
        </section>
      </main>
    );
  }
}


TeacherCreatingPage.propTypes = propTypes;

export default TeacherCreatingPage;
