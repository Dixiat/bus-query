const axios = require('axios');

axios.get('http://test.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&key=2&_=1512957584592').then(response => { console.log(response.data); }).catch(error => { console.log(error.message) });