import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/Utils';
import { withRouter } from 'react-router-dom';
import ExtraContent from './ExtraContent';

const propTypes = {
};

const defaultProps = {
  gamesError: false,
};

class UserPage extends React.Component {
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      level,
      achievements_count,
    } = this.props;
    return (
      <section className="ViewPage Container">
        <div className="ViewPage__main">
          <div className="ViewPage__main__info">
            <div className="ViewPage__main__info__image"></div>
            <p className="ViewPage__main__info__first">Кочетков</p>
            <p className="ViewPage__main__info__second">Антов Антонович</p>
          </div>
          <div className="ViewPage__main__extra__content">
            <ExtraContent 
              title="Уровень"
              value={level}
            />
            <ExtraContent 
              title="Кол-во достижений"
              value={achievements_count}
            />
          </div>
        </div>
      </section>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default withRouter(props => <UserPage {...props} />) ;
