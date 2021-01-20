import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      errormessage: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    axios(
      { 
        method: `post`,
        url: `http://localhost:8080/user/register`,
        data: {
          username: this.state.username,
          password: this.state.password,
          role: this.state.role
        }
      } 
    )
    .then(res => {
        console.log(res.data)
    })
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter email"  name='username' value={this.state.username} onChange={this.changeHandler}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  name='password' value={this.state.password} onChange={this.changeHandler}/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select"  value={this.state.role}  name='role' onChange={this.changeHandler}>
            <option>ADMIN</option>
            <option>USER</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          REGISTER
        </Button>
    </Form>     
    )
  }

}
