/* eslint-disable camelcase */
import * as types from '../../../../constants/ActionTypes';
import API, { handleErrors } from '../../../../utils/API';

// eslint-disable-next-line camelcase
export const fetchQuestionList = ({ game_id, page, filters }) => {
  const start = () => dispatch => dispatch({
    type: types.FETCH_QUESTION_LIST_START,
    payload: { data: page },
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_QUESTION_LIST_SUCCESS,
    payload: { data },
  });

  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/questions', {
        params: {
          game_id,
          page,
          filters,
        },
      }).then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};

export const fetchFilterList = () => {
  const start = () => dispatch => dispatch({
    type: types.FETCH_QUESTION_LIST_FILTERS_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_QUESTION_LIST_FILTERS_SUCCESS,
    payload: { data },
  });

  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/questions/filters').then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};

export const filterAction = (field, id, filter) => (dispatch) => {
  const newFilter = filter;
  const contains = newFilter[field] !== undefined;
  if (!contains) newFilter[field] = id;
  else newFilter[field] = undefined;
  dispatch({
    type: types.QUESTION_LIST_FILTER_PASS,
    payload: { data: newFilter },
  });
};

export const saveQuestions = ({ game_id, questions }) => {
  const success = () => dispatch => dispatch({
    type: types.QUESTION_LIST_VISIBILITY_TOGGLE,
  });

  return async (dispatch) => {
    try {
      await API.post(`games/${game_id}/questions`, { questions }).then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};

export const toggleQuestionListVisibility = () => dispatch => dispatch({
  type: types.QUESTION_LIST_VISIBILITY_TOGGLE,
});

export const addQuestionToList = question => dispatch => dispatch({
  type: types.QUESTION_LIST_ADD,
  payload: { data: question },
});

export const removeQuestionFromList = question => dispatch => dispatch({
  type: types.QUESTION_LIST_REMOVE,
  payload: { data: question },
});
