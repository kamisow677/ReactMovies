import './App.css';
import AllDataLookup from './api/overview/AllDataLookup'
import BestUpflix from './api/BestUpflix'
import MoviesUpflix from './api/MoviesUpflix'
import AdminPage from './api/AdminPage'
import Login from './api/Login'
import Logout from './api/Logout'
import Register from './api/Register'
import { Navbar, Nav, Card } from 'react-bootstrap';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AuthorizationService from './api/AuthorizationService';

export default class App extends React.Component {

  state = {
    isUserLoggedIn: AuthorizationService.isLoggedUser(),
    isAdminLoggedIn:  AuthorizationService.isLoggedAdmin(),
    isLoggedIn: AuthorizationService.isUserLoggedIn(),
    username: AuthorizationService.getUsername()
  }

  refresh = () => {
    this.setState({
      isUserLoggedIn: AuthorizationService.isLoggedUser(),
      isAdminLoggedIn: AuthorizationService.isLoggedAdmin(),
      isLoggedIn: AuthorizationService.isUserLoggedIn(),
      username: AuthorizationService.getUsername(),
    })
  }

  render() {
    
    return (
      <Card>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/overview">Ovierview</Nav.Link>
                <Nav.Link href="/upflixes">Upflixes</Nav.Link>
                <Nav.Link href="/bestUpflix">Best Upflix</Nav.Link>
                <Nav.Link href="/register">REGISTER</Nav.Link>
              </Nav>
              <Navbar.Text>
                {AuthorizationService.isUserLoggedIn()
                  ? <span> Hello {this.state.username}   <a href="/logout">LOG OUT</a> </span>
                  : <span> Not signed: <a href="/login">LOG IN</a> </span>
                }
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/home">HOME PAGE</Route>
            <Route path="/upflix">
              {this.state.isUserLoggedIn ? <MoviesUpflix/> 
                : ( this.state.isLoggedIn ? <span>YOU ARE LOGGED BUT NOT AS USER</span> : <span> To sign click link: <a href="/login">LOG IN</a> </span>
              )}
            </Route>
            <Route path="/overview">
              {this.state.isUserLoggedIn ? <AllDataLookup/> 
                : ( this.state.isLoggedIn ? <span>YOU ARE LOGGED BUT NOT AS USER</span> : <span> To sign click link: <a href="/login">LOG IN</a> </span>
              )}
            </Route>
            <Route path="/upflixes">
              {this.state.isAdminLoggedIn ? <AdminPage/> 
                : ( this.state.isLoggedIn ? <span>YOU ARE LOGGED BUT NOT AS ADMIN</span> : <span> To sign click link: <a href="/login">LOG IN</a> </span>
              )}
            </Route>
            <Route path="/bestUpflix">
              {this.state.isUserLoggedIn ? <BestUpflix/> 
                : ( this.state.isLoggedIn ? <span>YOU ARE LOGGED BUT NOT AS USER</span> : <span> To sign click link: <a href="/login">LOG IN</a> </span>
              )}
            </Route>
            <Route path="/login"><Login/></Route>
            <Route path="/logout"><Logout refresh={() => this.refresh()}/></Route>
            <Route path="/register"><Register/></Route>
          </Switch>
        </Router>
      </Card>
    );
   }
}

