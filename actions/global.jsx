import * as types from '../constants/ActionTypes';
// GAME
export default ({
  game,
  currentCategory,
  currentQuestion,
  globalAnswerList,
  passList,
}) => {
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
  console.log(globalAnswerList, 123);
  return (dispatch) => {
    dispatch(startGameLoading());
    dispatch(successGameLoading(game));
    dispatch(chooseGameCategory(currentCategory));
    dispatch(passCategory(passList));
    dispatch(chooseNextQuestion(currentQuestion));
    dispatch(passAnswer(globalAnswerList));
  };
};
// export const chooseCategoryAsync = ({ category, questions }) => async (dispatch) => {
//   setTimeout(() => {
//     dispatch({ type: types.TOGGLE_CATEGORIES_VISIBILITY });
//     setTimeout(() => {
//       dispatch({
//         type: types.CHOOSE_GAME_CATEGORY,
//         payload: { category },
//       });
//       dispatch({
//         type: types.SEND_NEXT_QUESTION,
//         payload: { data: questions[category][0] },
//       });
//     }, 500);
//   }, 2000);
// };
// // ANSWER THE QUESTION
// export const endTheGame = () => dispatch => dispatch({
//   type: types.END_THE_GAME,
// });
// export function sendAnswer({
//   answer,
//   questions,
//   subjects,
//   currentQuestion,
//   currentCategory,
//   passList,
// }) {
//   const sendNextQuestion = data => dispatch => dispatch({
//     type: types.SEND_NEXT_QUESTION,
//     payload: { data },
//   });
//   const passAnswer = data => dispatch => dispatch({
//     type: types.PASS_ANSWER_FOR_THE_QUESTION,
//     payload: { data },
//   });
//   const passCategory = data => dispatch => dispatch({
//     type: types.PASS_CATEGORY,
//     payload: { data },
//   });
//   const currentQuestionList = questions[currentCategory];
//   const nextQuestion = currentQuestionList[currentQuestionList.indexOf(currentQuestion) + 1];
//   return async (dispatch) => {
//     dispatch(passAnswer(answer));
//     // localStorage.setItem('answer')
//     // check if next question in current category exist
//     if (nextQuestion) {
//       dispatch(sendNextQuestion(nextQuestion));
//       return;
//     }
//     dispatch(passCategory(currentCategory));
//     // if there are no questions in current category
//     let nextCategory = null;
//     const categories = Object.values(subjects);
//     // here it needs to randomize categories
//     categories.forEach((category) => {
//       if ((passList.concat(currentCategory)).indexOf(category) === -1) nextCategory = category;
//     });
//     if (nextCategory) {
//       dispatch(chooseCategory({ category: nextCategory, questions }));
//       return;
//     }
//     dispatch(endTheGame());
//   };
// }

// export function sendGameResults(id, answers) {
//   const start = () => dispatch => dispatch({
//     type: types.SEND_GAME_RESULTS_START,
//   });
//   const success = data => dispatch => dispatch({
//     type: types.SEND_GAME_RESULTS_SUCCESS,
//     payload: { data },
//   });
//   return async (dispatch) => {
//     dispatch(start());
//     try {
//       await API.post(`/game/${id}/complete`, answers).then((response) => {
//         console.log(response);
//         dispatch(success(response.data));
//       });
//     } catch (e) {
//       handleErrors(e);
//     }
//   };
// }