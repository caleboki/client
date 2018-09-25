import axios from 'axios'
import Auth from '@/auth.js'

export function get(url) {
    
    
    return axios({
        method: 'GET',
        url: url,
        headers: {
            //'Authorization': `Bearer ${Auth.state.api_token}`
            'Authorization': `Bearer ${Auth.accessToken}`
        }
        
    })
}

export function post(url, payload) {

    return axios({
        method: 'POST',
        url: url,
        data: payload,
        headers: {
            //'Authorization': `Bearer ${Auth.state.api_token}`
            'Authorization': `Bearer ${Auth.accessToken}`
        }
    })

}

// delete is reserved keyword
export function del(url) {
    return axios({
        method: 'DELETE',
        url: url,
        headers: {
            //'Authorization': `Bearer ${Auth.state.api_token}`
            'Authorization': `Bearer ${Auth.accessToken}`
        }
    })
}

