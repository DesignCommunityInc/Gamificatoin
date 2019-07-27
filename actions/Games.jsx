import * as types from '../constants/ActionTypes'  
import API, { handleErrors } from '../utils/API';
// USER'S GAME LIST 
export function fetchUserGames() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_USER_GAMES_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_USER_GAMES_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      await API.get('/games')
      .then(
        response => dispatch(success(response.data)))
    }
    catch (e) {
      handleErrors(e);
    };
  };
}
// USER'S SHORT GAME LIST
export function fetchUserGamesShort() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_USER_GAMES_SHORT_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_USER_GAMES_SHORT_SUCCESS,
        payload: { data },
      })
    }
  }
  // axios here
  return async dispatch => {
    dispatch(start());
    try {
      let response = await API.get('/games?info=short');
      dispatch(success(response.data));
    }
    catch (e) {
      handleErrors(e);
    };
  };
}
// PREVIEW
export function fetchGamePreview(id) {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_GAME_PREVIEW_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_GAME_PREVIEW_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      await API.get(`/game/${id}`)
      .then(response => {
        dispatch(success(response.data))
      });

      const img = "https://blog.schoolspecialty.com/wp-content/uploads/2017/04/How-to-Help-Your-Students-Overcome-Math-Anxiety-1200x624.jpg";
      const game = { img, results: 43, name: "География", difficulty: 2, questions: 21, time: 45, experience: 1200 };
      dispatch(success(game));
    }
    catch (e) {
      handleErrors(e);
    };
  };
}
// GAME
export function fetchGamePlay(id) {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_GAME_PLAY_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_GAME_PLAY_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      await API.get(`/game/${id}/play`)
      .then(response => {
        console.log(response.data);
        dispatch(success(response.data))
      });
    }
    catch (e) {
      handleErrors(e);
    };
  };
}

export function fetchCategories(id) {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_GAME_CATEGORIES_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_GAME_CATEGORIES_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      const math = { title: "Математика " };
      const fith = { title: "Физика" };
      const geo = { title: "География" };
      const bio = { title: "Биология" };
      const chem = { title: "Химия" };
      const categories = [
        math,
        fith,
        geo,
        bio,
      ];
      setTimeout(() => {
        dispatch(success(categories));
      }, 1000);
    }
    catch (e) {
      handleErrors(e);
    };
  };
}

export const chooseCategory = (category) => {
  return dispatch => {
    dispatch({ 
      type: types.CHOOSE_GAME_CATEGORY,
      payload: { category }
    })
  }
}
// export const gameUnmount = (category) => {
//   return dispatch => {
//     dispatch({ type: types.GAME_UNMOUNT })
//   }
// }
// List of games
export function fetchGameList() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_USER_GAMES_START })
    }
  }
  const success = data => {
    return dispatch => {
      dispatch({
        type: types.FETCH_USER_GAMES_SUCCESS,
        payload: { data },
      })
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      await API.get(`/games`)
      .then(response => {
        dispatch(success(response.data))
      });
    }
    catch (e) {
      handleErrors(e);
    };
  };
}


