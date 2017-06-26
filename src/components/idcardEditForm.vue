<template>
  <div>
    <form v-if="!loading">
      <mu-text-field v-model="idcardNum" :errorText="idcardNumError" @blur="checkIdcardNum"  label="身份证号" hintText="请输入身份证号" fullWidth/><br/>
      <mu-text-field v-model="idcardNumRepeat" :errorText="idcardNumRepeatError" @blur="checkIdcardNum" label="再次输入身份证号" hintText="请再次输入身份证号" fullWidth/><br/>
    </form>
    <div v-else>

    </div>
  </div>

</template>
<script>
  export default{
      name:'idcardEditForm',
      props:['value','isLoading'],
      data(){
          return{
              loading:false,
              idcardNum:'',
              idcardNumRepeat:'',
              idcardNumError:'',
              idcardNumRepeatError:''
          }
      },
      methods:{

        checkIdcardNum(){
          let isOk=0;
          if(this.idcardNum===''){
              this.idcardNumError='请填写身份证信息';
              isOk++;
          }
          if(this.idcardNumRepeat===''){
              this.idcardNumRepeatError='请填写身份证信息';
              isOk++;
          }
          if(this.idcardNum.toUpperCase()!==this.idcardNumRepeat.toUpperCase()){
            this.idcardNumRepeatError='两次填写的身份证号不相同，请检查后重试';
            isOk++;
          }
          if(!isOk){
              this.idcardNumRepeatError='';
              this.idcardNumError='';
              this.$emit('input',{idcard:this.idcardNum.toUpperCase()});
          }
        }
      },
    watch:{
      isLoading(val){
          this.loading=!!val;
      }
    }
  }
</script>
