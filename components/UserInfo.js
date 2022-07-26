export default class UserInfo {
  constructor(titleProfileSelector, subtitleProfileSelector) {
	this._titleProfile = document.querySelector(titleProfileSelector);
	this._subtitleProfile = document.querySelector(subtitleProfileSelector);
	}

  getUserInfo() {
    return {
      name: this._titleProfile.textContent,
      job: this._subtitleProfile.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._titleProfile.textContent = name;
    this._subtitleProfile.textContent = job;
  }
}