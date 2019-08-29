import API, { handleErrors } from '../../../utils/API';
import * as types from '../../../constants/ActionTypes';

// async function invite(id, users, history) {
//   try {
//     await API.post(`/games/${id}/invite`, { users }).then(() => {
//     });
//   } catch (e) {
//     handleErrors(e);
//   }
// }

export default async (params, history) => {
  try {
    await API.post('/games', params).then((response) => {
      const { id } = response.data.data;
      history.push(`/games/${id}`);
      // invite(id, history);
    });
  } catch (e) {
    handleErrors(e);
  }
};

export const generateGame = async (params, history) => {
  try {
    await API.post('/games/generate', params).then(() => {
      history.goBack();
    });
  } catch (e) {
    handleErrors(e);
  }
};

export const generateTeacherGame = async (params, history) => {
  try {
    await API.post('/games/generate', params).then((response) => {
      const { id } = response.data.data;
      history.push(`/games/${id}`);
    });
  } catch (e) {
    handleErrors(e);
  }
};

export const generateVersusGame = async (params, history) => {
  try {
    await API.post('/games/versus', params).then(() => history.goBack());
  } catch (e) {
    handleErrors(e);
  }
};

export const fetchOnlineUsers = () => {
  const success = data => dispatch => dispatch({
    type: types.FETCH_USERS_ONLINE,
    payload: { data },
  });
  return async (dispatch) => {
    try {
      await API.get('/games/users/versus').then((response) => {
        console.log(response);
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
