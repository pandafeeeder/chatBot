import axios from 'axios'

let BASE_URL = '/api'
BASE_URL = 'https://devs.pandafeeder.xyz'

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

export {
    qa
}
