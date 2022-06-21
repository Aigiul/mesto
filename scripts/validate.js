function enableValidation(config) {
  const form = document.querySelector(config.form);
  
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event,config));
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const isValid = form.checkValidity();
}

function handleFormInput(event, config) {
  const form = event.currentTarget;
  const input = event.target;

  //1. Установка текста ошибок у невалидных полей
  setCustomError(input, config);

  //2. Показ ошибок
  setFieldError(input);

  //3. Деактивируем кнопку
  setSubmitButtonState(form, config);
}

function setCustomError(input, config) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');
    let errorMessage = `Минимальное количество символов ${min}. Длина текста сейчас: ${currentLength} символов.`;
    input.setCustomValidity(errorMessage);
  }

  if (validity.typeMismatch) {
    input.setCustomValidity(config.typeMismatchError);
  }
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__save-button_disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
    button.classList.add(config.popupisInvalid);
  }
}

enableValidation({
  form: '.popup__form[id="popup-form-reduct"]',
  submitButton: '.popup__save-button',
  popupisInvalid: 'popup__save-button_disabled'
});

enableValidation({
  form: '.popup__form[id="popup-form-add-card"]',
  typeMismatchError: 'Это не ссылка',
  submitButton: '.popup__save-button',
  popupIsInvalid: 'popup__save-button_disabled'
});