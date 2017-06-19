<template>
  <div class="group-table-container">
    <div class="group-table-mask" v-if="$mq.resize && $mq.above('600px') && loading">
      <mu-circular-progress class="vh-center" :size="90" />
      <div class="glass-blur">&nbsp;</div>
    </div>
    <mu-table
      :showCheckbox="false"
      id="groupTableRef">
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
      <mu-pagination  v-if="$mq.resize && $mq.above('600px')" :total="total" :pageSize="pageSize" :current="current" @pageChange="handlePageChange">
      </mu-pagination>
    </div>
      <mu-infinite-scroll :loadingText="loadingText" v-if="$mq.resize && $mq.below('600px')" :scroller="scroller" :loading="loading" @load="loadMore"/>



  </div>
</template>
<script>
  export default{
      name:'GroupTable',
      prop:['groupData','canOperate'],
      data(){
          return {
              tableData:[
                {id:1,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:2,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:3,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:4,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:5,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:6,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:7,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:8,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:9,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:10,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
                {id:11,description:'667',area:'zhaohui',max_num:4,now_num:1,pre_num:20},
              ],
              showOperation:true,
              canOperation:true,
              total: 20,
              pageSize:1,
              current: 1,
              loading:false,
              scroller:null,
              loadingText:'加载中...'
          }
      },
      mounted:function () {
        this.scroller=window;
        if(!this.$store.state.logged){
          this.showOperation=false;
        }
      },
      methods:{
        handlePageChange(newIndex) {
            this.getGroupByPage(+newIndex)
        },
        joinGroup(){
//            console.log(this)
        },
        getGroupByPage(pageIndex){
            let that=this;
            this.loading = true;
            setTimeout(function () {
              console.log(pageIndex);
              that.loading=false;
              this.current=pageIndex<=this.total?pageIndex:this.total;
            },2000)
        },
        loadMore(){
          if(this.current>=this.total){
              return;
          }else{

//            let that=this;
            this.getGroupByPage(this.current+1)
          }
        },
        screenResize() {

        }
      },
      computed:{
        getIsLogged(){
            return this.$store.state.logged;
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
            this.showOperation=!!val && this.canOperation;
          },
          deep:true
      }

  }
</script>
