import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Timer from '../Timer';
import { logout } from '../../utils/API';
import * as routes from '../../constants/Routes';
import Button from '../Button';
import main from '../../styles/assets/home_settings.png';
import settings from '../../styles/assets/settings_icon.png';
import closeIcon from '../../styles/assets/logout_icon.png';
import classIcon from '../../styles/assets/user_class--violet.png';
import ratingIcon from '../../styles/assets/user_rating--violet.png';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  location: PropTypes.shape({}).isRequired,
  toggleSettingsScreen: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};
const defaultProps = {
  title: '',
};

const Header = ({
  isLoading,
  title,
  data: {
    name,
    last_name: lastName,
    second_name: secondName,
    photo,
    rating,
    class_number: number,
    class_letter: letter,
  } = {},
  toggleSettingsScreen,
  location: { pathname } = {},
  history: {
    goBack,
  } = {},
}) => (
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
                <Button
                  className="button button-main button-main-light"
                  title="Главный экран"
                  onClick={() => {}}
                />
              </Link>
              <Button
                className="button button-main button-main-light"
                title="Настройки"
                onClick={() => {}}
              />
              <Button
                className="button button-main button-main-red"
                title="Выход"
                onClick={() => logout()}
              />
            </div>
          </div>
        ) : ( // is not loading
          <div>
            <div className="tile__container">
              <div className="tile__container__image" style={{ backgroundImage: `url('${photo}')` }} />
              <div className="tile__container__info">
                <h2>{lastName}</h2>
                <h4>{`${name} ${secondName}`}</h4>
                {number && (
                  <Button
                    className="button button-main button-icon button-main-violet button-main-violet-colorful"
                    title={`${number}${letter} класс`}
                    icon={classIcon}
                    onClick={() => {}}
                  />
                )}
                {rating && (
                  <Button
                    className="button button-main button-icon button-main-violet button-main-violet-colorful"
                    title={`ТОП ${rating}`}
                    icon={ratingIcon}
                    onClick={() => {}}
                  />
                )}
              </div>
            </div>
            <div className="settings-container">
              <Link to="/">
                <Button
                  className="button button-main button-icon button-main-light"
                  title="Главный экран"
                  icon={main}
                  onClick={() => {}}
                />
              </Link>
              <Button
                className="button button-main button-icon button-main-light"
                title="Настройки"
                icon={settings}
                onClick={() => toggleSettingsScreen()}
              />
              <Button
                className="button button-main button-icon button-main-red"
                title="Выход"
                icon={closeIcon}
                onClick={() => logout()}
              />
            </div>
          </div>
        )}
      </section>
    ) : (
      <section className="Header">
        {isLoading ? (
          <>
            <Button
              title={title}
              onClick={() => goBack()}
              className="Container__title Container__title-backward"
            />
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
            <Button
              title={title}
              onClick={() => goBack()}
              className="Container__title Container__title-backward"
            />
            <div className="settings-container--short__burger">
              <span />
              <span />
              <span />
            </div>
            <div className="settings-container--short">
              <Link to="/">
                <Button
                  className="button button-main button-main-light"
                  title="Главный экран"
                  onClick={() => {}}
                />
              </Link>
              <Button
                className="button button-main button-main-light"
                onClick={() => toggleSettingsScreen()}
                title="Настройки"
              />
              <Button
                className="button button-main button-main-red"
                onClick={() => logout()}
                title="Выход"
              />
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

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(props => <Header {...props} />);
