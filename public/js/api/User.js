class User {
  static get URL() {
    return '/user';
  }

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      callback(e);
    }
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      responseType: 'json',
      method: 'GET',
      callback: (_, response) => {
        if (response?.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback();
      }
    });
  }

  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error, response) => {
        if (error) {
          callback(error);
        } else {
          User.setCurrent(response.user);
          callback();
        }
      }
    });
  }


  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error, response) => {
        if (error) {
          callback(error);
        } else {
          User.setCurrent(response.user);
          callback();
        }
      }
    });
  }


  static logout(data, callback) {
    createRequest({
      url: this.URL + '/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error) => {
        if (error) {
          callback(error);
        } else {
          User.unsetCurrent();
          callback();
        }
      }
    });
  }
}
