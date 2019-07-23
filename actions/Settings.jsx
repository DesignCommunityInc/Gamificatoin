import * as types from '../constants/ActionTypes'

export const toggleSettingsScreen = () => {
    return dispatch => {
        dispatch({
            type: types.SETTINGS_SCREEN_TOGGLE,
        })
    }
}
export const toggleLockSettings = () => {
    return dispatch => {
        dispatch({
            type: types.SETTINGS_LOCK_TOGGLE,
        })
    }
}
export const toggleHelpersSettings = () => {
    return dispatch => {
        dispatch({
            type: types.SETTINGS_HELPERS_TOGGLE,
        })
    }
}
export const setNickNameLength = ({ length }) => {
    return dispatch => {
        dispatch({
            type: types.SETTINGS_NICKNAME_LENGTH_SET,
            length,
        })
    }
}