import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

const testOption = {
    namespaced:true,//...mapState('testAbout',['dataList'])为了在这里能找到testAbout
    actions:{
        async getTestData({commit}){
            let res = await vehicle.test()
            // 这里应该判断状态码，状态码为成功才执行下面语句
            commit('GetTestData',res)
        },
    },
    mutations:{
        GetTestData(state,res){
            for(let i in res){
                state.dataList.push({
                    id:res[i].id,
                    value:res[i].value
                })
            }
        }
    },
    state:{
        dataList:[],
    }
}
export default testOption