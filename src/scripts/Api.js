export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  
  getUserInfo = () => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'GET',
      headers: {
      authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch((err) => {
        console.log(err);
      }); 
  }
  
  getInitialCards = () => {
    return fetch('https://nomoreparties.co/v1/cohort-59/cards', {
      method: 'GET',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch((err) => {
        console.log(err);
    }); 
  }      
    
  changeUserInfo(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
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
      .then((res) => res.ok ? res.json() : Promise.reject())
      .catch((fail) => {
        console.log('Sorry ' + fail);
      });
  }

  addNewCard = (data) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
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
      .then((res) => res.ok ? res.json() : Promise.reject())
      .catch((fail) => {
        console.log('Sorry ' + fail);
      });
  }

  deleteCard = (cardId) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ cardId, {
      method: 'DELETE',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then((res) => {
        console.log('Карточка удалена' + res);
      })
      .catch((fail) => {
        console.log('Sorry ' + fail);
      });
  }

  likeCard = (cardId) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ cardId +'/likes', {
      method: 'PUT',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .catch((fail) => {
        console.log('Ошибка лайка'+ fail);
      });
  }

  unlikeCard = (cardId) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ cardId +'/likes', {
      method: 'DELETE',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .catch((fail) => {
        console.log('Ошибка анлайка'+ fail);
      });
  }

  editAvatar = (data) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .catch((fail) => {
        console.log('Ошибка редактирования аватара'+ fail);
      });
  }
}

 