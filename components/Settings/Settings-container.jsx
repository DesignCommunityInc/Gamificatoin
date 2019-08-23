/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import Button from '../Button';
import { saveUserSettigs } from './Settings-actions';

const propTypes = {
  userData: PropTypes.shape({}).isRequired,
  visible: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  isProfileLocked: PropTypes.bool.isRequired,
  isHelpersEnabled: PropTypes.bool.isRequired,
  toggleHelpersSettings: PropTypes.func.isRequired,
  toggleSettingsScreen: PropTypes.func.isRequired,
  toggleLockSettings: PropTypes.func.isRequired,
  getUserSettigs: PropTypes.func.isRequired,
  setUserNickName: PropTypes.func.isRequired,
};
const defaultTypes = {
};

class Settings extends React.Component {
  constructor() {
    super();
    this.allowedLength = 25;
    this.handleSettingsToggleKeyPress = this.handleSettingsToggleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getUserSettigs } = this.props;
    getUserSettigs();
    document.addEventListener('keydown', this.handleSettingsToggleKeyPress, false);
  }

  handleChange(event) {
    const { target: { value } = {} } = event;
    const {
      setUserNickName,
      isHelpersEnabled,
      isProfileLocked,
    } = this.props;
    clearTimeout(this.inputTimeout);
    const _value = value.length > this.allowedLength
      ? event.target.value.substring(0, this.allowedLength) : value;
    setUserNickName(_value);
    this.inputTimeout = setTimeout(() => {
      saveUserSettigs({
        S_hints: isHelpersEnabled,
        S_hidden: isProfileLocked,
        nickname: _value,
      });
    }, 1000);
  }

  handleSettingsToggleKeyPress(e) {
    const { visible, toggleSettingsScreen } = this.props;
    if (e.keyCode === 27) return visible && toggleSettingsScreen();
    return true;
  }

  render() {
    const {
      userData: {
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
      nickname,
      counter,
    } = this.props;
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
              <div className="tile__container__image" style={{ backgroundImage: `url('${photo}')` }} />
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
          <Button
            className="Settings__cross"
            onClick={toggleSettingsScreen}
          />
          <div className="Settings__wrapper">
            <div className="Settings__content">
              <div className="Settings__field">
                <input
                  type="text"
                  placeholder="никнейм"
                  value={nickname}
                  onChange={this.handleChange}
                />
                <p>{`${counter}/${this.allowedLength}`}</p>
              </div>
              {/* <div className="Settings__field">
                <span className="Settings__field-name">Любимый предмет</span>
                <select className="Settings__field-value" />
              </div> */}
              <div className="Settings__field">
                <span className="Settings__field-name">Закрытый профиль</span>
                <span className="Settings__field-value">
                  <Toggle
                    onClick={() => toggleLockSettings({
                      S_hidden: !isProfileLocked,
                      S_hints: isHelpersEnabled,
                      nickname,
                    })}
                    enabled={isProfileLocked}
                  />
                </span>
              </div>
              <div className="Settings__field">
                <span className="Settings__field-name">Подсказки</span>
                <span className="Settings__field-value">
                  <Toggle
                    onClick={() => toggleHelpersSettings({
                      S_hints: !isHelpersEnabled,
                      S_hidden: isProfileLocked,
                      nickname,
                    })}
                    enabled={isHelpersEnabled}
                  />
                </span>
              </div>
            </div>
          </div>
          {/* <div className="Settings__footer">
            <hr />
            <Button
              className="button button-main button-main-violet button-main-violet-colorful"
              onClick={() => saveUserSettigs({
                S_hidden: isProfileLocked,
                S_hints: isHelpersEnabled,
                nickname: null,
                S_favorite_subject: null,
              })}
              title="Сохранить"
            />
          </div> */}
        </div>
      </section>
    );
  }
}


Settings.propTypes = propTypes;
Settings.defaultTypes = defaultTypes;

export default Settings;
