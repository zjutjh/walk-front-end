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
  export default{
    data(){
        return{
          logged:false,
          groupData:[
            {id:1,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:2,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:3,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:4,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:5,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:6,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:7,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:8,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:9,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:10,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
            {id:11,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},]
        }
    },
    methods:{
      testLogin(){
        this.logged=this.$store.state.logged;
      },
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
