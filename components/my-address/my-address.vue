<template>
  <view>
    <!-- 选择收货地点的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人：{{address.userName}}
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：{{address.telNumber}}
            <uni-icons type="arrowright" size="16"></uni-icons>
          </view>
        </view>
      </view>

      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>

    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        await uni.chooseAddress({
          success: (res) =>  {
            this.updateAddress(res)
            // console.log("开始赋值")
            // console.log(this.address)
            // console.log("结束赋值")
          },
          fail: (res) =>  {
            console.log(res)
          }
        })
      }
    },
    computed: {
      ...mapState('m_user', ["address"]),
      ...mapGetters('m_user', ['addstr'])
    },
  }
</script>

<style lang="scss">
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-left {
        .username {}
      }

      .row1-right {
        display: flex;
        justify-content: space-between;

        .phone {}
      }
    }

    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }

      .row2-right {}
    }
  }
</style>