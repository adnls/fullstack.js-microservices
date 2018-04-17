import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../../services/auth.js'; 

export default
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            password: '',
            email: ''
          }
        this.logInCallback = this.logInCallback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlChange = this.handlChange.bind(this);
    }
    
    logInCallback(res) {
        console.log('in login callback');
        this.setState({ redirectToReferrer: true });
    }

    handleSubmit(e){
        const payload = { 
            email:this.state.email, 
            password:this.state.password 
        }
        AuthService.logIn(payload, this.logInCallback);
        e.preventDefault();
    }

    handlChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }
  
    render() {
      const { from } = this.props.location.state || { from: { pathname: "/profil" } };
      const { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) {
        return <Redirect to={from.pathname !== '/private'? '/profil' : '/private'}/>;
      }
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <form onSubmit={this.handleSubmit}>
           <label>
            Email
            <br/>
            <input type='email' name='email' value={this.state.email} onChange={this.handlChange}/>
            </label>
            <br/>
            <label>
            Password
            <br/>
            <input type='password' name='password' value={this.state.password} onChange={this.handlChange}/>
            </label>
            <br/>
          <input type='submit' value='Log in'/>
          {' | '}
          <Link to={{pathname:'/signin', state:{from}}}>Sign in</Link>
          </form>  
        </div>
      );
    }
  }