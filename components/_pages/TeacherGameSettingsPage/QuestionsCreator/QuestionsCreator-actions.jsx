/* eslint-disable camelcase */
import * as types from '../../../../constants/ActionTypes';
import API, { handleErrors } from '../../../../utils/API';

export const toggleQuestionCreatorVisibility = () => dispatch => dispatch({
  type: types.QUESTION_CREATOR_VISIBILITY_TOGGLE,
});

export const saveQuestion = params => async (dispatch) => {
  try {
    console.log(params);
    await API.post('/questions', params).then((response) => {
      console.log(response);
      dispatch(toggleQuestionCreatorVisibility());
    });
  } catch (e) {
    handleErrors(e);
  }
};
