
<template>
    <div>
      <!--bigImg-->
      <div class="m-img-container">
        <img class="m-bigImg" src="http://fpoimg.com/1254x400"/>
      </div>
      <!--yxInfo-->
      <div class="m-yxInfo">
        <mu-row>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-yxInfo-span">{{yxInfo.nowNum}}</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-yxInfo-span">{{yxInfo.date}}</span>
          </mu-col>
        </mu-row>
      </div>
      <div class="m-webInfo">
        <mu-row>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-webInfo-span">{{webInfo.state}}</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-webInfo-span">{{webInfo.signInTime}}</span>
          </mu-col>
        </mu-row>
      </div>
      <!--photos-->
      <!--timeLine-->
      <h1 class="m-time-line-title">big event</h1>
      <mu-row>
        <mu-col width="0" tablet="20" desktop="20">&nbsp;</mu-col>
        <mu-col width="100" tablet="60" desktop="60">
          <timeline>
            <timeline-item v-for="item in timeLineData" :key="item.index" :color="item.color">
              <h2 class="tl-time">{{item.time}}</h2>
              <p class="tl-content">{{item.content}}</p>
            </timeline-item>
          </timeline>
        </mu-col>
        <mu-col width="0" tablet="20" desktop="20">&nbsp;</mu-col>
      </mu-row>



    </div>
</template>
<script>

  import timeline from 'pzvue-timeline'
  import timeLineData from '../../../config/staticData/timeLineData.json'
  export default{
    data(){
        return{
          yxInfo:{
            nowNum:'2334',
            date:'2019-2-30'
          },
          webInfo:{
            state:'报名已经结束',
            signInTime:'2018-2-20 2019-1-20'
          },
          timeLineData:timeLineData.data
        }
    },
    components:{
      "timeline": timeline,
      "timeline-item": timeline.item,
    }
  }
</script>
