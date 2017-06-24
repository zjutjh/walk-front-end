<template>
  <mu-dialog :open="isShow" :title="dialog_title">
    这是一个简单的弹出框
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
</template>
<script>
  export default{
      name:'EditGroupInfo',
      props:['showDialog','dialogTitle','actionType'],
      data(){
        return{
          isShow:false,
          dialog_title:'用户信息编辑'
        }
      },
    methods:{
      close(){
        this.$emit('update:showDialog',false)
      }
    },
      watch:{
        showDialog(val){
          this.isShow=!!val;
        },
        dialogTitle(val){
            this.dialog_title=val;
        }
      }
    }
</script>
