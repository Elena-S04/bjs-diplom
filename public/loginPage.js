"use strict";

const personeForm = new UserForm();

personeForm.loginFormCallback = (data) => {
  const { login, password } = data;

  const request = (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      personeForm.setLoginErrorMessage(answer.error);
    }
  };
  ApiConnector.login({ login, password }, request);
};

personeForm.registerFormCallback = (data) => {
  const { login, password } = data;

  const request = (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      personeForm.setRegisterErrorMessage(answer.error);
    }
  };
  ApiConnector.register({ login, password }, request);
};
