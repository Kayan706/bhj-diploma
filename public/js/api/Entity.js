class Entity {
  static get URL() {
    return '';
  }

  static list(data, callback){
    createRequest({
      url: this.URL + `?account_id=${data}`,
      responseType: 'json',
      method: 'GET',
      callback: callback
    });
  }


  static create(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      responseType: 'json',
      method: 'PUT',
      callback: callback
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      responseType: 'json',
      method: 'DELETE',
      callback: callback
    });
  }
}
