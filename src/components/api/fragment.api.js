import API from './api'

class FragmentAPI extends API {
  constructor () {
    super('/fragments/', {})
  }

  async get (query, name, year, chamber, limit, offset) {
    return super.get({ text: query, name: name, year: year, chamber: chamber, offset: offset, limit: limit })
  }
}

const fragmentAPI = new FragmentAPI()
export default fragmentAPI
