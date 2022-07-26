import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupElement.querySelectorAll(".popup__input");
    this._submitButton = this._formElement.querySelector(".popup__save-button");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach (input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(formValues) {
		this._inputs.forEach(input => input.value = formValues[input.name]);
	}

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}