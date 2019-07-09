import React from 'react'

import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  Glyphicon,
  FormControl
} from 'react-bootstrap'

export default class LoginComponent extends React.Component {

  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)

    this.state = {
      'username': '',
      'password': ''
    }
  }

  render() {
    return (
      <div className='login-form'>
        <Form onSubmit={this.onSubmitForm}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph='user'/>
              </InputGroup.Addon>
              <FormControl
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.onFormChange}/>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph='lock'/>
              </InputGroup.Addon>
              <FormControl
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.onFormChange}/>
            </InputGroup>
          </FormGroup>

          <Button className="btn-primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )

  }

  onSubmitForm(evt) {
    if (evt && evt.preventDefault) {
      evt.preventDefault()
    }
    if (this.validateForm()) {
      this.props.onSubmit(this.state.username, this.state.password)
      return true
    }
    return false
  }

  validateForm() {
    //to-do
    return true
  }

  onFormChange(evt) {
    var name = evt.target.name
    var value = evt.target.value

    var state = this.state
    state[name] = value
    this.setState(state)
  }

}
