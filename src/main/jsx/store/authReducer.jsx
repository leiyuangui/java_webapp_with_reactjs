import * as types from './types'

var initialState = {
  userAuthed: false,
  loading: false
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_USER:
      return Object.assign({}, state, {
        userAuthed: false,
        user: null,
        loading: true
      })

    case types.RECEIVE_USER:
      return Object.assign({}, state, {
        userAuthed: action.user != null,
        user: action.user,
        errorMessage: action.errorMessage,
        loading: false
      })

    case types.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        userAuthed: false,
        user: null,
        errorMessage: action.errorMessage,
        loading: false
      })

    default:
      return state
  }
}
