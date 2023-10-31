import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {},
        word: {},
        wordName: "",
        allTeacher: [],
        allGroup: [],
        historyUser: {}
    },
    mutations: {},
    actions: {},
    getters: {}
})
