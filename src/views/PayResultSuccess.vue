<template>
  <div class="successPageWrapper">
    <div class="mainInfo">
      <div class="nameAndPhone">{{name}} ({{phoneNumber}})</div>
      <div>
        <img src="../assets/img/successIcon.png" alt="" class="successImg">
      </div>
      <div class="mainInfoText">您已成功领取和平缔约128干红葡萄酒！</div>
      <div class="mainInfoSubText">红酒付款后预计24小时内发货，请耐心等待</div>
      <div class="buttonArea">
        <van-button type="danger" color="#d62435">继续购买 (回首页)</van-button>
      </div>
      <div class="customerService" @click="callCustomerService">
        <img src="../assets/img/callCustomerService.png" alt="">
      </div>
    </div>
    <div class="userCard">
      <van-cell :title="name" icon="location"  size="large" :label="addressDetail" center/>
    </div>
    <div class="productInfo">
      <van-cell-group>
        <van-cell title="商品信息" :border="false" title-class="color333"/>
        <van-cell :title="productName" :value="price" :border="false" title-class="color333" value-class="color333"/>
        <van-cell title="邮费" :value="postPrice" :border="false" title-class="color666" value-class="color333"/>
        <van-cell title="支付方式" :value="payment" :border="false" title-class="color666" value-class="color333"/>
        <van-cell title="下单时间" :value="orderTime" :border="false" title-class="color666" value-class="color333"/>
        <van-cell title="订单状态" :value="orderStatus" title-class="color666" value-class="color333"/>
      </van-cell-group>
      <div class="bottomText">我们已为您申请加急配送，请耐心等待~</div>
    </div>
    <van-popup v-model="isShowCustomerService" closeable close-icon="close" close-icon-position="top-right" :style="{ height: '40%',width:'70%' }">
      <div class="popCS">
        <div class="title">客服经理电话</div>
        <div class="main">
          <img src="../assets/img/customerServiceP.png" alt="">
        </div>
        <div class="number">16601300773</div>
        <div class="button">
          <van-button type="danger" color="#d62435" url="tel:16601300773">立即拨打</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '张三',
      phoneNumber: 13928472847,
      address: '北京-市朝阳区-湖光山色小区',
      addressDetail: '北京-市朝阳区-湖光山色小区北京-市朝阳区-湖光山色小区北京-市朝阳区-湖光山色小区北京-市朝阳区-湖光山色小区北京-市朝阳区-湖光山色小区',
      isShowCustomerService: false,
      productName: '和平缔约128干红葡萄酒',
      price: '¥ 0  (原价：¥680)',
      postPrice: '¥ 49  (24小时内发货)',
      payment: '微信支付',
      orderTime: '2020-01-16 15:35:23',
      orderStatus: '待支付'
    }
  },
  methods: {
    callCustomerService () {
      this.isShowCustomerService = true
    }
  }
}
</script>

<style lang="scss" scoped>
.successPageWrapper{
  background-color: #f8f8f8;
  .mainInfo{
    text-align: center;
    position: relative;
    .nameAndPhone{
      font-size: 13px;
      color: #b3b3b3;
      padding-top: 6px;
    }
    .successImg{
      margin-top: 30px;
      width:40px;
      height: 40px;
    }
    .mainInfoText{
      color: #333333;
      padding-top: 6px;
      font-size: 16px;
    }
    .mainInfoSubText{
      color: #c3c3c3;
      font-size: 13px;
      padding-top: 6px;
    }
    .buttonArea{
      padding-top: 6px;
      .van-button{
        width: 75%;
        border-radius: 5px;
      }
    }
    .customerService{
      position: absolute;
      right: 0;
      top: 34px;
      img{
        height: 90px;
      }
    }
  }
  .userCard{
    padding: 10px;
    .van-icon{
      color: #d62435;
      font-size: 24px;
    }
  }
  .productInfo{
    .color333{
      color: #333333
    }
    .color666{
      color: #666666
    }
    padding: 10px;
    .van-cell:first-child{
      border-radius: 12px;
    }
    .bottomText{
      padding-top: 4px;
      font-size: 12px;
      text-align: center;
      color: #cccccc;
    }
  }
  .van-popup{
    border-radius: 6px;
  }
  .popCS{
    text-align: center;
    .title{
      padding-top: 12px;
    }
    .main{
      padding-top: 50px;
      img{
        width: 54px;
      }
    }
    .number{
      padding-top: 10px;
    }
    .button{
      padding-top: 30px;
      .van-button{
        width: 62%;
        border-radius: 6px;
      }
    }
  }
}
</style>
