export default class UserInfo {
  constructor(profileName, profileProfession, profileAvatar, data) {
  this._profileName = profileName;
  this._profileProfession = profileProfession;
  this._profileAvatar = profileAvatar;
  this._profileData = data;
  }

  getUserInfo() { //возвращает объект с данными пользователя

    this._profileInfo = {
      name: this._profileName.textContent,
      about: this._profileProfession.textContent,
      avatar: this._profileAvatar.src,
      data: this._profileData
    };
    return this._profileInfo;
  }
    
  setUserInfo(userName, userProfession) { //принимает новые данные пользователя и добавляет их на страницу
    this._profileName.textContent = userName;
    this._profileProfession.textContent = userProfession;
    
  }

  setAvatar(userAvatar) {
    this._profileAvatar.src = userAvatar;
  }
}