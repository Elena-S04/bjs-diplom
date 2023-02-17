"use strict";

const personeForm = new UserForm();

personeForm.loginFormCallback = (data) => {
  const request = (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      personeForm.setLoginErrorMessage(answer.error);
    }
  };
  ApiConnector.login(data, request);
};

personeForm.registerFormCallback = (data) => {
  const request = (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      personeForm.setRegisterErrorMessage(answer.error);
    }
  };
  ApiConnector.register(data, request);
};
