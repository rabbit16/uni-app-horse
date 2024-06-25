<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="goToDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(func) {
        func && func()
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
         this.isLoading = false
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        console.log(res)
       
        return res.message.goods
      },
      goToDetail(goods){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.getGoodsList(()=> uni.stopPullDownRefresh())
    },
    onReachBottom() {
      //让页码自增
      if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total){
        return uni.$showMsg("没数据啦")
      }
      if(this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
</style>