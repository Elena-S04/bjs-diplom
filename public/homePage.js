const logout = new LogoutButton();

logout.action = () => {
  const output = (answer) => {
    if (answer.success) {
      location.reload();
    }
  };
  ApiConnector.logout(output);
};

ApiConnector.current((answer) => {
  if (answer.success) {
    ProfileWidget.showProfile(answer.data);
  }
});

const rates = new RatesBoard();

const getRates = () => {
  ApiConnector.getStocks((answer) => {
    if (answer.success) {
      rates.clearTable();
      rates.fillTable(answer.data);
    }
  });
};

getRates();
setInterval(() => getRates(), 60000);

//Операции с деньгами

const finance = new MoneyManager();

finance.addMoneyCallback = ({ currency, amount }) => {
  const application = (answer) => {
    if (answer.success) {
      ProfileWidget.showProfile(answer.data);
      finance.setMessage(
        answer.success,
        `Пополнение счета ${currency} успешно произведено на ${amount} ${currency}`
      );
    } else {
      finance.setMessage(answer.success, answer.error);
    }
  };
  ApiConnector.addMoney({ currency, amount }, application);
};

finance.conversionMoneyCallback = ({
  fromCurrency,
  targetCurrency,
  fromAmount,
}) => {
  const application = (answer) => {
    if (answer.success) {
      ProfileWidget.showProfile(answer.data);
      finance.setMessage(
        answer.success,
        `Успешная конвертация ${fromAmount} ${fromCurrency} в ${targetCurrency}`
      );
    } else {
      finance.setMessage(answer.success, answer.error);
    }
  };
  ApiConnector.convertMoney(
    { fromCurrency, targetCurrency, fromAmount },
    application
  );
};

finance.sendMoneyCallback = ({ to, currency, amount }) => {
  const application = (answer) => {
    if (answer.success) {
      ProfileWidget.showProfile(answer.data);
      finance.setMessage(
        answer.success,
        `Перевод ${amount} успешно переведен выбранному пользователю`
      );
    } else {
      finance.setMessage(answer.success, answer.error);
    }
  };
  ApiConnector.transferMoney({ to, currency, amount }, application);
};

//Работа с избранным
const myContacts = new FavoritesWidget();

ApiConnector.getFavorites((answer) => {
  if (answer) {
    myContacts.clearTable();
    myContacts.fillTable(answer.data);
    finance.updateUsersList(answer.data);
  }
});

myContacts.addUserCallback = ({ id, name }) => {
  const application = (answer) => {
    if (answer.success) {
      myContacts.clearTable();
      myContacts.fillTable(answer.data);
      finance.updateUsersList(answer.data);
      myContacts.setMessage(
        answer.success,
        `Пользователь ${name} успешно добавлен в контакты`
      );
    } else {
      myContacts.setMessage(answer.success, answer.error);
    }
  };
  ApiConnector.addUserToFavorites({ id, name }, application);
};

myContacts.removeUserCallback = (id) => {
  const application = (answer) => {
    if (answer.success) {
      myContacts.clearTable();
      myContacts.fillTable(answer.data);
      finance.updateUsersList(answer.data);
      myContacts.setMessage(
        answer.success,
        `Пользователь ${id} успешно удален из контактов`
      );
    } else {
      myContacts.setMessage(answer.success, answer.error);
    }
  };
  ApiConnector.removeUserFromFavorites(id, application);
};
