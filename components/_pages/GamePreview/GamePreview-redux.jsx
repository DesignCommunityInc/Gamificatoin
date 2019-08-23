import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchGamePreview } from '../../../actions/Games';
import GamePreview from './GamePreview-container';

const previewContainer = props => <GamePreview {...props} />;

const mapStateToProps = ({ gamepreview, session }) => ({
  preview: gamepreview.data,
  isLoading: gamepreview.isLoading,
  error: gamepreview.error,
  classmates: session.classmates,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGamePreview,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(previewContainer);
