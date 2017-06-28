<template>
  <div>
    <div class="m-img-container">
      <img class="m-bigImg" src="http://fpoimg.com/1254x400"/>
    </div>
    <div class="m-content padding20">
      <div class="margin-top10" v-if="logged">
        <console></console>
      </div>

      <group-table :group-data="groupData"></group-table>
    </div>
    <div class="m-img-container">
      <img class="m-bigImg" src="http://fpoimg.com/1254x400"/>
    </div>
  </div>
</template>
<script>
  import GroupTable from '../groupTable.vue';
  import Console from '../console.vue'
  import colorO from '../colorGradient.js';
  export default{
    data(){
        return{
          logged:false,
          groupData:[]
        }
    },
    beforeMount:function () {
      this.getGroupData();
    },
    methods:{
      testLogin(){
        this.logged=this.$store.state.logged;
      },
      getGroupData(){
          let gd=[
            {id:1,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:0},
            {id:2,description:'667',area:'zhaohui',max_num:4,now_num:2,pre_num:20,locked:0},
            {id:3,description:'667',area:'zhaohui',max_num:4,now_num:3,pre_num:20,locked:0},
            {id:4,description:'667',area:'zhaohui',max_num:4,now_num:4,pre_num:5,locked:0},
            {id:5,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:0},
            {id:6,description:'667',area:'zhaohui',max_num:4,now_num:4,pre_num:20,locked:0},
            {id:7,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:1},
            {id:8,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:0},
            {id:9,description:'667',area:'zhaohui',max_num:3,now_num:1,pre_num:20,locked:0},
            {id:10,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:0},
            {id:11,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20,locked:0},
          ];
          this.groupData=this.filterGroupData(gd);

      },
      filterGroupData(val){
          let cRed="#F44336";
          let cGreen="#4CAF50";
        for (let i in val){
          let group=val[i];
          val[i].payloadColor=colorO.getColorByPercent(cGreen,cRed,parseInt(((group.now_num-1)/(group.max_num-1))*100))

          if(group.now_num>=group.max_num||group.locked){
            val[i].isDisable=true;
          }else{
            val[i].isDisable=false;
          }
        }
        console.log(val);
        return val;
      }
    },
    mounted:function () {
      this.testLogin();
    },
    computed:{
      getLogInfo() {
        return this.$store.state.logged;
      }
    },
    watch:{
      getLogInfo(val){
        this.logged=!!val;
        this.testLogin();
      }
    },
    components:{
        GroupTable,
      Console
    }
  }
</script>
