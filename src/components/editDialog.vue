<template>
  <mu-dialog dialogClass="full-width" :open="isShow" :title="dialog_title">
    <component v-if="!loading" v-model="formValue" :is="currentForm"></component>
    <div v-else class="text-center">
      <mu-circular-progress :size="90"/>
      <p>提交中...</p>
    </div>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-raised-button slot="actions" class="dialog-button" :disabled="dialogConfirmDisable" primary @click="submit" label="确定"/>
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
          formValue:'',
          loading:false,
          dialogConfirmDisable:true
        }
      },
    methods:{
      close(){
        this.$emit('update:showDialog',false)
      },
      submit(){
          delete this.formValue.success;
//          console.log(this.formValue);
          this.loading=true;
          let that=this;
          setTimeout(function () {
              that.loading=false;
              that.$toasted.success("提交成功");
              that.close();
          },2000)

      }
    },
      watch:{
        showDialog(val){
            this.dialogConfirmDisable=true;
          this.isShow=!!val;
        },
        dialogTitle(val){
            this.dialog_title=val;
        },
        actionType(val){
            this.currentForm=val+'EditForm';
        },
        formValue(val){
          this.dialogConfirmDisable=val.success?false:true;
        }
      }
    }
</script>
