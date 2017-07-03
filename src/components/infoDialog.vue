<template>
  <mu-bottom-sheet :open="isShow" @close="close">
    <mu-list>
      <mu-sub-header >队长</mu-sub-header>
      <mu-list-item inset :title="groupInfoShow.leader.name">
        <span slot="describe">
          <mu-row>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-phone-span">
                {{groupInfoShow.leader.phone}}
             </span>
            </mu-col>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-qq-span">
                {{groupInfoShow.leader.qq}}
              </span>
            </mu-col>
          </mu-row>
        </span>
      </mu-list-item>



      <mu-divider/>
      <mu-sub-header >队员</mu-sub-header>
      <mu-list-item inset v-for="item,index in groupInfoShow.teammate" :key="index" :title="item.name">
        <span slot="describe">
          <mu-row>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-phone-span">
                {{item.phone}}
             </span>
            </mu-col>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-qq-span">
                {{item.qq}}
              </span>
            </mu-col>
          </mu-row>
        </span>
      </mu-list-item>

      <template v-if="isLeader">
        <mu-divider/>
        <mu-sub-header>提交申请的队员</mu-sub-header>
        <mu-list-item inset v-for="item,index in preInPeople" :key="index" :title="item.name">
        <span slot="describe">
          <mu-row>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-phone-span">
                {{item.phone}}
             </span>
            </mu-col>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-qq-span">
                {{item.qq}}
              </span>
            </mu-col>
          </mu-row>
        </span>
        </mu-list-item>
      </template>

    </mu-list>
  </mu-bottom-sheet>
</template>
<script>
  import {DispatchActions} from '../store';
  export default{
    components: {

    },
    name:'InfoDialog',
      props:['showDialog','loading'],
      data(){
          return{
            isShow:false,
            preInPeople:[
              {uid:'',name:'',phone:'',qq:''}
            ],
            groupInfoShow:{
                leader:{
                  name:'',
                  phone:'',
                  qq:''
                },
                teammate:[
                  {
                    name:'',
                    phone:'',
                    qq:''
                  }
                ]

            }
          }

      },
      methods:{
          close(){
              this.isShow=false;
              this.$emit('update:showDialog',false);
          },
          getGroupInfo(mustShow){
              let gid=this.$store.state.userGroup;
              this.$store.dispatch(DispatchActions.GET_GROUPINFO,{params:{gid:gid}}).then(response=>{
//                  console.log(response)
                 this.groupInfoShow=response.body;
                 if(response.body.preIn!==undefined&&this.isLeader){
                     this.preInPeople=response.body.preIn;
                 }
                 this.$emit('update:loading',false);
                 if(mustShow){
                   this.isShow=true;
                 }
              });
          }
        },
      beforeMount:function () {
//        this.getGroupInfo();
      },
      computed:{
        isLeader:function () {
          return this.$store.state.signUpState==='leader';
        }
      },
      watch:{
          showDialog(val){
              if(val){
                this.getGroupInfo(true);
              }

          },
      }
  }
</script>
