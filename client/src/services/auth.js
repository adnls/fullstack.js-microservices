import axiosInstance from './axiosInstance.js';
var axios = axiosInstance('/auth');

export default class {
    
    static user = {data:null};
    
    static initialRequest(cb) {
        axios.get('/isLogged')
        .then(res => {
            this.user = res;
            cb(res);
            console.log(res);
        })
        .catch(err => console.log(err));             
    }

    static isThereAnUser(){    
        return this.user.data!== null && this.user.data!==false;
    }
    
    static logIn(payload, cb) {
        axios.post('/logIn', payload)
        .then(res => {
            this.user = res;
            cb(res);
            console.log(res);
        })
        .catch((err) => {
            console.log('in the catch');
            console.log(err);
        });             
    }

    static signIn(payload, cb) {
        axios.post('/signIn', payload)
        .then(res => {
            this.user = res;
            cb();
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });             
    }

    static logOut(cb) {
        axios.get('/logOut')
        .then(res => {
            console.log(res.data);
            this.user.data = false;
            cb();
        })
        .catch((err) => {
            console.log(err);
        });             
    }

    static signOut(cb) {
        axios.get('/signOut')
        .then(res => {
            console.log(res.data);
            this.user.data = false;
            cb();
        })
        .catch((err) => {
            console.log(err);
        });             
    }
}