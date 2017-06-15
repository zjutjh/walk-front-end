
<template>
    <div>
      <!--bigImg-->
      <div class="m-bigImg">1112</div>
      <!--yxInfo-->
      <div class="m-yxInfo">
        <mu-row>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-yxInfo-span">{{nowYxNum}}</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50">
            <span class="m-yxInfo-span">{{endTime}}</span>
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
            nowYxNum:'123456',
          endTime:'2019-2-30',
          timeLineData:timeLineData.data
        }
    },
    components:{
      "timeline": timeline,
      "timeline-item": timeline.item,
    }
  }
</script>
