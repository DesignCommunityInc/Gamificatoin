// import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';

async function name(id, history) {
  await API.post(`/games/${id}/invite`, { users: ['10893'] }).then(() => {
    history.push(`/games/${id}`);
  });
}

export default (params, history) => async (dispatch) => {
  try {
    await API.post('/games', params).then((response) => {
      const { id } = response.data.data;
      try {
        name(id, history);
      } catch (e) {
        handleErrors(e);
      }
    });
  } catch (e) {
    handleErrors(e);
  }
};

export const generateGame = (params, history) => async (dispatch) => {
  try {
    await API.post('/games/generate', params).then((response) => {
      history.goBack();
    });
  } catch (e) {
    handleErrors(e);
  }
};
