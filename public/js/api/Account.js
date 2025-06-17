class Account extends Entity {
  static get URL() {
    return '/account';
  }


  static get(id, callback) {
    createRequest({
      url: this.URL + `/${id}`,
      responseType: 'json',
      method: 'GET',
      callback: callback
    });
  }
}
