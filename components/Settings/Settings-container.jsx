import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';

const propTypes = {
  userData: PropTypes.shape({}).isRequired,
  visible: PropTypes.bool.isRequired,
  isProfileLocked: PropTypes.bool.isRequired,
  isHelpersEnabled: PropTypes.bool.isRequired,
  toggleHelpersSettings: PropTypes.func.isRequired,
  toggleSettingsScreen: PropTypes.func.isRequired,
  toggleLockSettings: PropTypes.func.isRequired,
};
const defaultTypes = {
};

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      allowedLength: 25,
      counter: 0,
    };
    this.handleSettingsToggleKeyPress = this.handleSettingsToggleKeyPress.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleSettingsToggleKeyPress, false);
  }

  onInput(event) {
    let { target: { value } = {} } = event;
    const { allowedLength } = this.state;
    if (value.length <= allowedLength) {
      this.setState({ counter: value.length });
    } else {
      value = event.target.value.substring(0, allowedLength);
    }
  }

  handleSettingsToggleKeyPress(e) {
    const { visible, toggleSettingsScreen } = this.props;
    switch (e.keyCode) {
      case 79: // O
        return !visible && toggleSettingsScreen();
      case 27: // Esc
        return visible && toggleSettingsScreen();
      default: return false;
    }
  }

  render() {
    const {
      userData: {
        nickname,
        name,
        last_name: lastName,
        second_name: patronymic,
        photo,
      } = {},
      visible,
      isProfileLocked,
      isHelpersEnabled,
      toggleSettingsScreen,
      toggleHelpersSettings,
      toggleLockSettings,
      // counter,
    } = this.props;
    const { counter, allowedLength } = this.state;
    const className = `Settings ${visible ? 'Settings-shown' : ''}`;

    return (
      <section className={className}>
        <div
          className="Settings__background"
          onClick={() => toggleSettingsScreen()}
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
        />

        <div className="Settings__container">
          <div className="Settings__user-inf">
            <div className="tile__container">
              <div className="tile__container__image" style={{ backgroundImage: `url('${photo}')` }}/>
              <div className="tile__container__info">
                <h2>{lastName}</h2>
                <h4>{`${name} ${patronymic}`}</h4>
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
            onKeyDown={() => {}}
            tabIndex="0"
            role="button"
          />
          <div className="Settings__field">
            <input
              type="text"
              placeholder="никнейм"
              value={nickname}
              onInput={this.onInput}
            />
            <p>{`${counter}/${allowedLength}`}</p>
          </div>
          <div className="Settings__field">
            <span className="Settings__field-name">Любимый предмет</span>
            <select className="Settings__field-value" />
          </div>
          <div className="Settings__field">
            <span className="Settings__field-name">Закрытый профиль</span>
            <span className="Settings__field-value">
              <Toggle
                onClick={() => toggleLockSettings()}
                enabled={isProfileLocked}
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
            <hr />
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
