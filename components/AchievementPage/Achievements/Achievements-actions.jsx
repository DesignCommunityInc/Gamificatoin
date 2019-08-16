import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';

export default ({
  page,
  sort,
  filter,
  desc,
}) => {
  const success = data => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SUCCESS,
    payload: { data },
  });
  const empty = () => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_EMPTY,
  });
  const failure = () => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_FAILURE,
  });
  return async (dispatch) => {
    try {
      await API.get('/achievements', {
        params: {
          page,
          sort: [sort, desc],
          filter,
        },
      }).then((response) => {
        if (response.status === 200) dispatch(success(response.data));
        if (response.status === 204) dispatch(empty(null));
      });
    } catch (e) {
      handleErrors(e);
      dispatch(failure(e));
    }
  };
};

export const clearAchievements = () => dispatch => dispatch({
  type: types.CLEAR_ACHIEVEMENTS,
});

export const sortChooser = sort => dispatch => dispatch({
  type: types.SORT_ACHIEVEMENTS,
  payload: { sort },
});

export const filterToggler = (field, filter) => (dispatch) => {
  if (filter.indexOf(field) !== -1) filter.splice(filter.indexOf(field), 1);
  else filter.push(field);
  dispatch({
    type: types.FILTER_ACHIEVEMENTS,
    payload: { filter },
  });
};

export const toggleSortDirection = () => dispatch => dispatch({
  type: types.TOGGLE_SORT_DIRECTION,
});
