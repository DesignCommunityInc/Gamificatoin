import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchUserGamesShort } from '../../actions/Games';
import { fetchTeacherGamesShort } from '../../actions/Games';
import { fetchUserProfile } from '../../actions/Session';
import { connect } from 'react-redux';
import Userpage from "./Userpage-container";

const userPageContainer = props => <Userpage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
    games: gamelist.shortData,
    IsGamesLoading: gamelist.isShortDataLoading,
    userData: session.data,
    isUserLoading: session.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserGamesShort,
  fetchTeacherGamesShort,
  fetchUserProfile,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userPageContainer);