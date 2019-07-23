import * as types from '../constants/ActionTypes'  
import API, { handleErrors } from '../utils/API';

// ACHIEVEMENTS SHORT
export function fetchAchievementsShort() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_ACHIEVEMENTS_SHORT_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_ACHIEVEMENTS_SHORT_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
      dispatch(start());
      try {
        await API.get('/achievements?info=short')
        .then(response => {
          dispatch(success(response.data));
        })
      }
      catch (e) {
        handleErrors(e)
      };
  };
}
// ACHIEVEMENTS
export function fetchAchievements() {
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_ACHIEVEMENTS_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
      try {
        let achievements = [];
        for(let i = 0; i < 20; i++) {
          achievements.push({
            name: "Lorem ipsum",
            description: "Lorem ipsum",
            reward: 100,
            progress: 50,
          });
        }
        dispatch(success(achievements));
        return {
          stop: true,
        }
      }
      catch (e) {
        handleErrors(e)
      };
  };
}
// ACHIEVEMENTS SPECIAL
export function fetchSpecialAchievements() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_SPECIAL_ACHIEVEMENTS_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_SPECIAL_ACHIEVEMENTS_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
      dispatch(start());
      try {
        let data = {
          last: {
            id: 1,
            name: "Lorem ipsum",
            description: "Lorem ipsum",
            reward: 100,
            progress: 50,
          },
          progress: [],
        };
        for(let i = 0; i < 2; i++) {
          data.progress.push({
            name: "Lorem ipsum",
            description: "Lorem ipsum",
            reward: 100,
            progress: 50,
          });
        }
        dispatch(success(data));
      }
      catch (e) {
        handleErrors(e);
      };
  };
}