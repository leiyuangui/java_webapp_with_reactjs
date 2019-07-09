import myutils from './myutils'

var kickoutUser = function() {
  myutils.clearStorage()
  window.location = CONTEXT_PATH + '/login'
}

var prepareRequest = function(url, method, data, checkuser) {
  var user = null;
  var body = null;

  if (checkuser) {
    user = myutils.getUser()
    if (!user || !user.username) {
      throw new Error('No user found!')
    }
  }

  if (data) {
    body = myutils.serializeParams(data, false);
  }

  var headers = {}

  var reqGet = true
  if (!method) {
    method = "GET";
  }

  method = method.toUpperCase()
  if (method == 'POST') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    reqGet = false
  }

  var fullUrl = CONTEXT_PATH + "/" + url
  if (reqGet && body) {
    fullUrl += "?" + body
    body = null
  }

  var req = {
    fullUrl: fullUrl,
    body: body,
    headers: headers
  }
  return req
}

const requestUtils = {

  prepareRequest: function(url, method, data, checkuser) {
    return prepareRequest(url, method, data, checkuser)
  },

  getRequest: function(url, data, checkuser) {
    var req = prepareRequest(url, 'GET', data, checkuser)
    return new Promise((resolve, reject) => {
      fetch(req.fullUrl, {
        method: 'GET',
        mode: 'cors',
        headers: req.headers,
        credentials: "same-origin"
      }).then((response) => {
        if (response.status == 200 || response.status == 401) {
          return response.json()
        } else {
          kickoutUser()
        }
      }).then((res) => {
        resolve(res)
      }).catch(reject)
    })
  },

  postRequest: function(url, data, checkuser) {
    var req = prepareRequest(url, 'POST', data, checkuser)
    var body = req.body
    return new Promise((resolve, reject) => {
      fetch(req.fullUrl, {
        method: 'POST',
        mode: 'cors',
        headers: req.headers,
        credentials: "same-origin",
        body
      }).then((response) => {
        if (response.status == 200 || response.status == 401) {
          return response.json()
        } else {
          kickoutUser()
        }
      }, err => {
        reject(err)
      }).then((res) => {
        resolve(res)
      }).catch(reject)
    })
  }

}

export default requestUtils
