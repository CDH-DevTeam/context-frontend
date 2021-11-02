import Vue from 'vue'
import Vuex from "vuex";

Vue.config.productionTip = false
Vue.use(Vuex)
  
const store = new Vuex.Store({

  state: {
    count: 0,
    query: 'marknad',
    year: 0,
    document: '',
    countMode: 'absolute',
    years: [],
    documents: []
  },

  mutations: {

    query (state, params) {
      state.query = params.value
    },

    count (state, value) {
      state.count = value
    },

    countMode (state, params) {
      state.countMode = params.value
    },

    year (state, params) {
      state.year = params.value
    },

    document (state, params) {
      state.document = params.value
    },

    years (state, params) {
      state.years = params.value
    },

    documents (state, params) {
      state.documents = params.value
    }

  },

});

export default store;