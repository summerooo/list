<template>
  <div class="about">
    {{c}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      c: [{a:2},{b:3}]
    }
  },
  created() {
    this.aa()
  },
  methods: {
   async aa () {
     this.c = [{c: 3}]
   }
  }
}
</script>

<style lang="scss" scoped>
.about {
  color: $red;
}
</style>

