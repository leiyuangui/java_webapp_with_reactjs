'use strict';

const USER_KEY = "User"

const myutils = {

  clearStorage: function() {
    localStorage.clear()
  },

  saveUser: function(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser: function() {
    var user = localStorage.getItem(USER_KEY)
    if (user) {
      try {
        return JSON.parse(user)
      } catch (err) {
        return null
      }
    }
    return null;
  },

  serializeParams: function(params, hasParamAlready) {
    let paramStr = ''
    var idx = 0;

    if (hasParamAlready) {
      paramStr += '&';
    }

    for (let prop in params) {
      if (params[prop] !== null && params[prop] !== void 0 && prop !== 'grant_type') {

        if (idx > 0) {
          paramStr += '&';
        }

        paramStr += `${prop}=${encodeURIComponent(params[prop])}`;
        idx++;
      }
    }
    return paramStr;
  }

}

export default myutils
