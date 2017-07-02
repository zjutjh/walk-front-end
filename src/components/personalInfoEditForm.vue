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
                v-model="area"/>
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
                v-model="char"/>
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
                v-model="startarea"/>
            </mu-col>
            <br/>
          </template>
        </mu-row>
      </template>
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
            area:'',
            char:'',
            startarea:''
          }
      },
      computed:{
          isPassport:function () {
            return this.$store.state.loginType==='passport';
          }
      }
  }
</script>
