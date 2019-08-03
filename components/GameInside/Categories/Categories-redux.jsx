import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chooseCategoryAsync } from '../GameInside-actions';
import Categories from './Categories-container';

const categoryContainer = props => <Categories {...props} />;

const mapStateToProps = ({ gameInside }) => ({
  visibility: gameInside.categoriesVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseCategoryAsync,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(categoryContainer);
