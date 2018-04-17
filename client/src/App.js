import React , { Component } from 'react';
import './App.css';
import PrivateRoute from './components/hoc/PrivateRoute.js';
import {  Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/views/Home.js';
import Login from './components/views/Login.js';
import Private from './components/views/Private.js'; //hoc demo full declarative
import AuthService from './services/auth.js'; //static class demo 
import Signin from './components/views/Signin.js';
import Profil from './components/views/Profil.js';

export default
class App extends Component {
    constructor(props){
      super(props);
      this.state = { 
          isInitialRequestCompleted : false 
      }
      this.initialRequestCallback=this.initialRequestCallback.bind(this);
    }
    initialRequestCallback(rep){
      this.setState({isInitialRequestCompleted:true});
    }
    componentDidMount(){
      AuthService.initialRequest(this.initialRequestCallback);
    }
    render(){
      console.log('User auth status : ' + AuthService.isThereAnUser()); 
      return (
        this.state.isInitialRequestCompleted ?
        <Router>
            <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/signin' component={Signin}/>
                <Route path='/profil' component={Profil}/>
                <PrivateRoute path='/private' component={Private}/>
                <Redirect exact from='/' to='/home'/>
                <Redirect to='/home'/>
            </Switch>
        </Router>
        :
        <div>Loading...</div> //add a spinner e.g.
      );
    }
  }