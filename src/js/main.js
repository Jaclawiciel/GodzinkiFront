// Form validation

// Shows login error message
// Call on login error (when wrong e-mail or password specified)
function loginError() {
	let errorMessageElement = document.getElementById('error-message');
	errorMessageElement.classList.remove('invisible');
	errorMessageElement.classList.add('blink');
}

function validateInput(event) {
	let input = event.srcElement;
	let inputType = input.getAttribute("type");
	let inputID = input.getAttribute("id");
	let inputValue = input.value;
	let inputErrorSpan = input.parentElement.children[2];
	switch (inputType) {
		case 'text':
			if (inputID === 'firstName') {
				if (isEmpty(inputValue)) {
					setErrorElements(input, inputErrorSpan, "Pole nie może być puste", true);
				} else if (isValidFirstName(inputValue)) {
					setErrorElements(input, inputErrorSpan, "Błędne imię", true);
				} else {
					setErrorElements(input, inputErrorSpan, null, false);
				}
			}
			break;
		case 'email':
			if (isEmpty(inputValue)) {
				setErrorElements(input, inputErrorSpan, "Pole nie może być puste", true);
			} else if (isValidEmail(inputValue)) {
				setErrorElements(input, inputErrorSpan, "Błędny adres e-mail", true);
			} else {
				setErrorElements(input, inputErrorSpan, null, false);
			}
			break;
		case 'password':
			if (inputID === 'password') {
				if (isEmpty(inputValue)) {
					setErrorElements(input, inputErrorSpan, "Pole nie może być puste", true);
				} else if (isValidPassword(inputValue)) {
					setErrorElements(input, inputErrorSpan, "Hasło musi zawierać co najmniej 8 znaków", true);
				} else {
					setErrorElements(input, inputErrorSpan, null, false);
				}
			} else {
				let typedPassword = document.getElementById('password').value;
				if (isEmpty(inputValue)) {
					setErrorElements(input, inputErrorSpan, "Pole nie może być puste", true);
				} else if (isValidRepeatPassword(typedPassword, inputValue)) {
					setErrorElements(input, inputErrorSpan, "Hasła muszą być takie same", true);
				} else {
					setErrorElements(input, inputErrorSpan, null, false);
				}
			}
			break;
		case 'checkbox':
			if (!input.checked) {
				setErrorElements(input, inputErrorSpan, "Musisz zaakceptować regulamin", true);
			} else {
				setErrorElements(input, inputErrorSpan, null, false);
			}
			break;
		default:
			console.log("Unknown type");
	}
	isFormValid();
}

function isEmpty(value) {
	'use strict';
	let pattern = /.+/;
	return !pattern.test(value);
}

function isValidFirstName(value) {
	"use strict";
	let pattern = /^(([a-zA-zóÓąĄśŚłŁżŻźŹćĆńŃ]+) ?([a-zA-ZóÓąĄśŚłŁżŻźŹćĆńŃ]+))+$/;
	return !pattern.test(value);
}

function isValidEmail(value) {
	"use strict";
	let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !pattern.test(value);
}

function isValidPassword(value) {
	"use strict";
	return value.length < 8;
	// let hasUpperCase = /[A-Z]/.test(value);
	// let hasLowerCase = /[a-z]/.test(value);
	// let hasNumbers = /\d/.test(value);
	// return !(hasUpperCase && hasLowerCase && hasNumbers);
}

function isValidRepeatPassword(oldValue, newValue) {
	'use strict';
	return oldValue !== newValue;
}

function isValidAccept(value) {
	return value;
}

function setErrorElements(input, errorSpan, errorMessage, isError) {
	"use strict";
	if (isError) {
		input.classList.add('input-error');
		input.classList.remove('valid');
		errorSpan.classList.remove('invisible');
		errorSpan.innerHTML = errorMessage;
	} else {
		input.classList.remove('input-error');
		input.classList.add('valid');
		errorSpan.classList.add('invisible');
	}
}

function isFormValid() {
	let submitButton = document.getElementById('submit-button');
	if (document.getElementsByClassName('valid').length === 5) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}