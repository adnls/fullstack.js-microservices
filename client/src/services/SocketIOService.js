import SocketIOClient from 'socket.io-client';

export default class SocketIOService {
    static io = SocketIOClient('/private', { 
        autoConnect: false
    });
    static suscribe(){
        this.io.connect();
    }
    static unsuscribe(){
        this.io.disconnect();
    }
    static isConnected(){
        return this.io.connected;
    }
}