import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchCategories, chooseCategory } from '../../actions/Games';
import { connect } from 'react-redux';
import GameInside from "./GameInside-container";

const insideContainer = props => <GameInside {...props} />;

const mapStateToProps = ({ gameInside }) => ({
    data: gameInside.data,
    categories: gameInside.categories,
    choosenCategory: gameInside.choosenCategory,
    isDataLoading: gameInside.isDataLoading,
    isCategoriesLoading: gameInside.isCategoriesLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCategories,
  chooseCategory,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(insideContainer);