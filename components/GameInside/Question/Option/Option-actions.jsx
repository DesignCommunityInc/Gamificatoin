import * as types from '../../../../constants/ActionTypes';

export const throwAnswer = optionId => dispatch => dispatch({
  type: types.THROW_ANSWER_OPTION,
  payload: { data: optionId },
});

export const setOptionfocused = focused => dispatch => dispatch({
  type: types.SET_OPTION_FOCUSED,
  payload: { data: focused },
});

export const setReplacePossibility = possibility => dispatch => dispatch({
  type: types.SET_REPLACE_POSSIBILITY,
  payload: { data: possibility },
});

/**
 * swap any element from one place to another
 * @param {number} element -> current element (index) that needs to place anywhere
 * @param {number} foothold -> element index that shows where it need to place
 * @param {boolean} side -> boundings, shows which side to place element
 */
export const replaceOption = (array, elementIndex, footholdIndex /* , side */) => {
  if (elementIndex < footholdIndex) {
    array.splice(footholdIndex, 0, array.indexOf(elementIndex));
    array.splice(elementIndex, 1);
  } else {
    array.splice(elementIndex, 1);
    array.splice(footholdIndex, 0, array.indexOf(elementIndex));
  }
  return dispatch => dispatch({
    type: types.REPLACE_ANSWER_OPTION,
    payload: { data: array },
  });
};
