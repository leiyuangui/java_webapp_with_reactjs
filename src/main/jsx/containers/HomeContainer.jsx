import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HomeComponent from '../components/HomeComponent'
import Loading from '../components/Loading'

import * as authActions from '../store/auth'

class HomeContainer extends React.Component {

  constructor(props) {
    super(props)

    this.logoutUser = this.logoutUser.bind(this)
  }

  render() {
    if (this.props.loading) {
      return (<Loading/>)
    }

    if (!this.props.user) {
      return (<Redirect to='/login'/>)
    }

    return (<HomeComponent user={this.props.user} logoutUser={this.logoutUser}/>)
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.dispatch(authActions.fetchUser())
    }
  }

  logoutUser() {
    this.props.dispatch(authActions.logoutUser())
  }

}

function mapStateToProps(state) {
  return {user: state.auth.user, loading: state.auth.loading};
}

export default connect(mapStateToProps)(HomeContainer);
