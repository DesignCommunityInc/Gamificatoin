import React from 'react'
// import { withRouter } from 'react-router-dom'
// import { PropTypes } from "prop-types";
import Utils from '../../utils/Utils';
import Categories from './Categories';
import Question from './Question';
import ParticleSpawner from '../../utils/Particles';
const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultProps = {
    // request: {},
};


class GameInside extends React.Component {
  state = {
    currentQuestion: ''
  }
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
    this.props.fetchGamePlay(1);
    ParticleSpawner(this.spawner, 30, 3, 3);
  }
  // componentWillUnmount() {
  //   this.props.gameUnmount();
  // }
  render() {
    const { data, isLoading, choosenCategory } = this.props;
    return (
      <main className="page">
        <div 
          className="particle-spawner particle-spawner--from-page-start" 
          ref={(ref) => {
            this.spawner = ref;
          }}
        />
        {!isLoading && (
          <div>
            <Categories
              categoriesList={data.subjects}
              isCategoryChosen={choosenCategory}
            />
            {choosenCategory && 
              <Question />
            }
          </div>
        )}
      </main>
    );
  }
}


// GameInside.propTypes = propTypes;
// GameInside.defaultTypes = defaultTypes;

export default GameInside;