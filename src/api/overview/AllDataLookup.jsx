import React from 'react';
import axios from 'axios';
import MovieCarousel from './MovieCarousel.tsx'
import { Card, CardColumns, ListGroup, Button} from 'react-bootstrap';
import AuthorizationService from '../AuthorizationService';

export default class AllDataLookup extends React.Component {

  constructor(props) {
    super(props);
    this.handleMovieSelected = this.handleMovieSelected.bind(this);
    this.goBackToCarousel = this.goBackToCarousel.bind(this);
    this.state = {
      movies: [],
      upflixes: [],
      currentChoosenMovie: '',
      movieChoosen: false
    };
  }

  goBackToCarousel() {
    this.setState({movieChoosen: false});
  }

  handleMovieSelected(movie) {
    this.setState({currentChoosenMovie: movie});
    var movieBig = this.state.movies.filter(one => one.id === movie.id);
    this.setState({upflixes: movieBig[0].upflixes });
    this.setState({movieChoosen: true});
  }


  componentDidMount() {
      axios(
          { 
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              method: `get`,
              url: `http://localhost:8080/movieAll`,
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
        {this.state.movieChoosen 
          ? <Card bg='light' className="card-deck">
              <Card.Body >
                  <Card.Img variant="top" src="C:\Users\ksowa\OneDrive\Pulpit\asd.jpg" alt="First slide" />
                  <Card.Title>{this.state.currentChoosenMovie.title}</Card.Title>
                  <Card.Text>
                      {this.state.currentChoosenMovie.description}
                  </Card.Text>
                  <ListGroup className="list-group-flush" variant="flush">
                      <ListGroup.Item>Year: {this.state.currentChoosenMovie.year}</ListGroup.Item>
                  </ListGroup>
                  <Card.Footer>
                    <Button onClick={this.goBackToCarousel} >
                        BACK TO MOVIES CAROUSEL
                    </Button>
                  </Card.Footer>
              </Card.Body>
            </Card>
          : <MovieCarousel movies={this.state.movies} movieSelected={this.handleMovieSelected}/>
        }
        {this.state.movieChoosen 
          ?
            <CardColumns>
              {
                this.state.upflixes.map(
                  upflix => 
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px160" />
                      <Card.Body>
                        <Card.Title>{upflix.siteName}</Card.Title>
                        <ListGroup className="list-group-flush" variant="flush">
                            <ListGroup.Item>Link: {upflix.link}</ListGroup.Item>
                            <ListGroup.Item>Subscription type: {upflix.distributionChoice} </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                )
              }
            </CardColumns>
          : <span></span>
        }
      </Card>      
    )
  }
}
