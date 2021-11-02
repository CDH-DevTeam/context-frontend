import API from './api'

class CountAPI extends API {
  constructor () {
    super('/counts/', {})
  }

  async get (text, mode) {
    return super.get({word: text, mode: mode})
  }
}

const countAPI = new CountAPI()
export default countAPI
