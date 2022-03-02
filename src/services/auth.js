import axios from 'axios';
const baseUrl = '/api/auth';

const login = (loginObject) => {
    const request = axios.post(`${baseUrl}/login`, JSON.stringify(loginObject), 
    {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    return request.then(response => response.data);
};

const methods = { login };
export default methods;