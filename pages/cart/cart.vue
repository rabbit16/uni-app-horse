<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swiperItemClick(goods.goods_id)" @change="change">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioClickHandler" :show-num="true"
            @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 结算组件 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
  // import badgeMix from '@/mixins/tarbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    // mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    onShow() {},
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioClickHandler(e) {
        console.log(e)
        this.updateGoodsState(e)
      },
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swiperItemClick(goods_id){
        this.removeGoodsById(goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;
    font-size: 14px;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img{
      width: 90px;
      height: 90px;
    }
    .tip-text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>