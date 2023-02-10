export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
      authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => this._getResponseData(res))
  }
  
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => this._getResponseData(res))
  }      
    
  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._getResponseData(res))
  }

  addNewCard = (data) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => this._getResponseData(res))
  }

  likeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => this._getResponseData(res))
  }

  unlikeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => this._getResponseData(res))
  }

  editAvatar = (data) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(res => this._getResponseData(res))
  }
}

 