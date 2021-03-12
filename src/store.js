import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//挂载Vuex
Vue.use(Vuex);
//创建vuex对象
const store = new Vuex.Store({
    state: {
        //共享状态
        comingsoonlist: [],
        datalist: []
    },
    mutations: {
        //执行方法
        GetComingSoonMutation(state, payload) {
            state.comingsoonlist = payload
            state.datalist = payload.seller
        }
    },
    actions: {
        //异步操作
        GetComingSoonAction(store) {
            //发送ajax请求
            axios.get("/static/data.json").then(res => {
                // console.log(res.data);
                //提交给mutation操作状态
                store.commit('GetComingSoonMutation', res.data);
            })
        }
    }
})

export default store;