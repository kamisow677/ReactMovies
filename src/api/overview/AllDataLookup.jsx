import React from 'react';
import axios from 'axios';
import MovieCarousel from './MovieCarousel.tsx'
import { Card, CardColumns, ListGroup, Button, Spinner, Images } from 'react-bootstrap';
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
      movieChoosen: false,
      imageWidth: 0,
      uploading: false
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
    console.log(movie);
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
      })

  }

  onChange = e => {


    this.setState({ uploading: true })
    const formData = new FormData()
    formData.append('files',  e.target.files[0])

    console.log(formData)
    console.log( `http://localhost:8080/movie/image?title=`+this.state.currentChoosenMovie.title)

    axios(
      { 
          headers: { "Content-Type": "multipart/form-data" },
          method: `POST`,
          url: `http://localhost:8080/movie/image?title=`+this.state.currentChoosenMovie.title,
          auth: {
              username: AuthorizationService.getUsername(),
              password: AuthorizationService.getPassword()
          },
          data: formData
      } 
    )
    .then(res => {
      this.setState({ 
        uploading: false
      })
    })
    
    this.componentDidMount()
  }

  render() {
    return (
      <Card >
        {this.state.movieChoosen 
          ? <Card bg='light' className="card-deck" style={{ width: '30rem' }}>
              <Card.Body >
                  <Card.Title>{this.state.currentChoosenMovie.title}</Card.Title>
                  <Card.Img variant="top" src={"data:image/png;base64,"+ this.state.currentChoosenMovie.image}  alt="First  slide" />
                  <Card.Text>
                      {this.state.currentChoosenMovie.description}
                  </Card.Text>
                  <ListGroup className="list-group-flush" variant="flush">
                      <ListGroup.Item>Year: {this.state.currentChoosenMovie.year}</ListGroup.Item>
                      <div className='button'>
                        {this.state.uploading 
                          ? <Spinner />
                          : <input type='file' id='multi' onChange={this.onChange} multiple /> 
                        }
                      </div> 
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
