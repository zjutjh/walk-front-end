<template>
    <form >
      <mu-text-field v-model="idcardNum" :errorText="idcardNumError" @blur="checkIdcardNum"  label="身份证号" hintText="请输入身份证号" fullWidth/><br/>
      <mu-text-field v-model="idcardNumRepeat" :errorText="idcardNumRepeatError" @blur="checkIdcardNum" label="再次输入身份证号" hintText="请再次输入身份证号" fullWidth/><br/>
    </form>
</template>
<script>
  export default{
      name:'idcardEditForm',
      props:['value','isLoading'],
      data(){
          return{
              idcardNum:'',
              idcardNumRepeat:'',
              idcardNumError:'',
              idcardNumRepeatError:''
          }
      },
      methods:{

        checkIdcardNum(value){
          let isOk=0;
//          console.log(value);
          if(typeof value==='object'){
              value='';
          }
          let icnr=value||this.idcardNumRepeat;
          if(this.idcardNum===''){
              this.idcardNumError='请填写身份证信息';
              isOk++;
          }
          if(icnr===''){
              this.idcardNumRepeatError='请填写身份证信息';
              isOk++;
          }
          if(this.idcardNum.toUpperCase()!==icnr.toUpperCase()){
            this.idcardNumRepeatError='两次填写的身份证号不相同，请检查后重试';
            isOk++;
          }
          if(!isOk){
              this.idcardNumRepeatError='';
              this.idcardNumError='';
              this.$emit('input',{success:true,idcard:this.idcardNum.toUpperCase()});
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
