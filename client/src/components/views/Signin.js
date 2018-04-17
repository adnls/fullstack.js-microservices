import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.js'; 

export default
class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            firstname: '',
            lastname: '',
            username: '',
            about: '',
            email: '',
            password: ''
          }
          
        this.signInCallback = this.signInCallback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlChange = this.handlChange.bind(this);
    }
    
    signInCallback(res) {
        console.log('in login callback');
        this.setState({ redirectToReferrer: true });
    }

    handleSubmit(e){
        const payload = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            about: this.state.about, 
            email:this.state.email, 
            password:this.state.password 
        }
        AuthService.signIn(payload, this.signInCallback);
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
        //redirect to the initial requested page if it was a private one, the user see what he came for
        //if he decide himself to sign in, redirect him to his profil page
        return <Redirect to={from.pathname !== '/private'? '/profil' : '/private'}/>;
      }
  
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <label>
            Firstname
            <br/>
            <input type='text' name='firstname' value={this.state.firstname} onChange={this.handlChange}/>
            </label>
            <br/>
            <label>
            Lastname
            <br/>
            <input type='text' name='lastname' value={this.state.lastname} onChange={this.handlChange}/>
            </label>
            <br/>
            <label>
            Username
            <br/>
            <input type='text' name='username' value={this.state.username} onChange={this.handlChange}/>
            </label>
            <br/>
            <label>
            About
            <br/>
            <input type='text' name='about' value={this.state.about} onChange={this.handlChange}/>
            </label>
            <br/>
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
          <input type='submit' value='Submit'/>
          </form>  
        </div>
      );
    }
  }