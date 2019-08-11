import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Gamelist from '../Gamelist';
import Mode from './Mode';

const propTypes = {
  fetchGameList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class GamePage extends React.Component {
  componentDidMount() {
    const { fetchGameList } = this.props;
    fetchGameList();
  }

  render() {
    const {
      isLoading,
      data: {
        invites,
        recommendation,
        completed,
      } = {},
      location: {
        pathname,
      } = {},
    } = this.props;
    return (
      <main className="page">
        <Header />
        <Settings />
        <section className="Games Container">
          <Link to="/" className="Container__title Container__title-backward">Мои игры</Link>
          <div className="Games__container Games__container-bottom-offset">
            <Mode
              title="1 на 1"
              link="1"
            />
            <Mode
              title="Саморазвития"
              link="2"
            />
          </div>
        </section>
        {invites.data !== null && (
          <Gamelist
            title={invites.title}
            list={invites.data}
            isLoading={isLoading}
            pathname={pathname}
          />
        )}
        {recommendation.data !== null && (
          <Gamelist
            title={recommendation.title}
            list={recommendation.data}
            isLoading={isLoading}
            pathname={pathname}
          />
        )}
        {completed.data !== null && (
          <Gamelist
            title={completed.title}
            list={completed.data}
            isLoading={isLoading}
            pathname={pathname}
          />
        )}
      </main>
    );
  }
}


GamePage.propTypes = propTypes;

export default GamePage;
