export default class UserInfo {
  constructor(profileName, profileProfession) {
  this._profileName = profileName;
  this._profileProfession = profileProfession;
  }

  // getUserInfo() { //возвращает объект с данными пользователя

  //   this._profileInfo = {
  //     name: this._profileName.textContent,
  //     profession: this._profileProfession.textContent
  //   };
  //   return this._profileInfo;
  // }
    
  setUserInfo(userName, userProfession) { //принимает новые данные пользователя и добавляет их на страницу
    this._profileName.textContent = userName;
    this._profileProfession.textContent = userProfession;
  }
}