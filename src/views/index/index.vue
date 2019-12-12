<template>
  <div class="page">

    <div class="title">
      <span>{{msg}}</span>
    </div>
    <div id="content" class="content">
      <div class="introduce">
        <span>易捷家政，让你省心、放心、安心</span>
        <span>详细的介绍</span>
      </div>
      <div class="jump">
        <el-button type="primary" style="width: 160px;height: 60px;">
          <router-link to="/dishboard" style="text-decoration: none;">
            <span style="font-size: 30px;color: #000000;">开始使用</span>
          </router-link>
        </el-button>
      </div>
      <div class="link animated swing infinite">
        <span>友情合作</span>
        <div class="to" >
          <div v-on:click="tourl(item.url)" class="item" v-for="item in cooperation">
            <span>{{item.name}}</span>
            <div class="img" style="">
              <!-- <img :src="imgSrc" :alt="imgSrc"> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="footer "></div>
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name: 'index',
  data(){
   return{
      imgSrc:'../../assets/image/element.png',
      msg:"易捷家政",
      cooperation:[{
        name:"element-ui",
        url:"https://element.eleme.cn/#/zh-CN",
        src:"../../assets/image/element.png",
      },{
        name:"element-ui",
        url:"https://element.eleme.cn/#/zh-CN",
        src:"../../assets/image/element.png",
      },{
        name:"element-ui",
        url:"https://element.eleme.cn/#/zh-CN",
        src:"../../assets/image/element.png",
      },{
        name:"element-ui",
        url:"https://element.eleme.cn/#/zh-CN",
        src:"../../assets/image/element.png",
      }]
   }
    },
  computed: {

  },
 mounted(){
  $('#content').addClass('animated bounceInUp')
 },
  methods:{
    tourl(e){
      window.location.href = e;
    },
    addclass(param){
      console.log(param)
    }
  }
}
</script>
<style>
  .link{
   animation-duration: 5s;
   animation-delay: 2s;
 }
</style>
<style scoped="" lang="scss">
  .page{
    height: 100%;
    width: 100%;
    background-image: url("../../assets/image/bkimg/indexbk.jpg");
    background-repeat: no-repeat;
    background-size:100% 100%;
    .title{
      margin-left: 50px;
      height: 10%;
      line-height: 100px;
      span{
        font-size: 30px;
        font-weight: bolder;
      }
    }
    .content{
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      height: 60%;
      div{
        height: 200px;
        margin: 10px;
      }
      .introduce{
        margin:0px 300px;
        span{
          display: block;
          text-align: center;
        }
      }
      .jump{
         display: flex;
         justify-content: center;
         align-items: center;
         background: none;
         opacity: 1;

      }
      .link{
        margin: 0 auto;
        span{
          display: block;
          text-align: center;
          margin-top:30px;
          margin-bottom: 20px;
        }
        .to{
          display: flex;
          padding: 0 auto;
          .item{
            width: 100px;
            height: 100px;
            .img{
              padding: 0;
              margin:0;
              width: 100%;
              height: 60%;
              background-image: url('../../assets/image/element.png');
              background-size: 100% 100%;
            }
          }
        }
      }

    }
    .footer{}
  }
</style>
