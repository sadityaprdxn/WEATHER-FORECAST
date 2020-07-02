export default class validation {

    // function for input validate the regex
    validate = (input, RegularExpression) => {
        debugger;
        let parent = input.parentNode;
        let regexValidator =/([0-9!@#$%^&*()~<>])/;

        if (input.value == "") {
            parent.classList = "form-group";
        }
        else if (RegularExpression.test(input.value) && !regexValidator.test(input.value)) {
            parent.classList = "form-group success";
        } else {
            parent.classList = "form-group error";
        }
    }
}