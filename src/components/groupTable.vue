<template>
  <div class="group-table-container">
    <div class="group-table-mask" v-if="!smallScreen && (loading || refreshing)">
      <mu-circular-progress class="vh-center" :size="90" />
      <!--<div class="glass-blur">&nbsp;</div>-->
    </div>
    <mu-refresh-control v-if="smallScreen" :refreshing="refreshing" :trigger="scroller" @refresh="refresh"/>
    <div>
      <mu-table
        :showCheckbox="false"
        id="groupTableRef"
        class="blur-table"
        :class="{'glass-blur':isBlur}">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th tooltip="组号">组号</mu-th>
            <mu-th tooltip="队伍简介">队伍简介</mu-th>
            <mu-th tooltip="队长校区">队长校区</mu-th>
            <mu-th tooltip="报名情况">报名情况</mu-th>
            <mu-th v-if="showOperation" tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="item.id" >
            <mu-td>{{item.id}}</mu-td>
            <mu-td>{{item.description}}</mu-td>
            <mu-td>{{item.area}}</mu-td>
            <mu-td>
              <mu-badge :color="item.payloadColor" :content="item.now_num+ '/' +item.max_num"/>
              <mu-badge :content="(item.pre_num>=10?'':'0')+item.pre_num" color="orange"/>
              <mu-badge>
                <i class="iconfont" style="font-size: 12px" :class="{'icon-lock':item.locked,'icon-unlock':!item.locked,'red-text':item.locked}"></i>

              </mu-badge>

            </mu-td>
            <!--<mu-td>{{item.max_num}}</mu-td>-->
            <!--<mu-td>{{item.now_num}}</mu-td>-->
            <!--<mu-td>{{item.pre_num}}</mu-td>-->
            <mu-td v-if="showOperation">
              <mu-raised-button label="加入" @click="joinGroup" :group-id="item.id" primary :disabled="item.isDisable"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <div class="m-pagination sm-hide">
        <mu-pagination  v-if="!smallScreen" :total="total" :pageSize="pageSize" :current="current" @pageChange="handlePageChange">
        </mu-pagination>
      </div>
    </div>

      <mu-infinite-scroll :loadingText="loadingText" v-if="smallScreen" :scroller="scroller" :loading="loading" @load="loadMore"/>
    <div class="sm-hide fix-but-container">
      <mu-float-button v-if="!(!smallScreen && (loading || refreshing))" @click="refresh">
        <i class="iconfont icon-2x icon-shuaxin"></i>
      </mu-float-button>
      <div v-else>
        <mu-paper class="primary m-fix-paper" circle :zDepth="1">
          <mu-circular-progress :size="40" class="vh-center" color="orange"/>
        </mu-paper>
      </div>
    </div>


  </div>
</template>
<script>
  import {DispatchActions} from '../store/';
  import colorO from './colorGradient.js';
  export default{
      name:'GroupTable',
      props:['groupData','canOperate','currentPage','totalPage'],
      data(){
          return {
              tableData:[],
              showOperation:true,
              canOperation:true,
              signUpState:false,
              logged:false,
              total: 20,
              pageSize:1,
              current: 1,
              loading:false,
              refreshing:false,
              scroller:null,
              loadingText:'加载中...',
              smallScreen:false,

          }
      },
      mounted:function () {
        this.scroller=window;

        this.smallScreen = this.$mq.below(600)

        if(!this.$store.state.logged){
          this.showOperation=false;
        }
        this.getGroupByPage(1)

      },
      methods:{
        handlePageChange(newIndex) {
            this.getGroupByPage(+newIndex,false)
        },
        joinGroup(){
          if(!this.$store.state.idcardFilled){
            alert('请先填写身份证信息');
            return;
          }
//            console.log(this)
        },
        getGroupByPage:function(pageIndex,isRefresh){
//            let that=this;
            isRefresh?(this.refreshing=true):(this.loading=true);

          let params={page:pageIndex};
          this.$store.dispatch(DispatchActions.GET_GROUPLIST,{params:params}).then(response=>{
//              console.log(response)
              isRefresh?(this.refreshing=false):(this.loading=false);
              this.current=pageIndex<=this.total?pageIndex:this.total;
              if(this.smallScreen){
                  let addData=this.filterGroupData(response.body);
                  for(let i in addData){
                    this.tableData.push(addData[i]);
                  }
              }else{
                this.tableData=this.filterGroupData(response.body);
              }
            }
          )
//              console.log(pageIndex);


        },
        filterGroupData(val){
          let cRed="#F44336";
          let cGreen="#4CAF50";
          for (let i in val){
            let group=val[i];
            val[i].payloadColor=colorO.getColorByPercent(cGreen,cRed,parseInt(((group.now_num-1)/(group.max_num-1))*100))

            if(group.now_num>=group.max_num||group.locked){
              val[i].isDisable=true;
            }else{
              val[i].isDisable=false;
            }
          }
          return val;
        },
        refresh(){
            let page=this.smallScreen?1:this.current;
          this.getGroupByPage(page,true);
        },

        loadMore(){
          if(this.current>=this.total){
              return;
          }else{

//            let that=this;
            this.getGroupByPage(this.current+1,false)
          }
        },
        screenResize() {
          if(this.$mq.below(600)){
              this.smallScreen=true;
          }else{
              this.smallScreen=false;
          }
        }
      },
      computed:{
        getIsLogged(){
            return this.$store.state.logged;
        },
        getIsGrouped(){
            return this.$store.state.signUpState;
        },
        isBlur:function () {
          return ((this.loading || this.refreshing)&&!this.smallScreen);
        }

      },
      watch:{
        '$mq.resize': 'screenResize',
          groupData(val){
//            console.log(val)
            console.log(val);
            this.tableData=val;

          },
          canOperate(val){
            this.canOperation=!!val
          },
          getIsLogged(val){
//              console.log('logged');
              this.logged=!!val;
            this.showOperation=!!val && this.canOperation && this.signUpState;
          },
          getIsGrouped(val){
            if(val===''||val==='customer'){
                this.signUpState=true;
            }else{
                this.signUpState=false;
            }
            this.showOperation=this.logged && this.canOperation && this.signUpState;
          },
        currentPage(val){
              this.current=+val;
        },
        totalPage(val){
          this.total=+val;
        },
          deep:true
      }

  }
</script>
