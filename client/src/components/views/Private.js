import React, { Component } from 'react';
import Header from '../Header.js';
import SocketIOService from '../../services/SocketIOService.js';

export default
class Private extends Component {
    constructor(props){
        super(props);
        this.state = {
            payload: null
        }
    }
    componentDidMount(){
        if (!SocketIOService.isConnected()){
            SocketIOService.suscribe();
            SocketIOService.io.on('payload', payload =>  {
                console.log(payload);
                this.setState({payload:payload});
            });
        }
    }
    componentWillUnmount(){
        if (SocketIOService.isConnected()){
            SocketIOService.unsuscribe();
        }
    }
    render(){ 
        return (
            <div>
            <Header/>
            <h1>Private view</h1>
            {this.state.payload && JSON.stringify(this.state.payload)}
            </div>
        )
    }
}