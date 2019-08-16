import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Settings from '../Settings';
import Gamelist from '../Gamelist';
import Mode from './Mode'

const propTypes = {
  fetchTeacherGames: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class TeacherGamePage extends React.Component {
  componentDidMount() {
    const { fetchTeacherGames } = this.props;
    fetchTeacherGames();
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
          <div className="Games__container Games__container-bottom-offset">
            <div className="Message Message__v1">
              <p className="Message__title">Для начала.</p>
              <p className="Message__content__1">Для создания, нажимте на плитку справа.</p>
              <p className="Message__content__2">Или сгенерируйте игру автоматически, это еще легче.</p>
            </div>
            <Mode
              title = "Создать игру"
              link = "1"
              img = ''
              backImg = ''
            />
            <Mode
              title = "Генерация игры"
              link = "2"
              img = ''
              backImg = ''
            />
          </div>
        </section>
        {started.data !== null && (
          <Gamelist
            title={started.title}
            list={started.data}
            isLoading={isLoading}
            pathname={pathname}
          />
        )}
        {not_started.data !== null && (
          <Gamelist
            title={not_started.title}
            list={not_started.data}
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


TeacherGamePage.propTypes = propTypes;

export default TeacherGamePage;
