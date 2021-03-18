import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },

  mutations: {
    // mutations 的唯一目的是更改 state 中的状态
    // mutations 中每个方法中完成的事件应单一一些
    addCounter(state, payload) {
      payload.count += 1
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },

  actions: {
    // 逻辑操作放到 actions 中
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // payload：新添加的商品
        // 方法 1
        // let oldProduct = null
        // for (let item of context.state.cartList) {
        //   // 判断新添加的商品在购物车中是否已存在
        //   if (payload.iid === item.iid) {
        //     oldProduct = item
        //   }
        // }

        // 方法 2
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 若已存在，则原商品（即 item）的数量加 1
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else {
          // 若不存在，则给新添加的商品一个 count 属性，默认每个新商品数量为 1，并添加到列表中
          payload.count = 1
          // 给每个新添加的商品一个 checked 属性，默认为选中状态
          payload.checked = true
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('添加了新的商品')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }
})
