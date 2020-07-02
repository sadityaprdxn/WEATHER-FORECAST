export default class validation {

    // function for input validate the regex
    validate = (input, RegularExpression) => {
        var parent = input.parentNode;
        if (input.value == "") {
            parent.classList = "form-group";
        }
        else if (RegularExpression.test(input.value)) {
            parent.classList = "form-group success";
        } else {
            parent.classList = "form-group error";
        }
    }
}