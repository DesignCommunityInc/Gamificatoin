import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserRate } from '../../actions/Session';
import Rate from './Rate-container';

const rateContainer = props => <Rate {...props} />;

const mapStateToProps = ({ session }) => ({
  data: session.data,
  isLoading: session.isLoading,
  rate: session.rate,
  isRateLoading: session.isRateLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserRate,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(rateContainer);
