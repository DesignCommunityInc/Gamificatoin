import React from 'react'
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
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
  componentDidMount() {
    this.props.fetchUserProfile();
  }
  render() {
    const { isLoading, data, toggleSettingsScreen } = this.props;
    const { name, last_name, second_name, photo } = data;
    const style = { backgroundImage: `url('${photo}')` };
    
    if(isLoading) return (
      <section className="Header">
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
      </section>
    );
    return (
      <section className="Header">
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
            onClick={() => buttonPressedSound()}>
            Выход
          </span>
        </div>
      </section>
    )
  }
}

Header.propTypes = propTypes;

export default Header;

// const UserImage = styled.div`
//   display: inline-block;
//   position: relative;
//   width: 75px;
//   height: 75px;
//   border-radius: 50%;
//   vertical-align: middle;
//   background: linear-gradient(to right, #7B74C2, #9E63BF);
//   background-image: ${props => `url('${props.src}')`};
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

// background: URL ... `${props => props.src || something}`;