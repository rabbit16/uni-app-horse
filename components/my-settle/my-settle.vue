<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio color="#C00000" :checked="isFullCheck" @click="updateAllGoodsState(!isFullCheck)" /><text>全选</text>
    </label> 
    <view class="amount-box">
      合计: <text class="amount">¥{{checkedGoodsAmount}}</text>
    </view>
    
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('m_cart', ['updateAllGoodsState'])
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      isFullCheck(){
        if(this.checkedCount === this.total) return true
        return false
      }
    }
  }
</script>

<style lang="scss">
 .my-settle-container{
   position: fixed;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 50px;
   background-color: white;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 14px;
   padding-left: 5px;
   .radio{
     display: flex;
     align-items: center;
   }
   
   .amount-box{
     .amount{
       color: #C00000;
       font-weight: bold;
     }
   }
   
   .btn-settle{
     background-color: #C00000;
     height: 50px;
     color: white;
     line-height: 50px;
     padding: 0 10px;
     min-width: 100px;
     text-align: center;
   }
 }
</style>