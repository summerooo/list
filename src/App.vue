<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {},
  data () {
    return {
      device: null,
      kernel: null
    }
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app,
html,
body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
li {
  list-style: none;
}
a {
  text-decoration:none;
}
</style>
