<template>
  <view>
    <uni-search-bar @input="input" radius="15" cancelButton="none"></uni-search-bar>
    
  <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="goToGoodsId(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history_title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clean"></uni-icons>
      </view>
      <view class="history_list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key='i' @click="goToGoodsList(item)">{{item}}</uni-tag>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: null,
        // 搜索的结果列表
        searchResults: [],
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e){
        clearInterval(this.timer)
        this.timer = setTimeout(()=> {
          this.kw = e.value
          this.getSearchList()
        }, 500)
      },
      async getSearchList(){
        if(this.kw.length === 0){
          this.searchResults = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
        if(res.meta.status !== 200){
          console.log(res)
          return uni.$showMsg()
        }
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      goToGoodsId(item){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory(){
        this.historyList.push(this.kw)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList = []
        uni.clearStorageSync('kw')
      },
      goToGoodsList(kw){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      histories(){
        return new Set([...this.historyList].reverse())
      }
    }
  }
</script>

<style lang="scss">
  .sugg-list{
    padding: 0 5px;
    .sugg-item{
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .goods-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  .history-box{
    padding: 0 5px;
    .history_title{
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history_list{
      display: flex;
      flex-wrap: wrap;
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
    
  }
</style>
