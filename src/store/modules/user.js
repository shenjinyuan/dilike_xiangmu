import {login} from '@/api/login'
export default {
  namespaced:true,
  state: {
    userData:null
  },
  mutations: {
    SET_USER_DATA(state,userData) {
state.userData = userData
    }
  },
  getters: {},
  actions: {
    async login({commit},loginuser) {
      const { data } = await login(loginuser)
      console.log(data);
      commit('SET_USER_DATA',data)
  }
  },
}
