import axios from 'axios';

export default url => {
    return axios.create({
            baseURL : url,
            timeout: 5000,
            withCredentials:true,
    });
}

    //custom axios instance with credentials... headers and cookies and ...
/*validateStatus: status => {
        return status < 500; // Reject only if the status code is greater than or equal to 500
    }*/
    //headers: {'X-Custom-Header': 'foobar'}
    /*lot of nice options*/
