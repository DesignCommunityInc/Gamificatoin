import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';
// GAME
export function fetchGamePlay(id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_GAME_PLAY_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_GAME_PLAY_SUCCESS,
    payload: { data },
  });
  const failure = data => dispatch => dispatch({
    type: types.FETCH_GAME_PLAY_FAILURE,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/game/${id}/play`).then((response) => {
        const { subjects } = response.data;
        const sub = subjects.slice(0);
        dispatch(success(response.data));
        const interval = setInterval(() => {
          sub.shift();
          dispatch({ type: types.ANIMATE_GAME_CATEGORIES });
          if (!sub.length) {
            clearInterval(interval);
            dispatch({ type: types.ANIMATE_GAME_CATEGORIES_END });
          }
        }, 300);
      });
    } catch (e) {
      if (e.response && e.response.status === 400) dispatch(failure(e.response.data.message));
      handleErrors(e);
    }
  };
}
// CHOOSE CATEGORY
export const chooseCategory = ({ category, questions }) => (dispatch) => {
  dispatch({
    type: types.CHOOSE_GAME_CATEGORY,
    payload: { category },
  });
  dispatch({
    type: types.SEND_NEXT_QUESTION,
    payload: { data: questions[category][0] },
  });
};
export const chooseCategoryAsync = ({ category, questions }) => async (dispatch) => {
  setTimeout(() => {
    dispatch({ type: types.TOGGLE_CATEGORIES_VISIBILITY });
    setTimeout(() => {
      dispatch({
        type: types.CHOOSE_GAME_CATEGORY,
        payload: { category },
      });
      dispatch({
        type: types.SEND_NEXT_QUESTION,
        payload: { data: questions[category][0] },
      });
    }, 500);
  }, 2000);
};
export const endTheGame = () => dispatch => dispatch({
  type: types.END_THE_GAME,
});

// ANSWER THE QUESTION
export function sendAnswer({
  answer,
  questions,
  subjects,
  currentQuestion,
  currentCategory,
  passList,
}) {
  const sendNextQuestion = data => dispatch => dispatch({
    type: types.SEND_NEXT_QUESTION,
    payload: { data },
  });
  const passAnswer = data => dispatch => dispatch({
    type: types.PASS_ANSWER_FOR_THE_QUESTION,
    payload: { data },
  });
  const passCategory = data => dispatch => dispatch({
    type: types.PASS_CATEGORY,
    payload: { data },
  });
  const currentQuestionList = questions[currentCategory];
  let nextQuestion = null;
  currentQuestionList.forEach((question, idx) => {
    const q = JSON.stringify(question);
    const cq = JSON.stringify(currentQuestion);
    if (q === cq) {
      nextQuestion = currentQuestionList[idx + 1];
    }
  });
  return async (dispatch) => {
    dispatch(passAnswer(answer));
    // check if next question in current category exist
    if (nextQuestion) {
      dispatch(sendNextQuestion(nextQuestion));
      return;
    }
    dispatch(passCategory(currentCategory));
    // if there are no questions in current category
    let nextCategory = null;
    const categories = Object.values(subjects);
    // here it needs to randomize categories
    categories.forEach((category) => {
      if ((passList.concat(currentCategory)).indexOf(category) === -1) nextCategory = category;
    });
    if (nextCategory) {
      dispatch(chooseCategory({ category: nextCategory, questions }));
      return;
    }
    dispatch(endTheGame());
  };
}

export function sendGameResults(id, answers) {
  const start = () => dispatch => dispatch({
    type: types.SEND_GAME_RESULTS_START,
  });
  const success = data => dispatch => dispatch({
    type: types.SEND_GAME_RESULTS_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.post(`/game/${id}/complete`, answers).then((response) => {
        localStorage.removeItem('game');
        localStorage.removeItem('timer');
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}

// export const clearGameSession = () => dispatch => dispatch({
//   type: types.CLEAR_GAME_SESSION,
// });
