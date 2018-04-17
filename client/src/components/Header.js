import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../services/auth.js';

export default 
withRouter(props => {
        console.log(props.history);
        return AuthService.isThereAnUser()? (
        <p>
          {AuthService.user.data.email && JSON.stringify(AuthService.user.data.email)}
          <button onClick={() => AuthService.logOut(() => props.history.push("/"))}>
            Log out
          </button>
          <button onClick={() => AuthService.signOut(() => props.history.push("/"))}>
            Sign out
          </button>
        </p>
      ) : (
        <div>
        <span>You are not logged in.</span>
        <br/>
        <Link to='/login'>{'Log in'}</Link>
        {' | '}
        <Link to={{pathname:'/signin', state: { from: props.location }}}>
            {'Sign in'}
        </Link>
        </div>
      )
    }
  );
