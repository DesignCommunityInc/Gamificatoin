import React from 'react'
import { PropTypes } from "prop-types";
import Utils from '../../utils/Utils';
import Categories from './Categories';
import Question from './Question';
import ParticleSpawner from '../../utils/Particles';
const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultTypes = {
    // request: {},
};


class GameInside extends React.Component {
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
    this.props.fetchCategories(1);
    ParticleSpawner(this.spawner, 30, 3, 3);
  }
  render() {
    const { data, isDataLoading, categories, isCategoriesLoading, choosenCategory } = this.props;
    return (
      <main className="page">
        <div 
          className="particle-spawner particle-spawner--from-page-start" 
          ref={(ref) => {
            this.spawner = ref;
          }}
        />
        <Categories 
          isLoading={isCategoriesLoading} 
          categories={categories}
          isCategoryChosen={choosenCategory !== null}
        />
        {choosenCategory !== null && 
          <Question />
        }

      </main>
    );
  }
}


GameInside.propTypes = propTypes;
GameInside.defaultTypes = defaultTypes;

export default GameInside;