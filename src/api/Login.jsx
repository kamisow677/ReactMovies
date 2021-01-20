import React from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthorizationService from './AuthorizationService';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      hasLoginFailed: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    await AuthorizationService.executeBasicAuthenticationService(this.state.username,  this.state.password)
    .then(res => {
        AuthorizationService.registerSuccessfulLogin(this.state.username,  this.state.password, res.data.role)
        this.props.history.push('/home');
        console.log(res.data)
    })
    .catch( () => {
      this.setState({hasLoginFailed: true})
    });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter email"  name='username' value={this.state.username} onChange={this.changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  name='password' value={this.state.password} onChange={this.changeHandler}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          LOGIN
        </Button>
    </Form>     
    )
  }
}



export default withRouter(Login);
