import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/Routes';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  toggleSettingsScreen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const Header = ({
  isLoading,
  data: {
    name,
    last_name: lastName,
    second_name: secondName,
    photo,
  } = {},
  toggleSettingsScreen,
  logout,
  location: { pathname } = {},
}) => (pathname === routes.ROOT ? (
  <section className="Header">
    {isLoading ? (
      <div>
        <div className="tile__container">
          <div className="tile__container__image tile__container__image-loading" />
          <div className="tile__container__info tile__container__info-loading">
            <h2> </h2>
            <h4> </h4>
            <span> </span>
          </div>
        </div>
        <div className="settings-container">
          <Link to="/">
            <span
              role="button"
              className="button button-main button-main-light"
            >
              Главный экран
            </span>
          </Link>
          <span role="button" className="button button-main button-main-light">Настройки</span>
          <span role="button" className="button button-main button-main-red">Выход</span>
        </div>
      </div>
    ) : ( // is not loading
      <div>
        <div className="tile__container">
          <div className="tile__container__image" style={{ backgroundImage: `url('${photo}')` }} />
          <div className="tile__container__info">
            <h2>{lastName}</h2>
            <h4>{`${name} ${secondName}`}</h4>
            <Link to="/my/class/">
              <span>4Б класс</span>
            </Link>
            <Link to="my/rate/">
              <span>ТОП 16</span>
            </Link>
          </div>
        </div>
        <div className="settings-container">
          <Link to="/">
            <span
              role="button"
              className="button button-main button-main-light"
            >
              Главный экран
            </span>
          </Link>
          <span
            role="button"
            className="button button-main button-main-light"
            onClick={() => {
              toggleSettingsScreen();
            }}
            onKeyDown={() => {}}
            tabIndex="0"
          >
            Настройки
          </span>
          <span
            role="button"
            className="button button-main button-main-red"
            onClick={() => {
              logout();
            }}
            onKeyDown={() => {}}
            tabIndex="0"
          >
            Выход
          </span>
        </div>
      </div>
    )}
  </section>
) : (
  <section className="Header">
    {isLoading ? (
      <>
        <div className="tile__container">
          <div className="tile__container__image tile__container__image-loading" />
        </div>
        <div className="settings-container">
          <Link to="/">
            <span
              role="button"
              className="button button-main button-main-light"
            >
              Главный экран
            </span>
          </Link>
          <span role="button" className="button button-main button-main-light">Настройки</span>
          <span role="button" className="button button-main button-main-red">Выход</span>
        </div>
      </>
    ) : ( // is not loading
      <>
        <Link to="/" className="Container__title Container__title-backward">Мои достижения</Link>
        {/* <div className="tile__container">
          <div className="tile__container__image" style={{ backgroundImage: `url('${photo}')` }} />
        </div>
        <div className="settings-container">
          <Link to="/">
            <span
              role="button"
              className="button button-main button-main-light"
            >
              Главный экран
            </span>
          </Link>
          <span
            role="button"
            className="button button-main button-main-light"
            onClick={() => {
              toggleSettingsScreen();
            }}
            onKeyDown={() => {}}
            tabIndex="0"
          >
            Настройки
          </span>
          <span
            role="button"
            className="button button-main button-main-red"
            onClick={() => {
              logout();
            }}
            onKeyDown={() => {}}
            tabIndex="0"
          >
            Выход
          </span>
        </div> */}
      </>
    )}
  </section>
));

Header.propTypes = propTypes;

export default withRouter(props => <Header {...props} />);
