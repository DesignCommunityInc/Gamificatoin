import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../Header';
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
        <Gamelist
          title={invites.title}
          list={invites.data}
          isLoading={isLoading}
          pathname={pathname}
          error={invites.data === null}
        />
        <Gamelist
          title={recommendation.title}
          list={recommendation.data}
          isLoading={isLoading}
          pathname={pathname}
          error={recommendation.data === null}
          emptyTitle="У вас пока нет рекомендаций :("
        />
        <Gamelist
          title={completed.title}
          list={completed.data}
          isLoading={isLoading}
          pathname={pathname}
          error={completed.data === null}
          emptyTitle="Вы еще не прошли ни одну игру :("
        />
      </main>
    );
  }
}


GamePage.propTypes = propTypes;

export default GamePage;
