import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClassmatesPage from './ClassmatesPage-container';

const classmatesPage = props => <ClassmatesPage {...props} />;

const mapStateToProps = ({ session }) => ({
  data: session.data,
  isLoading: session.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(classmatesPage);
