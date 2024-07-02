<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
    <text class="tips-text">登录服务更多哦</text>
  </view>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {
      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo','token', 'userInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      async getUserInfo(e) {
        await uni.getUserProfile({
          desc: "获取用户信息",
          success: (res) => {
            this.updateUserInfo(res)
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg("用户信息获取失败，请重新登录")
          }
        })
      },
      getToken(info){
        const _this = this
        uni.login({
          provider: 'weixin', //使用微信登录
          success: async function (res) {
            console.log(res);
            if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败!')
            const query = {
              code: res.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            }
            const {data: resL} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            console.log(resL)
            _this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
            
            uni.$showMsg("登录成功")
            _this.navigateBack()
          },
          fail: (res) => {
            console.log(res)
          }
        });
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
        console.log(this.redirectInfo.from)
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 450px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      background-color: white;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {}
  }
</style>