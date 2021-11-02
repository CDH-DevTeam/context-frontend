import API from './api'

class SentenceAPI extends API {
  constructor () {
    super('/sentences/', {})
  }

  async get (text, offset, limit, year, document) {
    return super.get({ text: text, offset: offset, limit: limit, year: year, document: document })
  }
}

const sentenceAPI = new SentenceAPI()
export default sentenceAPI

