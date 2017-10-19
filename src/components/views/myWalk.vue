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

          groupData:[]
        }
    },
    beforeMount:function () {

    },
    methods:{
    },
    mounted:function () {

    },
    computed:{
      logged:function () {
        return this.$store.state.logged;
      }
    },
    watch:{
    },
    components:{
        GroupTable,
      Console
    }
  }
</script>
