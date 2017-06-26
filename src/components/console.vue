<template>
  <div>
    <mu-appbar>
      <mu-flat-button slot="left" class="normal-icon-but" @click="editPersonalInfo" >
        <i class="iconfont icon-2x icon-xiugai"></i>
      </mu-flat-button>
      <mu-flat-button slot="left" class="normal-icon-but" @click="editIdCard">
        <i class="iconfont icon-2x icon-shenfenzheng1"></i>
      </mu-flat-button>
      <mu-flat-button class="big-icon-but" slot="left">

        <mu-badge content="12" circle color="red">
          <i class="iconfont icon-2x icon-tixing"></i>
        </mu-badge>
      </mu-flat-button>

      <!--如果是游客-->
      <mu-flat-button slot="right" v-if="signUpState===''||signUpState==='customer'" @click="addGroup" class="normal-icon-but">
          <i class="iconfont icon-2x icon-xinzeng-copy"></i>
      </mu-flat-button>
      <!--如果是队员-->
      <mu-flat-button slot="right" v-if="signUpState==='member'" @click="showGroupInfo" class="normal-icon-but">
        <i class="iconfont icon-2x icon-chakan"></i>
      </mu-flat-button>
      <!--如果是队长-->
      <template v-if="signUpState==='leader'">
        <mu-flat-button slot="right"  @click="deleteGroup" class="normal-icon-but">
          <i class="iconfont icon-2x icon-delete"></i>
        </mu-flat-button>
        <mu-flat-button slot="right" @click="editGroupInfo" class="normal-icon-but">
          <i class="iconfont icon-2x icon-xiugai"></i>
        </mu-flat-button>
        <mu-flat-button slot="right" @click="showGroupInfo" class="normal-icon-but">
          <i class="iconfont icon-2x icon-chakan"></i>
        </mu-flat-button>
        <mu-flat-button slot="right"  @click="triggerLock" class="normal-icon-but">
          <i v-if="!locking" class="iconfont icon-2x" :class="{'icon-lock':isLocked,'icon-unlock':!isLocked,'red-text':isLocked}"></i>
          <mu-circular-progress v-else :size="20" color="orange"/>
        </mu-flat-button>
      </template>


    </mu-appbar>
    <edit-dialog :show-dialog.sync="dialogVisible" :dialog-title="dialogTitle" :action-type="dialogActionType"></edit-dialog>
    <info-dialog :show-dialog.sync="infoDialogVisible"></info-dialog>
  </div>
</template>
<script>
  import EditDialog from './editDialog.vue';
  import InfoDialog from "./infoDialog";

  export default{
      components:{
        InfoDialog,
        EditDialog
      },
      name:'Console',
      data(){
          return{
              signUpState:'leader',
              isLocked:true,
              locking:false,
              dialogVisible:false,
              dialogTitle:'编辑',
              dialogActionType:'',
              infoDialogVisible:false
          }
      },
      methods:{
          triggerLock(){
              if(this.locking)return;
            this.locking=true;
            let that=this;
            setTimeout(function () {
              that.locking=false;
              that.isLocked=!that.isLocked;
            },2000)
          },
          showDialog(dialogTitle,dialogActionType){
            this.dialogTitle=dialogTitle;
            this.dialogActionType=dialogActionType;
            this.dialogVisible=true;

          },
          editPersonalInfo(){
            this.showDialog('编辑个人信息','personalInfo');
          },
          editIdCard(){
            this.showDialog('编辑身份证信息','idcard');
          },
          deleteGroup(){

          },
          addGroup(){
            this.showDialog('新增队伍','groupInfo');
          },
          editGroupInfo(){
            this.showDialog('编辑队伍信息','groupInfo');
          },
          showGroupInfo(){
            this.infoDialogVisible=true;
          }
      },
      computed:{
        getSignUpInfo() {
          return this.$store.state.signUpState;
        }
      },
      watch:{
        getSignUpInfo(val){
            this.signUpState=val;
        }
      }
  }
</script>
