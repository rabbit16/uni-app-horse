export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count,
      address: JSON.parse(uni.getStorageSync('address') || '{}'),
    }),
  // 模块的 mutations 方法
    mutations: {
      updateAddress(state, address){
        state.address = address
        this.commit("m_user/saveAddressToStorage")
      },
      saveAddressToStorage(state){
        uni.setStorageSync('address', JSON.stringify(state.address))
      }
    },
    // 模块的 getters 属性
    getters: {
      addstr(state){
        if(!state.address.provinceName){
          return ''
        }
        console.log(state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo)
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      }
    },
}