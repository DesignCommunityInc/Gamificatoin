import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Timer from '../Timer';
import * as routes from '../../constants/Routes';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  location: PropTypes.shape({}).isRequired,
  toggleSettingsScreen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
};
const defaultProps = {
  title: '',
};

class Header extends React.Component {
  componentDidMount() {
    const { fetchUserProfile, location: { pathname } = {} } = this.props;
    if (pathname !== routes.ROOT) fetchUserProfile();
  }

  render() {
    const {
      isLoading,
      title,
      data: {
        name,
        last_name: lastName,
        second_name: secondName,
        photo,
      } = {},
      toggleSettingsScreen,
      logout,
      location: { pathname } = {},
    } = this.props;
    return (
      <>
        <Timer />
        {pathname === routes.ROOT ? (
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
                <div className="Container__title Container__title-backward">{title}</div>
                <div className="settings-container--short__burger">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="settings-container--short">
                  <span className="button button-main button-main-light">
                    Главный экран
                  </span>
                  <span className="button button-main button-main-light">
                    Настройки
                  </span>
                  <span className="button button-main button-main-red">
                    Выход
                  </span>
                </div>
                <div className="tile__container--short">
                  <div className="tile__container--short__image tile__container--short__image--loading" />
                </div>
              </>
            ) : ( // is not loading
              <>
                <Link to="/" className="Container__title Container__title-backward">{title}</Link>
                <div className="settings-container--short__burger">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="settings-container--short">
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
                <div
                  className="tile__container--short"
                  role="button"
                  onClick={() => {
                    toggleSettingsScreen();
                  }}
                  onKeyDown={() => {}}
                  tabIndex="0"
                >
                  <div className="tile__container--short__image" style={{ backgroundImage: `url('${photo}')` }} />
                </div>
              </>
            )}
          </section>
        )}
      </>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(props => <Header {...props} />);
