import * as types from "../constants/ActionTypes";

const initialState = {
  visible: false,
  isHelpersEnabled: true,
  isLocked: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SETTINGS_SCREEN_TOGGLE:
      return {
        ...state,
        visible: !state.visible,
      }
    case types.SETTINGS_HELPERS_TOGGLE:
      return {
        ...state,
        isHelpersEnabled: !state.isHelpersEnabled,
      }
    case types.SETTINGS_LOCK_TOGGLE:
      return {
        ...state,
        isLocked: !state.isLocked,
      }
    case types.SETTINGS_NICKNAME_LENGTH_SET:
      return {
        ...state,
      }
    default:
      return state
  }
}
