import React from 'react'

import {Button} from 'react-bootstrap'

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>Hello {this.props.user.username}!</div>
        <Button className="btn-primary" onClick={this.props.logoutUser}>
          Logout
        </Button>
      </div>
    )
  }
}
