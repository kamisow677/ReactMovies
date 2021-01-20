import React from 'react';
import { Card, Carousel, CardDeck, ListGroup, Button, Container, Row, Col} from 'react-bootstrap';
import './styles.css';

interface Movie {
    id: string,
    title: string,
    year: string,
    upflixesCount: number 
}

interface MovieCarouselProps {
    movies: Movie[];
    movieSelected: any;

}

interface MovieCarouselState {
}

export default class MovieCarousel extends React.Component <MovieCarouselProps, MovieCarouselState> {

    constructor(props: MovieCarouselProps) {
        super(props);
        this.state = {};
    }

    handleClick(e:any, movie: Movie) {
        this.props.movieSelected(movie);
    }

    render() {
        var moviesCarousel: Movie[][] = []
    
        this.props.movies.forEach((value, index) => {
            if ((index % 2) === 0)
                moviesCarousel.push([])
        })
       

        this.props.movies.forEach((value, index) => {
            console.log(index/2)

            moviesCarousel[Math.floor(index/2)].push({ 
                id: value.id,
                title: value.title,
                year: value.year,
                upflixesCount: 2
            })
        });

        if (this.props.movies.length % 2 === 1){
            moviesCarousel[Math.floor(this.props.movies.length / 2)].push
            ({ 
                id: 'value.id',
                title: 'value.title',
                year: 'value.year',
                upflixesCount: 2
            })
        }

        console.log(moviesCarousel)

        return (
                <Carousel >
                    {
                        moviesCarousel.map(
                            list => 
                                <Carousel.Item interval={20000}  className="my-carousel-item">
                                    <Container >
                                        <Row>
                                            <Col sm={12}>
                                                <CardDeck className="my-card-deck">
                                                    {
                                                        list.map(
                                                            movie => 
                                                            <Card bg='light' className="card-deck">
                                                                <Card.Header >{movie.title}</Card.Header>
                                                                <Card.Body >
                                                                    <Card.Img variant="top" src="C:\Users\ksowa\OneDrive\Pulpit\asd.jpg" alt="First slide" />
                                                                    <Card.Body>
                                                                        <Card.Title>Card title</Card.Title>
                                                                        <Card.Text>
                                                                            This is a wider card with supporting text below as a natural lead-in to
                                                                            additional content. This content is a little bit longer.
                                                                        </Card.Text>
                                                                        <ListGroup className="list-group-flush" variant="flush">
                                                                            <ListGroup.Item>Year: {movie.year}</ListGroup.Item>
                                                                            <ListGroup.Item>Available on: {movie.upflixesCount} sites </ListGroup.Item>
                                                                        </ListGroup>
                                                                    </Card.Body>
                                                                    <Card.Footer>
                                                                    <Button onClick={(e) => {this.handleClick(e, movie)}} >
                                                                        SHOW WHERE I CAN WATCH IT
                                                                    </Button>
                                                                    </Card.Footer>
                                                                </Card.Body>
                                                            </Card>
                                                        )
                                                    }
                                                </CardDeck> 
                                            </Col>
                                        </Row>
                                    </Container>
                                </Carousel.Item>
                        )
                }
                </Carousel>
        )
    }
}
