import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchGamePreview } from '../../actions/Games';
import { connect } from 'react-redux';
import GamePreview from "./GamePreview-container";

const previewContainer = props => <GamePreview {...props} />;

const mapStateToProps = ({ gamepreview }) => ({
    preview: gamepreview.data,
    isLoading: gamepreview.isLoading,
    error: gamepreview.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGamePreview,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(previewContainer);