import Vuex from 'vuex'
// import Vue from 'vue'
import moduleCart from '@/store/cart.js' //取了个别名
import moduleUser from '@/store/user.js'

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})

export default store