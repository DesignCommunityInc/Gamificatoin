import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchGamePreview } from '../../../actions/Games';
import GamePreview from './GamePreview-container';

const previewContainer = props => <GamePreview {...props} />;

const mapStateToProps = ({ gamepreview, settings, session }) => ({
  preview: gamepreview.data,
  isLoading: gamepreview.isLoading,
  error: gamepreview.error,
  helpers: settings.isHelpersEnabled,
  classmates: session.classmatesShort,
  isClassmatesLoading: session.isClassmatesShortLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGamePreview,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(previewContainer);
