class Entity {

  static URL = '';
  static list(data, callback = f => f) {
    let opt= { data: data, url: `${this.URL}`, method: `GET`, responseType: 'json', callback: callback };
    return createRequest(opt);

  }

  static create(data, callback = f => f) {
    let opt = { data: data, url: `${this.URL}`, method: `PUT`, responseType: 'json', callback: callback };
    return createRequest(opt);
  }


  static remove(data, callback = f => f) {
    let opt = { data: data, url: `${this.URL}`, method: `DELETE`, responseType: 'json', callback: callback };
    console.log(opt)
    return createRequest(opt);
  }

}
