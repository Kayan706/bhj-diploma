
class Account extends Entity {

  static URL = '/account';

  static get(id = '', callback = f => f) {
    let options = {
      url: `${this.URL}/${id}`,
      responseType: 'json',
      data: null, 
      
      method: 'GET',
      callback: callback
    }
    createRequest(options)
    console.log(options)
  }
}
