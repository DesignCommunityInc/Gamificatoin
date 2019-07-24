import React from 'react'
import { PropTypes } from "prop-types";
import * as routes from "../constants/Routes";
import { Link, withRouter } from "react-router-dom";
import { buttonPressedSound } from "../utils/Audio";

const propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // request: PropTypes.shape({         // Стоит вносить в propTypes типы получаемые из апи?
  //   data: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     email: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     surname: PropTypes.string.isRequired,
  //     img: PropTypes.string.isRequired,
  //   }).isRequired,
  // }).isRequired,
};

class Header extends React.Component {
  render() {
    const { 
      isLoading,
      data: {
        name,
        last_name,
        second_name,
        photo
      },
      toggleSettingsScreen,
      location: { pathname } = {},
     } = this.props;
    const style = { backgroundImage: `url('${photo}')` };
    return pathname === routes.ROOT ? (
      <section className="Header">
        {isLoading ? (
          <div>
            <div className="tile__container">
              <div className="tile__container__image tile__container__image-loading"/>
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
                  className="button button-main button-main-light">
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
              <div className="tile__container__image" style={style}/>
              <div className="tile__container__info">
                <h2>{last_name}</h2>
                <h4>{name} {second_name}</h4>
                
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
                  onClick={() => buttonPressedSound()}>
                  Главный экран
                </span>
              </Link>
              <span 
                role="button" 
                className="button button-main button-main-light" 
                onClick={() => {
                  toggleSettingsScreen()
                  buttonPressedSound()
                }}>
                Настройки 
              </span>
              <span 
                role="button" 
                className="button button-main button-main-red"
                onClick={() => {
                  buttonPressedSound();
                  this.props.logout();
                }}>
                Выход
              </span>
            </div>
          </div>
        )}
      </section>
    ) : (
      <div></div>
    )
  }
}

Header.propTypes = propTypes;

export default withRouter(props => <Header {...props}/>);