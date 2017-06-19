<template>
  <div>
    <div class="m-bigImg">
    </div>
    <div class="m-content padding20">
      <console class=" margin-top10"></console>
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

        }
    },
    components:{
        GroupTable,
      Console
    }
  }
</script>
