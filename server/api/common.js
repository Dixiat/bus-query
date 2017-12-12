/* import modules */
const axios = require('axios');

/* create axios instance */
const busQueryInstance = axios.create({
    baseURL: 'http://test.zhbuswx.com/',
    timeout: 1000
});

module.exports = {
    busQueryInstance
};