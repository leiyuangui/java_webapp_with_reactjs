'use strict'

import requestUtils from './requestUtils'
import myutils from './myutils'

const authService = {

  login: function(username, password) {
    return new Promise((resolve, reject) => {
      var data = {
        username: username,
        password: password
      };

      requestUtils.postRequest("auth/auth", data, false).then(response => {
        var user = response.user
        if (user) {
          myutils.saveUser(user)
          resolve(user)
        } else {
          reject("Authentication failed")
        }
      }, err => {
        reject(err)
      })
    })
  },

  validateSession: function(username) {
    return new Promise((resolve, reject) => {
      var data = {
        username: username
      };

      requestUtils.postRequest("auth/validateSession", data, false).then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
    })
  },

  logout: function() {
    return new Promise((resolve, reject) => {
      requestUtils.postRequest("logout", null, false).then(result => {
        myutils.clearStorage()
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  },

  getUser: function() {
    return myutils.getUser()
  }

}

export default authService
