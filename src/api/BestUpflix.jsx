import React from 'react';
import axios from 'axios';
import { Table, Card, DropdownButton, Dropdown, FormControl, Button} from 'react-bootstrap';
import AuthorizationService from './AuthorizationService';
import { withRouter } from 'react-router-dom'

class AllDataLookup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upflixes: [],
      upflixesLegacy: [],
      distributionChoice: '',
      siteName: '',
      countAscending: true
    }
    this.handleClickDistr = this.handleClickDistr.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (upflix) => {
    this.props.history.push({
      pathname: '/upflix',
      state: { detail: upflix}
    })
  }

  handleClickSiteName = (e) => {
    this.setState({siteName: e.target.value})
    this.filtration(this.state.distributionChoice, e.target.value, !this.state.countAscending)
  }

  handleClickDistr = (stateName, stateVal) => {
    this.setState({[stateName]: stateVal })
    this.filtration(stateVal, this.state.siteName, this.state.countAscending)
  }

  handleClickCount = () => {
    this.setState({countAscending: !this.state.countAscending})
    this.filtration(this.state.distributionChoice, this.state.siteName, !this.state.countAscending)
  }

  filtration = (distr, siteName, order) => {
    var newUpflixes = this.state.upflixesLegacy
    if (distr !== '')
      newUpflixes = newUpflixes.filter(one => distr === one.distributionChoice);
    if (siteName !== '')
      newUpflixes = newUpflixes.filter(one => one.siteName.includes(siteName));
  
    newUpflixes = newUpflixes.sort((one, two) => {
      if (order === true)
        return (one.count > two.count ? -1 : 1)
      else
        return (one.count < two.count ? -1 : 1)
    });

    this.setState({upflixes: newUpflixes })
    console.log(newUpflixes)
  }

  componentDidMount() {
      axios(
          { 
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              method: `get`,
              url: `http://localhost:8080/movie/best/best`,
              auth: {
                  username: AuthorizationService.getUsername(),
                  password: AuthorizationService.getPassword()
              }
          } 
      )
      .then(res => {
          const upflixes = res.data;
          this.setState({ 
            upflixes: upflixes,
            upflixesLegacy: upflixes
           });
          console.log(this.state.upflixes)
      })
  }

  render() {
    return (
      <Card>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Link to site</th>
              <th>Sitename</th>
              <th>Distribution Choice</th>
              <th>Number of movies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Filter">
                  <Dropdown.Item href="#/action-1" onClick={this.handleClick} >Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
              </td>
              <td><FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleClickSiteName.bind(this)}/></td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="FILTER">
                  <Dropdown.Item onClick={this.handleClickDistr.bind(this, 'distributionChoice', 'WYPOŻYCZENIE')}>WYPOŻYCZENIE</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleClickDistr.bind(this, 'distributionChoice', 'ABONAMENT')}>ABONAMENT</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleClickDistr.bind(this, 'distributionChoice', '')}>ALL</Dropdown.Item>
                </DropdownButton>
              </td>
              <td>
                <Button onClick={this.handleClickCount}>Sort</Button>
              </td>
            </tr>
          </tbody>
          <tbody>
            {
              this.state.upflixes.map(
                upflix => 
                  <tr onClick={this.handleClick.bind(this, upflix)}>
                    <td>{upflix.link}</td>
                    <td>{upflix.siteName}</td>
                    <td>{upflix.distributionChoice}</td>
                    <td>{upflix.count}</td>
                  </tr>
              )
            }
          </tbody>
        </Table> 
      </Card>      
    )
  }
}

export default withRouter(AllDataLookup);
