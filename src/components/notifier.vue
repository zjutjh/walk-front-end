<template>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="notifyOpen">
    {{noteMsg}}
  </mu-popup>
</template>
<script>
  export default{
      name:'Notifier',
      props:[''],
      data(){
          return {
            noteMsg: '',
            notifyOpen:false
          }
      },
      methods:{
          showNotify(){
              this.notifyOpen=true;
          }
      }

  }
</script>
