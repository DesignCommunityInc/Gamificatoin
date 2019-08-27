import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTeacherGamesShort } from '../../../actions/Games';
import TeacherPage from './TeacherPage-container';

const teacherPageContainer = props => <TeacherPage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
  games: gamelist.shortData,
  IsGamesLoading: gamelist.isShortDataLoading,
  userData: session.data,
  isUserLoading: session.isLoading,
  classmates: session.classmatesShort,
  isClassmatesLoading: session.isClassmatesShortLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGamesShort,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(teacherPageContainer);
