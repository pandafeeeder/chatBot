import axios from 'axios'

const BASE_URL = '/api'

const OPENAI_API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // replace with your API key
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}



function qa(prompt) {
    return axios.post('https://dev.pandafeeder.xyz/chat', {
        text: prompt.content
    }, { headers: headers })
}

export {
    qa
}