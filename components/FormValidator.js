import { config } from "../utils/constants.js";
export default class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
};

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = " ";
    errorElement.classList.remove(this._config.errorClass);
};

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", false);
    }
  };

  _disableSubmitButton() {
		this._buttonElement.classList.add(this._config.inactiveButtonClass);
		this._buttonElement.setAttribute("disabled", "disabled");
	}

  _setEventListeners() {
    this._formElement.addEventListener("reset", () => {
      this._disableSubmitButton();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
    this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
		this._toggleButtonState();
	}


// Вызовем функцию
  enableValidation() {
    this._setEventListeners();
  }
}
