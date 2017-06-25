<template>
  <mu-bottom-sheet :open="isShow" @close="close">
    <mu-list>
      <mu-sub-header >队长</mu-sub-header>
      <mu-list-item inset :title="groupInfo.leader.name">
        <span slot="describe">
          <mu-row>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-phone-span">
                {{groupInfo.leader.phone}}
             </span>
            </mu-col>
            <mu-col width="50" tablet="50" desktop="50">
              <span class="info-qq-span">
                {{groupInfo.leader.qq}}
              </span>
            </mu-col>
          </mu-row>
        </span>
      </mu-list-item>
      <mu-divider/>
      <mu-sub-header >队员</mu-sub-header>
      <mu-list-item inset v-for="item,index in groupInfo.teammate" :key="index" :title="item.name">
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
    </mu-list>
  </mu-bottom-sheet>
</template>
<script>

  export default{
    components: {

    },
    name:'InfoDialog',
      props:['showDialog'],
      data(){
          return{
            isShow:false,
            groupInfo:{
                leader:{
                    name:'112',
                    qq:'113',
                    phone:'114'
                },
                teammate:[
                  {
                    name:'115',
                    qq:'116',
                    phone:'117'
                  },{
                    name:'118',
                    qq:'119',
                    phone:'120'
                  },{
                    name:'121',
                    qq:'122',
                    phone:'123'
                  }
                ]
            }
          }

      },
      methods:{
          close(){
              this.isShow=false;
              this.$emit('update:showDialog',false);
          }
      },
      watch:{
          showDialog(val){
              this.isShow=!!val;
          }
      }

  }
</script>
