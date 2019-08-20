import * as types from '../../constants/ActionTypes';
import API, { handleErrors } from '../../utils/API';

// eslint-disable-next-line camelcase
export const createGame = ( params, history ) => {
  return async (dispatch) => {
    try {
      await API.post('/games', params).then((response) => {
        let id = response.data.data.id;
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
};

async function name(id, history) {
  await API.post(`/games/${id}/invite`, {users: ["10893"]}).then((response) => {
    console.log(response);
    history.push("/games/"+id);
  });
}