export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count,
      address: JSON.parse(uni.getStorageSync('address') || '{}'),
      token: uni.getStorageSync('token') || '',
      userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
      redirectInfo: null
    }),
  // 模块的 mutations 方法
    mutations: {
      updateAddress(state, address){
        state.address = address
        this.commit("m_user/saveAddressToStorage")
      },
      saveAddressToStorage(state){
        uni.setStorageSync('address', JSON.stringify(state.address))
      },
      updateUserInfo(state, userInfo){
        state.userInfo = userInfo
        this.commit('m_user/saveUserInfoStorage')
      },
      saveUserInfoStorage(state){
        uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
      },
      updateToken(state, token){
        state.token = token
        this.commit('m_user/saveToken')
      },
      saveToken(state){
        uni.setStorageSync('token', state.token)
      },
      updateRedirectInfo(state, info){
        state.redirectInfo = info
        console.log(state.redirectInfo)
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