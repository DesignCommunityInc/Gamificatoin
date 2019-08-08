import * as types from '../../../../constants/ActionTypes';
import * as questionTypes from '../../../../constants/QuestionTypes';

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
 * @param {array} array -> array that contains all titles
 * @param {array} list -> one of array items (example: list = array[number])
 * @param {number} element -> current element (index) that needs to place anywhere
 * @param {number} foothold -> element index that shows where it need to place
 * @param {boolean} side -> boundings, shows which side to place element
 */
export const replaceOption = (array, list, elementIndex, footholdIndex, type) => {
  const holder = list[footholdIndex];
  list.splice(footholdIndex, 1, list[elementIndex]); // [a, b, c, d] [0, 1, 2, 3]
  list.splice(elementIndex, 1, holder);
  if (array) array.splice(-1, 1, list);
  return dispatch => dispatch({
    type: types.REPLACE_ANSWER_OPTION,
    payload: {
      data: type === questionTypes.MATCH ? array : list,
      type,
    },
  });
};
