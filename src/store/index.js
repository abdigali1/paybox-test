import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      name: null,
      month: null,
      year: null,
      ccv: '',
    },
    isActiveSpinner: false
  },
  getters: {
    getSpinnerValue: (state) => state.isActiveSpinner,
    getFormValue: (state) => state.form,
  },
  mutations: {
    SET_FORM(state, payload) {
      for (let key in payload) {
        state.form[key] = payload[key]
      }
    },
    SET_SPINNER(state, payload) {
      state.isActiveSpinner = payload
    }
  },
  actions: {

  }
})
