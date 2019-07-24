import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Rate from "../components/Rate";

const rateContainer = props => <Rate {...props} />;

const mapStateToProps = ({ session }) => ({
    data: session.data,
    isLoading: session.isLoading,
})
  
  // const mapDispatchToProps = dispatch => bindActionCreators({
  // }, dispatch)
  
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(rateContainer);