"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validation = function () {
    function validation() {
        _classCallCheck(this, validation);
    }

    _createClass(validation, [{
        key: "validate",


        // function for input validate the regex
        value: function validate(input, RegularExpression) {
            debugger;
            var parent = input.parentNode;
            var regexValidator = /([0-9!@#$%^&*()~<>])/;

            if (input.value == "") {
                parent.classList = "form-group";
            } else if (RegularExpression.test(input.value) && !regexValidator.test(input.value)) {
                parent.classList = "form-group success";
            } else {
                parent.classList = "form-group error";
            }
        }
    }]);

    return validation;
}();

exports.default = validation;