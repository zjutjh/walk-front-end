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

  import {DispatchActions} from '../../store/';
  export default{
    data(){
        return{
          logged:false,
          groupData:[]
        }
    },
    beforeMount:function () {

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
