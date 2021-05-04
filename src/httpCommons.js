import axios from 'axios'

/*export const AXIOS = axios.create({
    baseURL: `http://localhost:8090`,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4000',
    }
})*/


// настройки для OTI
export const AXIOS = axios.create({
    baseURL: `http://oti.ru:4000`,
    headers: {
        'Access-Control-Allow-Origin': 'http://172.17.17.107:80',
    }
})
