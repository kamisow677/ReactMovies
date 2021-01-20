import React from 'react';
import axios from 'axios';
import AuthorizationService from './AuthorizationService';
import { CardColumns, Card, ListGroup, Dropdown, FormControl, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

// interface Movie {
//     id: string,
//     title: string,
//     year: string,
//     upflixes: any
// }

// interface MovieCarouselState {
//     movies: Movie[];
// }

class MovieUpflix extends React.Component {

  constructor(props) {
      super(props);
      this.state = {movies: []};
  }

  componentDidMount() {
    console.log(this.props.location.state.detail.siteName)
    axios(
      { 
        headers: { "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": AuthorizationService.createBasicAuthToken2()  },
        method: `get`,
        url: `http://localhost:8080/movie/sitename/${this.props.location.state.detail.siteName}`
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
      <CardColumns>
        {
          this.state.movies.map(
            movie => 
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <ListGroup className="list-group-flush" variant="flush">
                      <ListGroup.Item>YEAR: {movie.year}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
          )
        }
      </CardColumns>
    )
  }


}

export default withRouter(MovieUpflix);