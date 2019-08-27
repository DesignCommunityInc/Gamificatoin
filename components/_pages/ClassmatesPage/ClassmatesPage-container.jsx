import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Header from '../../Header';
import Settings from '../../Settings';
import Classmate from './Classmate';

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  userData: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserClassmates: PropTypes.func.isRequired,
};

class ClassmatesPage extends React.Component {
  componentDidMount() {
    const {
      fetchUserClassmates,
    } = this.props;
    fetchUserClassmates();
  }

  render() {
    const {
      userData: {
        roles,
      } = {},
      data,
      isLoading,
    } = this.props;
    let role = null;
    if (roles) {
      [role] = Object.keys(roles);
    }
    return (
      <main className="page">
        <Settings />
        <Header title="Мой класс" />
        <section className="Achievements Container">
          <div className="Achievements__container">
            {role === '5' && (
              <>
                {isLoading ? ([...Array(8)].map(() => (
                  <Classmate
                    key={uid()}
                    isLoading={isLoading}
                  />
                ))) : (
                  data.map(mate => (
                    <Classmate
                      key={uid()}
                      {...mate}
                      isLoading={isLoading}
                    />
                  )))}
              </>
            )}
            {role === '6' && (
              <>
                {isLoading ? ([...Array(8)].map(() => (
                  <Classmate
                    key={uid()}
                    isLoading={isLoading}
                  />
                ))) : (
                  Object.keys(data).map(number => (
                    <div key={uid()}>
                      {Object.keys(data[number]).map(letter => (
                        <div key={uid()}>
                          <div className="Achievements__splitter-1">{`${number}${letter}`}</div>
                          {data[number][letter].map(user => (
                            <Classmate
                              key={uid()}
                              {...user}
                              isLoading={isLoading}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  )))}
              </>
            )}
          </div>
        </section>
      </main>
    );
  }
}

ClassmatesPage.propTypes = propTypes;

export default ClassmatesPage;
