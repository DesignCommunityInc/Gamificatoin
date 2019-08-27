import API, { handleErrors } from '../../../utils/API';

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
