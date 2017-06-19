<template>
    <mu-list class="side-nav">
        <mu-list-item :to="item.path" v-for="item,index in routesList" :key="index" :title="item.name"  v-if="item.name!==undefined" :toggleNested="item.subMenu!==undefined">
          <i slot="left" class="iconfont icon-shuaxin"></i>
          <mu-list-item :to="subItem.path"
                        v-for="subItem,subIndex in item.subMenu"
                        :key="subIndex"
                        :title="subItem.name"
                        slot="nested"
                        :toggleNested="subItem.subMenu!==undefined">
            <i slot="left" class="iconfont icon-shuaxin"></i>
            <mu-list-item :to="trdItem.path" v-for="trdItem,trdIndex in subItem.subMenu" :key="trdIndex" :title="trdItem.name" v-if="trdItem.name!==undefined" slot="nested">
              <i slot="left" class="iconfont icon-shuaxin"></i>
            </mu-list-item>
          </mu-list-item>
        </mu-list-item>
    </mu-list>

</template>
<style>
  .side-nav{
    width: 210px;
  }
</style>
<script>
  import routes from '../router/routeDefineTest.js';
  export default{
      name:'SideNav',
      data(){
          return{
              routesList:routes
          }
      }
  }
</script>

