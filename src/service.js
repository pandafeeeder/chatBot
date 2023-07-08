import axios from 'axios'

let BASE_URL = '/api'
BASE_URL = 'https://devs.pandafeeder.xyz'

const BASE_URL_1 = 'https://chatplus.pandafeeder.xyz'

const OPENAI_API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // replace with your API key
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}



function qa(prompt, type = 'chat') {
    return axios.post(BASE_URL + '/chat', {
        text: prompt,
        type: type
    }, { headers: headers })
}
function fd(prompt, count = 0) {
    return axios.post(BASE_URL + '/feedback', {
        text: prompt,
        count: count
    }, { headers: headers })
}


function buy(param) {
    return axios.post(BASE_URL_1 + '/getQRCode', {
        type: param
    }, { headers: headers })
}

function getStatus(code, flag) {
    return axios.post(BASE_URL_1 + '/queryStatus', {
        code,
        flag: flag
    }, { headers: headers })
}

function checkKey(key) {
    return axios.post(BASE_URL_1 + '/checkKey', {
        key
    }, { headers: headers })
}

function chatplus(param) {

    return axios.post(BASE_URL_1 + '/chat', {
        model: param.model, key: param.key, messages: param.messages
    }, { headers: headers })
}

export {
    qa,
    fd,
    buy,
    getStatus,
    chatplus,
    checkKey
}
