import React from 'react'
import { PropTypes } from "prop-types";
import Toggle from "../Toggle";
import { Link } from "react-router-dom";

const propTypes = {
};
const defaultTypes = {
};

class Settings extends React.Component {
  constructor(){
    super();

    this.handleSettingsToggleKeyPress = this.handleSettingsToggleKeyPress.bind(this);
    this.onInput = this.onInput.bind(this);
    this.allowedLength = 25;
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleSettingsToggleKeyPress, false);
  }
  handleSettingsToggleKeyPress(e) {
    const { visible } = this.props;
    switch(e.keyCode) {
      case 79: // O 
        if(!visible) this.props.toggleSettingsScreen(); 
        break;
      case 27: // Esc
        if(visible) this.props.toggleSettingsScreen();
        break;
      default: break;
    }
  }
  onInput(event) {
    const length = event.target.value.length;
    if(length <= this.allowedLength)
      this.props.setNickNameLength({ length });
    else 
      event.target.value = event.target.value.substring(0, this.allowedLength);
  }
  render() {
    const { 
      userData: { nickname } = {},
      visible, 
      isLocked, 
      isHelpersEnabled, 
      toggleSettingsScreen, 
      toggleHelpersSettings, 
      toggleLockSettings,
      counter,
      style,
      last_name = 'Константинов',
      second_name = 'Константинович',
      name = 'Константин'
    } = this.props;

    const className = `Settings ${ visible ? `Settings-shown` : `` }`;

    return (
      <section className={className}>
        <div 
          className="Settings__background" 
          onClick={() => toggleSettingsScreen()} 
        />

        <div className="Settings__container">
          <div className="Settings__user-inf">
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
          </div>
          <div className="Settings__title">Настройки</div>
          <span 
            className="Settings__cross" 
            onClick={() => toggleSettingsScreen()} 
          />
          <div className="Settings__field">
            <input 
              type="text" 
              placeholder="никнейм" 
              onInput={this.onInput} 
            />
            <p>{`${counter}/${this.allowedLength}`}</p>
          </div>
          <div className="Settings__field">
            <span className="Settings__field-name">Любимый предмет</span>
            <select className="Settings__field-value"></select>
          </div>
          <div className="Settings__field">
            <span className="Settings__field-name">Закрытый профиль</span>
            <span className="Settings__field-value">
              <Toggle 
                onClick={() => toggleLockSettings()} 
                enabled={isLocked} 
              />
            </span>
          </div>
          <div className="Settings__field">
            <span className="Settings__field-name">Подсказки</span>
            <span className="Settings__field-value">
              <Toggle 
                onClick={() => toggleHelpersSettings()} 
                enabled={isHelpersEnabled} 
              />
            </span>
          </div>
          <div className="Settings__footer">
            <hr/>
            <span role="button" className="button button-main button-main-red button-main-red-colorful">Выход</span>
          </div>
        </div>
      </section>
    )
  }
}


Settings.propTypes = propTypes;
Settings.defaultTypes = defaultTypes;

export default Settings;