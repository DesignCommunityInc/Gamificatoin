import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '../../../Button';

const propTypes = {
  users: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
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
      onClick,
    } = this.props;
    const { visible } = this.state;
    return (
      <>
        <div className={`useradd absolute ${visible ? 'useradd--visible' : ''}`}>
          {users && Object.keys(users).map(number => (
            <div key={uid()}>
              {Object.keys(users[number]).map(letter => (
                <div key={uid()}>
                  <div className="useradd__splitter-1">{`${number}${letter}`}</div>
                  {users[number][letter].map(({
                    user_name,
                    user_second_name,
                    user_last_name,
                  }, idx) => (
                    <div
                      key={uid()}
                      className="participant"
                      onClick={() => onClick(users[number][letter][idx].user_id)}
                      role="button"
                      onKeyDown={() => {}}
                      tabIndex="0"
                    >
                      <div className="participant__info">
                        <p className="participant__info__middlename">{user_second_name}</p>
                        <p className="participant__info__name__secondname">{`${user_name} ${user_last_name}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button
          className={`useradd__open-button button button-main button-main-light button-main-light-colorful button ${visible ? 'useradd__open-button--active' : ''}`}
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
