import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchUserClassmates from './ClassmatesPage-actions';
import ClassmatesPage from './ClassmatesPage-container';

const classmatesPage = props => <ClassmatesPage {...props} />;

const mapStateToProps = ({ session }) => ({
  userData: session.data,
  data: session.classmates,
  isLoading: session.isClassmatesLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserClassmates,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(classmatesPage);
