import API from './api'

class DocumentAPI extends API {
  constructor () {
    super('/documents/', {})
  }

  async get (year, chamber, limit, offset) {
    return super.get({ year: year, chamber: chamber, offset: offset, limit: limit })
  }
}

const documentAPI = new DocumentAPI()
export default documentAPI
