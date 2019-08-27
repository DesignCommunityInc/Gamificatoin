import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '../../../Button';

const propTypes = {
  users: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  active: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
};

class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  render() {
    const {
      users,
      active,
      onClick,
    } = this.props;
    const { visible } = this.state;
    return (
      <>
        <div className={`useradd useradd--visible ${visible ? 'useradd--active' : ''}`}>
          {active.length === 0 && <span className="useradd--empty">Участники еще не добавлены</span>}
          {active.length > 0 && (
            active.map(({
              name,
              second_name,
              middle_name,
              photo,
            }) => (
              <div
                key={uid()}
                className="useradd__item selectable"
                role="button"
                tabIndex="0"
                onKeyDown={() => {}}
              >
                <div className="useradd__icon__container">
                  <span className="useradd__icon" style={{ backgroundImage: `url('${photo}')` }} />
                </div>
                <div className="useradd__info">
                  <h4>{second_name}</h4>
                  <h5>{`${name} ${middle_name}`}</h5>
                </div>
              </div>
            )))}
        </div>
        <div className={`useradd absolute ${visible ? 'useradd--visible' : ''}`}>
          {users && users.map(({
            name,
            second_name,
            middle_name,
            photo,
          }, idx) => (
            <div
              key={uid()}
              className={`useradd__item selectable ${active.indexOf(users[idx]) !== -1 ? 'selectable--active' : ''}`}
              role="button"
              tabIndex="0"
              onClick={() => onClick(users[idx])}
              onKeyDown={() => {}}
            >
              <div className="useradd__icon__container">
                <span className="useradd__icon" style={{ backgroundImage: `url('${photo}')` }} />
              </div>
              <div className="useradd__info">
                <h4>{second_name}</h4>
                <h5>{`${name} ${middle_name}`}</h5>
              </div>
            </div>
          ))}
        </div>
        <Button
          className={`useradd__open-button button button-main button-main-light button-main-light-colorful button-iconless ${visible ? 'useradd__open-button--active' : ''}`}
          onClick={() => this.setState({ visible: !visible })}
          title={`${visible ? 'Закрыть' : 'Выбрать участников'}`}
        />
      </>
    );
  }
}

UserAdd.propTypes = propTypes;
UserAdd.defaultProps = defaultProps;

export default UserAdd;
