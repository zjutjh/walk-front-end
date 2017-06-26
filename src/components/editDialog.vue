<template>
  <mu-dialog dialogClass="full-width" :open="isShow" :title="dialog_title">
    <component v-model="formValue" :is="currentForm"></component>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="submit" label="确定"/>
  </mu-dialog>
</template>
<script>
  import idcardEditForm from './idcardEditForm.vue';
  import personalInfoEditForm from './personalInfoEditForm.vue';
  import groupInfoEditForm from './groupInfoEditForm.vue';
  export default{
      components:{
        idcardEditForm,
        personalInfoEditForm,
        groupInfoEditForm
      },
      name:'EditDialog',
      props:['showDialog','dialogTitle','actionType'],
      data(){
        return{
          isShow:false,
          dialog_title:'用户信息编辑',
          currentForm:'',
          formValue:''
        }
      },
    methods:{
      close(){
        this.$emit('update:showDialog',false)
      },
      submit(){
          console.log(this.formValue);
          this.close();
      }
    },
      watch:{
        showDialog(val){
          this.isShow=!!val;
        },
        dialogTitle(val){
            this.dialog_title=val;
        },
        actionType(val){
            this.currentForm=val+'EditForm';
        }
      }
    }
</script>
