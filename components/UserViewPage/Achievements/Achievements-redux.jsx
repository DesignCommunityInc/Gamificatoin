import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AchievementContainer from './Achievement-container';
import * as types from '../../../constants/ActionTypes'
import API, { handleErrors } from "../../../utils/API";

const achievementsContainer = props => <AchievementContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
  achievements: achievements.shortAchievements,
  isLoading: achievements.isShortAchievementsLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievementsShort,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);
 
function fetchAchievementsShort(user_id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SHORT_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/user/${user_id}/achievements`).then((response) => {
        console.log(response.data);
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}    