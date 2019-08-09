<template>
  <div class="toContainer">
    <div class="toItem" v-for="(item, index) in structure" :key="index">
      <el-input v-model="structureModel[index]" :placeholder="item.placeholder || '请输入'" @change="inputHandle"></el-input>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    structure: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    structure: {
      deep: true,
      handler () {
        this.init()
      }
    },
    value: {
      deep: true,
      handler () {
        this.structureModel = [...this.value]
      }
    }
  },
  data () {
    return {
      structureModel: [...this.value]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      for (let i in this.structure) {
        this.$set(this.structureModel, i, '')
      }
    },
    inputHandle () {
      this.$emit('input', this.structureModel)
    }
  }
}
</script>
<style lang="scss" scoped>
.toContainer {
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  .toItem {
    display: flex;
    align-items: center;
    .line {
      margin: 6px;
      width: 16px;
      height: 2px;
      background: black;
    }
    &:last-child .line {
      display: none;
    }
  }

}
</style>
