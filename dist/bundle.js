/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener('load', function () {\n    NodeList.prototype.each = Array.prototype.each;\n    NodeList.prototype.some = Array.prototype.some;\n\n    var breadcrumbs = document.querySelectorAll(\".breadcrumbs__item\");\n\n    var form = document.querySelector(\"form\");\n    var submitButton = document.querySelector(\".form__submit\");\n    var continueButtons = document.querySelectorAll(\".form__button--continue\");\n    var cardNumber = document.querySelector(\".field__input--cardnumber\");\n\n    var inputs = form.querySelectorAll('.field__input');\n\n    var sameAsShipping = document.querySelector(\".form__same-as-shipping\");\n\n    var geolocation =  document.querySelector(\".geolocation\");\n\n\n    submitButton.addEventListener('click', (event) => {\n\n        var errors = inputs.some((el) => {\n            checkValidity(el)\n            return !el.validity.valid\n        });\n\n        inputs.forEach( el => {\n            if(!el.validity.valid) {\n                el.classList.add(\"field__input--error-background\");\n            }\n        });\n\n        if (errors) {\n            return\n        }\n        form.submit();\n    });\n\n    // Continue next step\n\n    continueButtons.forEach(button => {\n        button.addEventListener('click', (e) => {\n            var inputs = button.parentNode.querySelectorAll(\".field__input\");\n\n            var errors = inputs.some((el) => {\n                checkValidity(el)\n                return !el.validity.valid\n            });\n\n            inputs.forEach( el => {\n                if(!el.validity.valid) {\n                    el.classList.add(\"field__input--error-background\");\n                }\n            });\n\n            if (errors) {\n                return\n            }\n\n            form.querySelectorAll(\".form__section\").forEach(section => section.style.display = \"none\");\n\n            button.parentNode.nextElementSibling.style.display = \"block\";\n            breadcrumbStep(button.parentNode.nextElementSibling);\n\n        });\n\n    });\n\n    // breadcrumb\n\n    function breadcrumbStep(section) {\n\n        breadcrumbs.forEach(crumb => crumb.classList.remove(\"breadcrumbs__item--active\", \"breadcrumbs__item--before\"));\n\n        var name = section.className.split(\"--\")[1];\n\n        breadcrumbs.some(crumb => {\n            if (crumb.className.match(name)) {\n                crumb.classList.add(\"breadcrumbs__item--active\");\n                return true;\n            }\n\n            crumb.classList.add(\"breadcrumbs__item--before\");\n            return false;\n        });\n\n    }\n\n    //same as shipping \n\n    sameAsShipping.addEventListener('click', (e) => {\n        var shippingFields = document.querySelectorAll(`.field__input--name-shipping, \n                                                       .field__input--street-shipping, \n                                                       .field__input--apt-shipping,\n                                                       .field__input--city-shipping,\n                                                       .field__input--city-shipping,\n                                                       .field__input--country-shipping,\n                                                       .field__input--zip-shipping`);\n\n        var billingFields = document.querySelectorAll(`.field__input--name-billing, \n                                                        .field__input--street-billing, \n                                                        .field__input--apt-billing,\n                                                        .field__input--city-billing,\n                                                        .field__input--city-billing,\n                                                        .field__input--country-billing,\n                                                        .field__input--zip-billing`);\n\n        shippingFields.forEach( (field, index) => { billingFields[index].value = field.value } );\n    });\n\n\n    // Validation\n\n    inputs.forEach(el => {\n\n        el.addEventListener('keydown', (event) => {\n            if (event.which == 13) event.preventDefault();\n        });\n\n        el.addEventListener(\"focusout\", function (e) { checkValidity(e.target); });\n        el.addEventListener('input', function (e) { checkValidity(e.target); });\n        el.addEventListener('change', function (e) { checkValidity(e.target); });\n    });\n\n    function checkValidity(field) {\n\n        if (field.previousElementSibling.classList.contains(\"field__error\")) {\n            field.previousElementSibling.innerHTML = '';\n            field.previousElementSibling.classList.remove(\"field__error--active\");\n            field.classList.remove(\"field__input--error-background\");\n            field.classList.remove(\"field__input--error-shadow\");\n        }\n\n        if(!field.validity.valid) {\n            field.classList.add(\"field__input--error-shadow\");\n        }\n\n        if (field.validity.typeMismatch && field.name == \"email\") {\n            showError(field, \"Email is in wrong format.\");\n        }\n\n        else if (field.validity.patternMismatch && field.name == \"cardnumber\") {\n            showError(field, \"Wrong format. Card number should have 16 numbers in it.\");\n        }\n\n        else if (field.validity.typeMismatch && field.name == \"card-date\") {\n            showError(field, \"Date is in wrong format. It should be MM/YY.\");\n        }\n\n        else if (field.validity.typeMismatch && field.name == \"security-code\") {\n            showError(field, \"Security code is in wrong format. It should be 3 or 4 digit number.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"name-shipping\") {\n            showError(field, \"Please enter recepient full name.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"phone\") {\n            showError(field, \"Please enter phone number.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"street-shipping\") {\n            showError(field, \"Please enter recepient street address.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"city-shipping\") {\n            showError(field, \"Please enter recepient's city by hand or use geolocation.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"country-shipping\") {\n            showError(field, \"Please enter recepient country.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"zip-shipping\") {\n            showError(field, \"Please enter recepient's zip code.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"name-billing\") {\n            showError(field, \"Please enter full name for billing.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"email\") {\n            showError(field, \"Please enter email.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"street-billing\") {\n            showError(field, \"Please enter street address for billing.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"city-billing\") {\n            showError(field, \"Please enter city for billing by hand or use geolocation.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"country-billing\") {\n            showError(field, \"Please enter country for billing.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"zip-billing\") {\n            showError(field, \"Please enter zip code for billing.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"card-holder-name\") {\n            showError(field, \"Please enter cardholder name.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"cardnumber\") {\n            showError(field, \"Please enter card number.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"card-date\") {\n            showError(field, \"Please enter expiry date for card in MM/YY format. For example 02/19.\");\n        }\n\n        else if (field.validity.valueMissing && field.name == \"security-code\") {\n            showError(field, \"Please enter security code for you card. It's a 3 or 4 digit number.\");\n        }\n\n    }\n\n    function showError(field, message) {\n        var error = field.previousElementSibling;\n        error.classList.add(\"field__error--active\");\n        error.innerHTML = message;\n    }\n\n    // Detect card\n\n    cardNumber.addEventListener('input', e => {\n        var number = e.target.value;\n\n        number = number.split(\" \").join(\"\");\n\n        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {\n            e.target.className = \"field__input field__input--cardnumber field__input--Mastercard\";\n        }\n\n        else if (/^4/.test(number)) {\n            e.target.className = \"field__input field__input--cardnumber field__input--Visa\";\n        }\n\n        else {\n            e.target.className = \"field__input field__input--cardnumber\";\n        }\n\n    });\n\n    // geolocation \n\n    (function detectGeolocation() {\n        if (navigator.geolocation) {\n\n            geolocation.addEventListener('click', getLocation)\n            \n\n        } else {\n            geolocation.style.display = \"none\";\n        }\n    })();\n\n    function getLocation(e) {\n        navigator.geolocation.getCurrentPosition( (position) => {\n            e.target.previousElementSibling.value = `latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`;\n        });\n    }\n\n\n});\n\n//# sourceURL=webpack:///./src/js/script.js?");

/***/ })

/******/ });