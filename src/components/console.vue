<template>
  <div>
    <mu-appbar>
      <mu-flat-button class="big-icon-but" slot="right">

        <mu-badge content="12" circle color="red">
          <i class="iconfont icon-2x icon-tixing"></i>
        </mu-badge>
      </mu-flat-button>
      <mu-flat-button slot="left" class="normal-icon-but" >
        <i class="iconfont icon-2x icon-xiugai"></i>
      </mu-flat-button>
      <mu-flat-button slot="left" class="normal-icon-but" >
        <i class="iconfont icon-2x icon-shenfenzheng1"></i>
      </mu-flat-button>

    </mu-appbar>
  </div>
</template>
<script>
  export default{
      name:'Console',

  }
</script>
