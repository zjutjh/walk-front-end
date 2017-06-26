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
        :class="{'glass-blur':isBlur}"
      >
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
              <mu-badge :content="item.now_num+ '/' +item.max_num"/>
              <mu-badge :content="''+item.pre_num" color="red"/>
            </mu-td>
            <!--<mu-td>{{item.max_num}}</mu-td>-->
            <!--<mu-td>{{item.now_num}}</mu-td>-->
            <!--<mu-td>{{item.pre_num}}</mu-td>-->
            <mu-td v-if="showOperation">
              <mu-raised-button label="加入" @click="joinGroup" :group-id="item.id" primary/>
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
        this.tableData=this.groupData;

      },
      methods:{
        handlePageChange(newIndex) {
            this.getGroupByPage(+newIndex,false)
        },
        joinGroup(){
//            console.log(this)
        },
        getGroupByPage:function(pageIndex,isRefresh){
            let that=this;
            isRefresh?(this.refreshing=true):(this.loading=true);

            setTimeout(function () {
//              console.log(pageIndex);
              isRefresh?(that.refreshing=false):(that.loading=false);
              that.current=pageIndex<=that.total?pageIndex:that.total;
            },2000)
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
              this.tableData=val;
          },
          canOperate(val){
            this.canOperation=!!val
          },
          getIsLogged(val){
              console.log('logged');
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
