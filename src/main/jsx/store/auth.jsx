import * as types from './types'
import myutils from '../utils/myutils'
import authService from '../utils/authService'

function loadUser() {
  return {type: types.LOAD_USER}
}

function receiveUser(user, errorMessage) {
  return {type: types.RECEIVE_USER, user, errorMessage}
}

function userLoggedOut(errorMessage) {
  return {type: types.USER_LOGGED_OUT, errorMessage}
}

export function fetchUser() {
  return dispatch => {
    dispatch(loadUser())
    var user = myutils.getUser()
    if (!user) {
      dispatch(receiveUser(null, null))
      return
    }

    authService.validateSession(user.username).then((response) => {
      if (response.valid) {
        dispatch(receiveUser(user, null))
      } else {
        if (user) {
          dispatch(receiveUser(null, "User session invalid!"))
        } else {
          dispatch(receiveUser(null, null))
        }
      }
    }, (err) => {
      console.error("Error happened when trying to validate session: ", err)
      dispatch(receiveUser(null, null))
    })
  }
}

export function loginUser(username, password) {
  return dispatch => {
    dispatch(loadUser())
    authService.login(username, password).then((user) => {
      dispatch(receiveUser(user, null))
    }, err => {
      dispatch(receiveUser(null, 'Invalid username or password. Please try again!'))
    });
  }
}

export function logoutUser() {
  return dispatch => {
    authService.logout().then((response) => {
      if (response && response.success) {
        dispatch(userLoggedOut(null))
      }
    }, err => {
      console.log("error happend in logout: " + err)
    });

  }
}
