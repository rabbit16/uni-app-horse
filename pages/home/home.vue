<template>
  <view>
    <!-- //这是搜索组件 -->
    <view class="search-box">
      <my-search @click="goToSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>


    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
  </view>

  <!-- 楼层区域 -->
  <view class="floor-list">
    <view class="floor-item" v-for="(item, i) in floorList" :key="i">
      <image :src="item.floor_title.image_src" class="floor-title"></image>
      <view class="floor-img-box">
        <!-- 左侧的大盒子区域 -->
        <navigator class="left-img-box" :url="item.product_list[0].url">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
            mode="widthFix"></image>
        </navigator>
        <!-- 右侧的小盒子区域 -->
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" :url="item2.url">
            <image :src="item2.image_src" mode="widthFix" v-if="i2 !== 0" :style="{width: item2.image_width + 'rpx'}">
            </image>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tarbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 1. 轮播图的数据列表，默认为空数组
        swiperList: [],
        navList: [],
        floorList: []
      }
    },
    onLoad() {
      // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 3. 获取轮播图数据的方法
      async getSwiperList() {
        // 3.1 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')

        console.log(res)
        // 3.2 请求失败
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.message

      },
      async getNavList() {
        // 3.1 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')



        console.log(res)
        // 3.2 请求失败
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 3.3 请求成功，为 data 中的数据赋值
        this.navList = res.message

      },
      navClickHandler(item) {
        if (item.name == "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
        console.log(item)
      },
      async getFloorList() {
        // 3.1 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')



        console.log(res)
        // 3.2 请求失败
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split("?")[1]
          })
        })
        console.info(res.message)
        // 3.3 请求成功，为 data 中的数据赋值
        this.floorList = res.message

      },
      goToSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      height: 140rpx;
      width: 128rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
</style>