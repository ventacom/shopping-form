window.addEventListener('load', function () {
    NodeList.prototype.each = Array.prototype.each;
    NodeList.prototype.some = Array.prototype.some;

    var breadcrumbs = document.querySelectorAll(".breadcrumbs__item");

    var form = document.querySelector("form");
    var submitButton = document.querySelector(".form__submit");
    var continueButtons = document.querySelectorAll(".form__button--continue");
    var cardNumber = document.querySelector(".form__input--cardnumber");

    var fields = form.querySelectorAll('.form__input');

    var sameAsShipping = document.querySelector(".form__same-as-shipping");


    submitButton.addEventListener('click', (event) => {

        var errors = inputs.some((el) => {
            checkValidity(el)
            return !el.validity.valid
        });

        inputs.forEach( el => {
            if(!el.validity.valid) {
                el.classList.add("form__input--error-background");
            }
        });

        if (errors) {
            return
        }
        form.submit();
    });

    // Continue next step

    continueButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            var inputs = button.parentNode.querySelectorAll(".form__input");

            var errors = inputs.some((el) => {
                checkValidity(el)
                return !el.validity.valid
            });

            inputs.forEach( el => {
                if(!el.validity.valid) {
                    el.classList.add("form__input--error-background");
                }
            });

            if (errors) {
                return
            }

            form.querySelectorAll(".form__section").forEach(section => section.style.display = "none");

            button.parentNode.nextElementSibling.style.display = "block";
            breadcrumbStep(button.parentNode.nextElementSibling);

        });

    });

    // breadcrumb

    function breadcrumbStep(section) {

        breadcrumbs.forEach(crumb => crumb.classList.remove("breadcrumbs__item--active", "breadcrumbs__item--before"));

        var name = section.className.split("--")[1];

        breadcrumbs.some(crumb => {
            if (crumb.className.match(name)) {
                crumb.classList.add("breadcrumbs__item--active");
                return true;
            }

            crumb.classList.add("breadcrumbs__item--before");
            return false;
        });

    }

    //same as shipping 

    sameAsShipping.addEventListener('click', (e) => {
        var shippingFields = document.querySelectorAll(`.form__input--name-shipping, 
                                                       .form__input--street-shipping, 
                                                       .form__input--apt-shipping,
                                                       .form__input--city-shipping,
                                                       .form__input--city-shipping,
                                                       .form__input--country-shipping,
                                                       .form__input--zip-shipping`);

        var billingFields = document.querySelectorAll(`.form__input--name-billing, 
                                                        .form__input--street-billing, 
                                                        .form__input--apt-billing,
                                                        .form__input--city-billing,
                                                        .form__input--city-billing,
                                                        .form__input--country-billing,
                                                        .form__input--zip-billing`);

        shippingFields.forEach( (field, index) => { billingFields[index].value = field.value } );
    });


    // Validation

    fields.forEach(el => {

        el.addEventListener('keydown', (event) => {
            if (event.which == 13) event.preventDefault();
        });

        el.addEventListener("focusout", function (e) { checkValidity(e.target); });
        el.addEventListener('input', function (e) { checkValidity(e.target); });
        el.addEventListener('change', function (e) { checkValidity(e.target); });
    });

    function checkValidity(field) {

        if (field.previousElementSibling.classList.contains("error")) {
            field.previousElementSibling.innerHTML = '';
            field.previousElementSibling.classList.remove("active");
            field.classList.remove("form__input--error-background");
            field.classList.remove("form__input--error-shadow");
        }

        if(!field.validity.valid) {
            field.classList.add("form__input--error-shadow");
        }

        if (field.validity.typeMismatch && field.name == "email") {
            showError(field, "Email is in wrong format.");
        }

        else if (field.validity.patternMismatch && field.name == "cardnumber") {
            showError(field, "Wrong format. Card number should have 16 numbers in it.");
        }

        else if (field.validity.typeMismatch && field.name == "card-date") {
            showError(field, "Date is in wrong format. It should be MM/YY.");
        }

        else if (field.validity.typeMismatch && field.name == "security-code") {
            showError(field, "Security code is in wrong format. It should be 3 or 4 digit number.");
        }

        else if (field.validity.valueMissing && field.name == "name-shipping") {
            showError(field, "Please enter recepient full name.");
        }

        else if (field.validity.valueMissing && field.name == "phone") {
            showError(field, "Please enter phone number.");
        }

        else if (field.validity.valueMissing && field.name == "street-shipping") {
            showError(field, "Please enter recepient street address.");
        }

        else if (field.validity.valueMissing && field.name == "city-shipping") {
            showError(field, "Please enter recepient's city by hand or use geolocation.");
        }

        else if (field.validity.valueMissing && field.name == "country-shipping") {
            showError(field, "Please enter recepient country.");
        }

        else if (field.validity.valueMissing && field.name == "zip-shipping") {
            showError(field, "Please enter recepient's zip code.");
        }

        else if (field.validity.valueMissing && field.name == "name-billing") {
            showError(field, "Please enter full name for billing.");
        }

        else if (field.validity.valueMissing && field.name == "email") {
            showError(field, "Please enter email.");
        }

        else if (field.validity.valueMissing && field.name == "street-billing") {
            showError(field, "Please enter street address for billing.");
        }

        else if (field.validity.valueMissing && field.name == "city-billing") {
            showError(field, "Please enter city for billing by hand or use geolocation.");
        }

        else if (field.validity.valueMissing && field.name == "country-billing") {
            showError(field, "Please enter country for billing.");
        }

        else if (field.validity.valueMissing && field.name == "zip-billing") {
            showError(field, "Please enter zip code for billing.");
        }

        else if (field.validity.valueMissing && field.name == "card-holder-name") {
            showError(field, "Please enter cardholder name.");
        }

        else if (field.validity.valueMissing && field.name == "cardnumber") {
            showError(field, "Please enter card number.");
        }

        else if (field.validity.valueMissing && field.name == "card-date") {
            showError(field, "Please enter expiry date for card in MM/YY format. For example 02/19.");
        }

        else if (field.validity.valueMissing && field.name == "security-code") {
            showError(field, "Please enter security code for you card. It's a 3 or 4 digit number.");
        }

    }

    function showError(field, message) {
        var error = field.previousElementSibling;
        error.classList.add("active");
        error.innerHTML = message;
    }

    // Detect card

    cardNumber.addEventListener('input', e => {
        var number = e.target.value;

        number = number.split(" ").join("");

        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
            e.target.className = "form__input form__input--cardnumber form__input--Mastercard";
        }

        else if (/^4/.test(number)) {
            e.target.className = "form__input form__input--cardnumber form__input--Visa";
        }

        else {
            e.target.className = "form__input form__input--cardnumber";
        }

    });



});