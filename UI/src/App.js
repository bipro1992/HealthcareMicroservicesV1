import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';


import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

class App extends Component {

  state = {
    isLoggedIn : false
  }

  handleLogin = (loggedin) => {
    this.setState({ isLoggedIn : loggedin });
  }

  handleLogout = (loggedin) => {
    this.setState({ isLoggedIn : loggedin });
  }

  render() {
    return (
      <Router>  
        <div className="App">
          { this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
          <Switch>
            <Route exact path="/" render={props => (
              <Redirect to="/login" />
            )}/>
            <Route exact path="/login" render={props => (
              <React.Fragment>
                <LoginPage onLogin={this.handleLogin} loggedIn={this.state.isLoggedIn}/>                                     
              </React.Fragment>
            )}/>
            <Route exact path="/dashboard" render={props => (
              <React.Fragment>
                <DashboardPage onLogout={this.handleLogout} loggedIn={this.state.isLoggedIn}/>
              </React.Fragment>  
            )} />
          </Switch> 
        </div>
      </Router>
    );
  }
}

export default App;
