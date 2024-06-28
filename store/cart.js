export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count,
      cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    }),
  // 模块的 mutations 方法
    mutations: {
      addToCart(state, goods){
        const findResult = state.cart.find( (x) => x.goods_id === goods.goods_id )
        if (!findResult){
          state.cart.push(goods)
        }
        else{
          findResult.goods_count++
        }
        this.commit('m_cart/saveToStorage')
      },
      updateGoodsState(state, goods){
        const findResult = state.cart.find( (x) => x.goods_id === goods.goods_id )
        if(findResult){
          console.log('进来了')
          console.log(findResult)
          console.log(goods)
          findResult.goods_state = goods.goods_state
          console.log(findResult)
          this.commit('m_cart/saveToStorage')
        }
      },
      updateGoodsCount(state, goods){
        const findResult = state.cart.find( (x) => x.goods_id === goods.goods_id )
        if(findResult){
          findResult.goods_count = goods.goods_count
          console.log(findResult)
          this.commit('m_cart/saveToStorage')
        }
      },
      saveToStorage(state){
        uni.setStorageSync('cart', JSON.stringify(state.cart))
      },
      removeGoodsById(state, goods_id){
        state.cart = state.cart.filter( (x) => x.goods_id !==goods_id )
        this.commit('m_cart/saveToStorage')
      },
      updateAllGoodsState(state, newState){
        state.cart.forEach(x => x.goods_state = newState)
        this.commit("m_cart/saveToStorage")
      },
      
    },
    // 模块的 getters 属性
    getters: {
      total(state){
        let c = 0
        state.cart.forEach(goods => c += goods.goods_count)
        return c
      },
      checkedCount(state){
        return state.cart.filter(x => x.goods_state).reduce((total, item) => {return total += item.goods_count}, 0)
      },
      checkedGoodsAmount(state){
        console.log("计算总额")
        return state.cart.filter( x => x.goods_state).reduce(
        (total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
      }
    },
}