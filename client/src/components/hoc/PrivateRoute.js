import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.js'; //static class demo

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('in the hoc');
    return (
    <Route
        {...rest}
        render={props =>
        AuthService.isThereAnUser()? (
            <Component {...props}/>
        ) : (
            <Redirect
            to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
        )
    }
    />
)};

export default PrivateRoute;