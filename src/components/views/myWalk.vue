<template>
  <div>
    <div class="m-bigImg">
    </div>
    <div class="m-content padding20">
      <div class="margin-top10" v-if="logged">
        <console></console>
      </div>

      <group-table></group-table>
    </div>
    <div class="m-bigImg">
    </div>
  </div>
</template>
<script>
  import GroupTable from '../groupTable.vue';
  import Console from '../console.vue'
  export default{
    data(){
        return{
          logged:false
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
