import React from 'react';
import { bindActionCreators } from 'redux';
import { chooseCategory } from '../../../actions/Games';
import { connect } from 'react-redux';
import Categories from "./Categories-container";

const categoryContainer = props => <Categories {...props} />;


const mapDispatchToProps = dispatch => bindActionCreators({
  chooseCategory,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(categoryContainer);