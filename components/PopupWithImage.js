import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigcaption = this._popupElement.querySelector(".popup__figcaption");
    this._popupImage = this._popupElement.querySelector(".popup__image");
}

  open(name, link) {
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupFigcaption.textContent = name;
    super.open();
  }
}
