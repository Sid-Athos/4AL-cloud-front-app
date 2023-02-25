import axios from 'axios';
import Constants from '../constants/Constants';


const instance = axios.create({
    baseURL: Constants.API_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export default instance;
