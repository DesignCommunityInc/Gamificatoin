/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../../utils/Utils';
import ExtraContent from './ExtraContent';

const propTypes = {
  level: PropTypes.number,
  achievements_count: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  second_name: PropTypes.string,
  name: PropTypes.string,
  middle_name: PropTypes.string,
};
const defaultProps = {
  level: 0,
  achievements_count: 0,
  second_name: '',
  name: '',
  middle_name: '',
};

class UserContainer extends React.Component {
  componentDidMount() {
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      level,
      name,
      middle_name: middleName,
      second_name: secondName,
      achievements_count,
      isLoading,
      photo,
    } = this.props;
    return (
      <section className="ViewPage Container">
        <div className="ViewPage__main">
          <div className="ViewPage__main__info">
            <div className="ViewPage__main__info__image" style={{ backgroundImage: `url('${photo}')` }} />
            {!isLoading ? (
              <>
                <p className="ViewPage__main__info__first">{secondName}</p>
                <p className="ViewPage__main__info__second">{`${name} ${middleName}`}</p>
              </>
            ) : (
              <>
                <p className="ViewPage__main__info__first" />
                <p className="ViewPage__main__info__second" />
              </>
            )}
          </div>
          <div className="ViewPage__main__extra__content">
            <ExtraContent
              isLoading={isLoading}
              title="Уровень"
              value={level}
            />
            <ExtraContent
              isLoading={isLoading}
              title="Кол-во достижений"
              value={achievements_count}
            />
          </div>
        </div>
      </section>
    );
  }
}

UserContainer.propTypes = propTypes;
UserContainer.defaultProps = defaultProps;

export default UserContainer;
