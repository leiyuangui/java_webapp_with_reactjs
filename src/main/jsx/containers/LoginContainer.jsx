import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import LoginComponent from '../components/LoginComponent'
import Loading from '../components/Loading'
import * as authActions from '../store/auth'

class LoginContainer extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    if (this.props.loading) {
      return (<Loading/>)
    }

    if (this.props.userAuthed) {
      return (<Redirect to='/home'/>)
    }

    return (
      <LoginComponent
        onSubmit={this.onSubmit}
        errorMessage={this.props.errorMessage}/>
    )
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.dispatch(authActions.fetchUser())
    }
  }

  onSubmit(username, password) {
    this.props.dispatch(authActions.loginUser(username, password))
  }
}

function mapStateToProps(state) {
  return {userAuthed: state.auth.userAuthed, errorMessage: state.auth.errorMessage};
}

export default connect(mapStateToProps)(LoginContainer);
