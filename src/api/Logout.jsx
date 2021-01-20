import React from 'react';
import AuthorizationService from './AuthorizationService';
import { withRouter } from 'react-router-dom'

class Logout extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AuthorizationService.logout()
    this.props.history.push('/home');
  }

  render() {
    this.props.refresh()
    return (
      <span></span> 
    )
  }
}


export default withRouter(Logout );
