import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';

export default (sender) => {
  const success = data => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SUCCESS,
    payload: { data },
  });
  const failure = () => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_FAILURE,
  });
  return async (dispatch) => {
    try {
      await API.get('/achievements', { params: { sender } }).then((response) => {
        // console.log(response);
        if (response.status === 200) dispatch(success(response.data));
        if (response.status === 204) dispatch(failure());
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};

export const sortChooser = (field, asc) => (dispatch) => {
  const sort = {};
  sort[`${field}`] = asc ? 'asc' : 'desc';
  dispatch({
    type: types.SORT_ACHIEVEMENTS,
    payload: { sort },
  });
};

export const filterToggler = (field, filter) => (dispatch) => {
  if (filter.indexOf(field) !== -1) filter.splice(filter.indexOf(field), 1);
  else filter.push(field);
  dispatch({
    type: types.FILTER_ACHIEVEMENTS,
    payload: { filter },
  });
};
