<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  created() {
    this.getInfo()
  },
  data () {
    return {
      device: null,
      kernel: null
    }
  },
  methods: {
    ...mapMutations([
      'getInfo'
    ])
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
