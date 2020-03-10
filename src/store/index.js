import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingData: []
  },
  mutations: {
    // 添加商品到购物车数据源
    addShoppingData(state, goods) {
      const isExist = state.shoppingData.some((item) => {
        if (item.id === goods.id) {
          item.count += 1
          return true
        }
      })
      if (!isExist) {
        // Vue.set添加的对象属性是响应式的
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'count', 1)
        state.shoppingData.push(goods)
      }
    },
    changeShoppingData(state, data) {
      // 修改指定数据
      state.shoppingData[data.index].count = data.count
    },
    changeGoodsState(state, {
      isCheck,
      index
    }) {
      state.shoppingData[index].isCheck = isCheck
    }
  },
  getters: {
    getShoppingData(state) {
      return state.shoppingData
    }
  },
  actions: {},
  modules: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
