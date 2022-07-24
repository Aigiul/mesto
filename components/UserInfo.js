export default class UserInfo {
  constructor(titleProfileSelector, subtitleProfileSelector, editAvatarButtonSelector) {
	this._titleProfile = document.querySelector(titleProfileSelector);
	this._subtitleProfile = document.querySelector(subtitleProfileSelector);
	this._editAvatarButton = document.querySelector(editAvatarButtonSelector);
  }

  getUserInfo() {
    return {
      name: this._titleProfile.textContent,
      job: this._subtitleProfile.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._titleProfile.textContent = name;
    this._subtitleProfile.textContent = job;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}