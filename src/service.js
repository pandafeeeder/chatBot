import axios from 'axios'

let BASE_URL = ''
BASE_URL= 'https://devs.pandafeeder.xyz'

const OPENAI_API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // replace with your API key
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}



function qa(prompt) {
    return axios.post(BASE_URL + '/chat', {
        text: prompt.content
    }, { headers: headers })
}

export {
    qa
}
