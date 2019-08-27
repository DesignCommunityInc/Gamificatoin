import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreatingPage from './CreatingPage-container';

const creatingPage = props => <CreatingPage {...props} />;

const mapStateToProps = ({ session, gameEditor }) => ({
  userData: session.data,
  filterList: gameEditor.filterList,
  classmates: session.classmates,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(creatingPage);
