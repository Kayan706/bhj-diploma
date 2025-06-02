
class User {

  static URL = "/user";

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }
  static unsetCurrent() {
    delete localStorage.user;
  }
  static current() {

    if (!localStorage.user) {
      return undefined;
    }
    else return JSON.parse(localStorage.user);

  }

  static fetch(callback ) {

    let options = {
      url: this.URL + '/' + 'current',
      responseType: 'JSON',
      // data: data,
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else if (response.success === false) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    }
    return createRequest(options);
}

  static login( data, callback = f =>f) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
          console.log("Пользователь успешно авторизован")
        }
        callback(err, response);
      }
    });
  }

  static register( data, callback = f =>f) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
          console.log("Пользователь зарегистрирован")
        }
        callback(err, response);
      }
    });
  }

  static logout(data, callback = f =>f) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          User.unsetCurrent();
          console.log("Выход из приложения")
        }
        callback(err, response);
      }
    });
  }
}