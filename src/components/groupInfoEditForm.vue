<template>
  <form >
    <mu-text-field v-model="form.description"
                   label="队伍描述"
                   hintText="请输入队伍描述"
                   fullWidth/>
    <br/>
    <mu-text-field v-model="form.groupCount"
                   @blur="checkGroupCount"
                   label="队伍人数(2~4)"
                   hintText="请输入队伍人数"
                   :errorText="groupCountError"
                   fullWidth/><br/>
  </form>
</template>
<script>
  export default{
      name:'groupInfoEditForm',
      props:['value'],
      data(){
          return{
              form:{
                  description:'',
                  groupCount:''
              },
              groupCountError:''

          }
      },
      methods:{
        checkGroupCount(){
            let ok;
            if(this.form.groupCount<2||this.form.groupCount>4){
                this.groupCountError="人数必须在2~4人";
                ok++;
            }
            if(!ok){
                this.groupCountError='';
                this.$emit('input',{success:true,description:this.form.description,groupCount:this.form.groupCount});
            }
        }
      },
      watch:{
          value(val){
              for(let i in this.form){
                  if(val[i]!==undefined){
                      this.form[i]=val[i];
                  }
              }
          },
          deep:true

      }
  }
</script>
