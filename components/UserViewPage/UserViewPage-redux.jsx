import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserViewPage from './UserViewPage-container';
import * as types from '../../constants/ActionTypes'
import API, { handleErrors } from "../../utils/API";

const userViewPageContainer = props => <UserViewPage {...props} />;

const mapStateToProps = ({ userView }) => ({
  data: userView.data
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserView,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userViewPageContainer);

function fetchUserView(user_id) {
  const start = () => dispatch => dispatch({
    type: "USER_VIEW_START",
  });
  const success = data => dispatch => dispatch({
    type: "USER_VIEW_SUCCESS",
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/user/${user_id}`).then((response) => {
        console.log(response.data);
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
} 