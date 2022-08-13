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
    const formValues = {};
    this._inputs.forEach (input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(formValues) {
		this._inputs.forEach(input => input.value = formValues[input.name]);
	}

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
      this._formElement.addEventListener('submit', (evt) => {
      const oldValue = this._submitButton.textContent;
      this._submitButton.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues())
      .finally(() => {
        this._submitButton.textContent = oldValue;
      })
      evt.preventDefault();
    })
    super.setEventListeners();
  }
}