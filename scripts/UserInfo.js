import { profileName, profileProfession } from './constants.js';

export default class UserInfo {
  constructor(userName, userProfession) {
  this._userName = userName.value;
  this._userProfession = userProfession.value;
  }

  getUserInfo() { //возвращает объект с данными пользователя

    this._profileInfo = {
      name: profileName.textContent,
      profession: profileProfession.textContent
    };
    return this._profileInfo;
  }
    
  setUserInfo() { //принимает новые данные пользователя и добавляет их на страницу
    profileName.textContent = this._userName;
    profileProfession.textContent = this._userProfession;
  }
}