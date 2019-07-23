import React from 'react'
import { PropTypes } from "prop-types";
import Utils from '../../utils/Utils';
import Categories from './Categories';
import Question from './Question';
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
  }
  render() {
    const { data, isDataLoading, categories, isCategoriesLoading, choosenCategory } = this.props;
    console.log(this.props);
    return (
      <main className="page">
        {/* <Categories 
          isLoading={isCategoriesLoading} 
          categories={categories}
          isCategoryChosen={choosenCategory !== null}
        /> */}
        {/* {choosenCategory !== null &&  */}
          <Question />
        {/* } */}

      </main>
    );
  }
}


GameInside.propTypes = propTypes;
GameInside.defaultTypes = defaultTypes;

export default GameInside;