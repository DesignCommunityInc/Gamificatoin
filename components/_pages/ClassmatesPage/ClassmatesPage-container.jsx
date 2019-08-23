import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import { Link } from 'react-router-dom';
import Settings from '../../Settings';
import Utils from '../../../utils/Utils';

const propTypes = {
};

class ClassmatesPage extends React.Component {
  componentDidMount() {
    // const {
    //   fetchMainAchievements,
    // } = this.props;
    // fetchMainAchievements();
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      data: {
        name,
        second_name,
        last_name,
        photo,
      } = {},
      isLoading,
    } = this.props;
    return (
      <main className="page">
        <Settings />
        <Header title="Мой класс" />
        {/* {isLoading ? (
          <section className="Classmates Container">
            <div className="Container__title Container__title-forward Container__title-loading" />
            <div className="Achievements__container">
              {[...Array(8)].map(() => (
                <Achievement
                  isLoading
                  key={uid()}
                />
              ))}
              {details && (
                <div role="button" className="button button-info button-forward">
                  Эти и еще много достижений, которые Вы можете открыть, ждут Вас!
                </div>
              )}
            </div>
          </section>
        ) : ( */}
        <section className="Classmates Container">
          <div className="Classmates__container Classmates__container--large">
            <div className="mate">
              <div className="mate__icon__container">
                <span className="mate__icon" style={{ backgroundImage: `url('${photo}')` }} />
              </div>
              <div className="mate__info">
                <h4>{name}</h4>
                <h5>{`${second_name} ${last_name}`}</h5>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

ClassmatesPage.propTypes = propTypes;

export default ClassmatesPage;
