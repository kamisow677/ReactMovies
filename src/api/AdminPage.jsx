import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

import AuthorizationService from './AuthorizationService';

export default class AdminPage extends React.Component {
  state = {
    movies: 'asd',
  }

  handleClick(movie, e) {
    e.preventDefault();
    this.setState(state => ({
      upflixes: movie.upflixes
    }));
  }

  componentDidMount() {
      axios(
        { 
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: `get`,
          url: `http://localhost:8080/admin`,
          auth: {
            username: AuthorizationService.getUsername(),
            password: AuthorizationService.getPassword()
          }

        } 
      )
      .then(res => {
          const movies = res.data;
          this.setState({ movies });
          console.log(movies)
      })
  }

  render() {
    return (
      <Card>
          {this.state.movies}
      </Card>      
    )
  }
}
