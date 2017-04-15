import { BASE_URL, TOKEN } from 'react-native-dotenv'

export function fetchContacts () {
  return fetch(BASE_URL + '/api/v1/contacts' +
    '?' + 'token=' + TOKEN +
    '&' + 'page=1&per=10',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(status)
}

export function sendMessage (contact, message) {
  const params = {
    recipients: [
      'contact-' + contact.id
    ],
    message: {
      body: message
    }
  }

  return fetch(BASE_URL + '/api/v1/messages' +
    '?' + 'token=' + TOKEN,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(status)
}

const status = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const error = await response.json()
    throw Error(error.message)
  }
}
