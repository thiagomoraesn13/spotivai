import axios from 'axios'

export const getToken = async () => {
  try {
    const client_id = '5d7a30ae8b014d0ebc3a7f01b3e5cf0f'
    const secret = 'a2343f5ad60546c8b6b1ebb6006e2f92'

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "Basic " + btoa(client_id + ':' + secret)
      },
    }

    const grant_type = 'grant_type=client_credentials'

    const { data } = await axios.post('https://accounts.spotify.com/api/token', grant_type, config)

    localStorage.setItem('token', data.access_token)
  }
  catch (error) {
    console.error(error)
  }
}

export const getHeaders = () => ({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })

export const baseUrl = 'https://api.spotify.com/v1'