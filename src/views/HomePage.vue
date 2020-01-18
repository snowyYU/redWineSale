<template>
<div class="homeBackground" v-touch:swipe="showBuyBtn" v-touch:moving="showBuyBtn">
  <img src="../assets/img/home.png" alt="" >
  <!-- <van-button color="red" size="normal" block class="oneBuyBtn" round>单色按钮</van-button> -->
  <van-button color="red" size="large" block class="bottomBuyBtn" v-if="bottomBtnShow" @click="showCreateAddress">单色按钮</van-button>
  <!-- <CreateAddress :isShow = "isShowCreateAddress"></CreateAddress> -->
   <van-popup v-model="isShowCreateAddress" get-container="body" :style="{ height: '60%' }" position="bottom" round closeable close-icon="close" :close-on-click-overlay=false safe-area-inset-bottom>
     <van-cell-group title="免费领取名额仅剩：5%">
     </van-cell-group>
     <div class = "sellProgress" style="padding: 10px 20px">
         <van-progress
        stroke-width="8"
        color="#ee0a24"
        :percentage="95"/>
      </div>
      <div class="addressArea">
        <van-cell-group title="填写收货信息，免费领取红酒">
          <van-address-edit
            :area-list="areaList"
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            save-button-text = "申请免费领取"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
          />
        </van-cell-group>
      </div>
   </van-popup>
</div>
</template>

<script>
// import CreateAddress from '@/components/CreateAddress.vue'

export default {
  data () {
    return {
      bottomBtnShow: false,
      isShowCreateAddress: false,
      areaList: {},
      searchResult: []
    }
  },
  components: {
    // CreateAddress
  },
  methods: {
    showBuyBtn () {
      console.log(111)
      this.bottomBtnShow = true
    },
    showCreateAddress () {
      this.isShowCreateAddress = true
    },
    onSave () {
      this.$toast('save')
    },
    onDelete () {
      this.$toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang = "scss" scoped>
  /* .homeBackground{
    background-image: url(../assets/img/home.png);
    background-position: center center;
    background-repeat: no-repeat;
  } */
  .homeBackground {
    img {
      width: 100vw;
      max-width: 600px;
    }
    .oneBuyBtn{
      position: fixed;
      bottom: 50px;
    }
    .bottomBuyBtn{
      position: fixed;
      bottom: 0;
    }
    .sellProgress{
      padding: 10px 20px;
    }
    .van-progress__pivot{
      z-index: 100;
    }
    .bottomBuyBtn {
        display: block;
        width: 100%;
    }
  }
  .van-hairline--top-bottom::after{
    border:none !important;
  }
  .addressArea{
    .van-cell-group__title{
      text-align: center;
      color: black;
    }
    .van-button--block{
      display: block;
      width: 40%;
      /* float: right; */
      position: absolute;
      right: 0;
    }
  }
  .addressArea ::v-deep .van-button--block{
    display: block;
    width: 40%;
    /* float: right; */
    position: absolute;
    right: 0;
  }
</style>
