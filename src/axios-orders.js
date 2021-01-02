import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://haowei-react-sandwichbuilder-default-rtdb.firebaseio.com/'
});

export default instance;