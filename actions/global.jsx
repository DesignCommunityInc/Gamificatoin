import * as types from '../constants/ActionTypes';
// GAME
export default ({
  game,
  currentCategory,
  currentQuestion,
  globalAnswerList,
  passList,
},
timer) => {
  const startGameLoading = () => dispatch => dispatch({
    type: types.FETCH_GAME_PLAY_START,
  });
  const successGameLoading = data => dispatch => dispatch({
    type: types.FETCH_GAME_PLAY_SUCCESS,
    payload: { data },
  });
  const chooseGameCategory = category => dispatch => dispatch({
    type: types.CHOOSE_GAME_CATEGORY,
    payload: { category },
  });
  const passCategory = data => dispatch => dispatch({
    type: types.PASS_CATEGORY,
    payload: { data },
  });
  const chooseNextQuestion = data => dispatch => dispatch({
    type: types.SEND_NEXT_QUESTION,
    payload: { data },
  });
  const passAnswer = data => dispatch => dispatch({
    type: types.PASS_ANSWER_FOR_THE_QUESTION,
    payload: { data },
  });
  const setTimer = t => dispatch => dispatch({
    type: types.SET_TIMER,
    payload: { timer: t },
  });
  return (dispatch) => {
    dispatch(startGameLoading());
    dispatch(successGameLoading(game));
    dispatch(setTimer(timer));
    const { subjects } = game;
    const sub = subjects.slice(0);
    const interval = setInterval(() => {
      sub.shift();
      dispatch({ type: types.ANIMATE_GAME_CATEGORIES });
      if (!sub.length) {
        clearInterval(interval);
        dispatch({ type: types.ANIMATE_GAME_CATEGORIES_END });
      }
    }, 300);
    passList.forEach((pass) => {
      dispatch(passCategory(pass));
    });
    dispatch(passAnswer(globalAnswerList));
    dispatch(chooseGameCategory(currentCategory));
    dispatch(chooseNextQuestion(currentQuestion));
  };
};
