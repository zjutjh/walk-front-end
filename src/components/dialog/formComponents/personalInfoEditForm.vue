<template>
    <form>
      <template v-if="isPassport">
        <h5>请选择您所在的校区</h5>
        <mu-row>
          <template v-for="item,index in areaList">
            <mu-col :width="(100/areaList.length)+''" :tablet="(100/areaList.length)+''" :desktop="(100/areaList.length)+''">
              <mu-radio
                :key="index"
                :label="item"
                :nativeValue="item"
                v-model="formValue.area"/>
            </mu-col>
            <br/>
          </template>
        </mu-row>


      </template>
      <template v-else>
        <h5>请选择您的角色</h5>
        <mu-row>
          <template v-for="item,index in charList">
            <mu-col :width="(100/charList.length)+''" :tablet="(100/charList.length)+''" :desktop="(100/charList.length)+''">
              <mu-radio
                :key="index"
                :label="item"
                :nativeValue="item"
                v-model="formValue.area"/>
            </mu-col>
            <br/>
          </template>
        </mu-row>
      </template>
      <br/>
      <template>
        <h5>请选择您出发的校区</h5>
        <mu-row>
          <template v-for="item,index in startAreaList">
            <mu-col :width="(100/startAreaList.length)+''" :tablet="(100/startAreaList.length)+''" :desktop="(100/startAreaList.length)+''">
              <mu-radio
                :key="index"
                :label="item"
                :nativeValue="item"
                v-model="formValue.startarea"/>
            </mu-col>
            <br/>
          </template>
        </mu-row>
      </template>
      <br/>
      <mu-text-field label="电话号码" v-model="formValue.phone" hintText="请输入电话号码" labelFloat fullWidth />
      <br/>
      <mu-text-field label="QQ号"  v-model="formValue.qq" hintText="请输入QQ号" labelFloat fullWidth />
      <br/>
    </form>
</template>
<script>
  export default{
      name:'personalInfoEditForm',
      props:['value'],
      data(){
          return{
            areaList:['朝晖','屏峰'],
            charList:['社会人士','校友','老师'],
            startAreaList:['朝晖','屏峰','自主前往'],
            formValue:{
              area:'',
              startarea:'',
              qq:'',
              phone:'',
              id:this.$store.state.loginUid,
            },

          }
      },
      beforeMount:function () {
          let store=this.$store;
          this.formValue.area=store.state.userArea;
          this.formValue.startarea=store.state.userStartArea;
          this.formValue.phone=store.state.userPhone;
          this.formValue.qq=store.state.userQQ;
      },
      mounted:function () {
        this.emitValue();
        this.$watch('formValue',function () {
          this.emitValue();
        },{
            deep:true
        })
      },
      methods:{
        emitValue(){
//            console.log('value changed')
          if(this.checkObject()){
            this.$emit('input',{success:true,...this.formValue});
          }else{
            this.$emit('input',{success:false});
          }
        },
        checkObject(){
          for(let i in this.formValue){
              if(this.formValue[i]===''){
                  return false;
              }
          }
          return true;

        }
      },
      computed:{
          isPassport:function () {
            return this.$store.state.loginType==='user';
          }
      },
    watch:{


    }
  }
</script>
