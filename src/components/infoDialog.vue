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
            groupInfoShow:{
                leader:{
                  name:'',
                  qq:''
                },
                teammate:[
                  {
                      name:'',
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
              this.$store.dispatch(DispatchActions.GET_GROUPINFO).then(response=>{
//                  console.log(response)
                 this.groupInfoShow=response.body;
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
