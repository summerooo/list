<template>
  <div class="container">
    <el-form ref="isForm"  :model="newStructureModel" :class="{form: true, formInline: !wrap, formWrap: wrap}" :size="size">
      <el-form-item v-for="(item, index) in newStructure" :key="index" :label="item.label" :prop="item.model" :rules="item.rules">
        <el-input
          v-if="item.type === 'input'"
          v-model="newStructureModel[item.model]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
        />
        <el-input
          v-if="item.type === 'password'"
          show-password
          v-model="newStructureModel[item.model]"
          :placeholder="item.placeholder"
          clearable
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="newStructureModel[item.model]"
          :placeholder="item.placeholder"
          clearable
          filterable
          >
          <el-option v-for="(o, i) in item.options" :key="i + newStructure.length" :label="o.label" :value="o.value" />
        </el-select>
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="newStructureModel[item.model]"
          :placeholder="item.placeholder"
          >
          <el-radio v-for="(o, i) in item.options" :key="i + newStructure.length" :label="o.value">
            {{o.label}}
          </el-radio>
        </el-radio-group>
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="newStructureModel[item.model]"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-date-picker
          v-if="item.type === 'datetimerange'"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="newStructureModel[item.model]"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <sx-to
          v-if="item.type === 'to'"
          :structure=item.structure
          v-model="newStructureModel[item.model]"
        />
      </el-form-item>
    </el-form>
    <div class="btnGroup" v-if="structure.buttonGroup ">
      <el-button v-if="structure.buttonGroup.includes('search')" type="primary" @click="onSubmit" :size="size">搜索</el-button>
      <el-button v-if="structure.buttonGroup.includes('clear')" @click="onClear" :size="size">清空</el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import sxTo from './to'
export default {
  components: {
    sxTo
  },
  props: {
    wrap: {
      type: Boolean,
      default () {
        return false
      }
    },
    size: {
      type: String,
      default () {
        return 'mini'
      }
    },
    structure: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: Object,
      default () {
        return {}
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
        this.init()
      }
    }
  },
  data () {
    return {
      newStructure: [],
      newStructureModel: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.newStructure = []
      for (let i in this.structure.data) {
        this.$set(this.newStructure, i, this.structure.data[i])
      }
      this.newStructureModel = {}
      for (let i of this.newStructure) {
        switch (i.type) {
          // case 'select':
          //   this.$set(this.newStructureModel, i.model, this.value[i.model] || 0)
          //   break
          case 'to':
            this.$set(this.newStructureModel, i.model, this.value[i.model] || [])
            break
          default:
            this.$set(this.newStructureModel, i.model, this.value[i.model] || '')
            break
        }
      }
    },
    onSubmit() {
      this.$refs['isForm'].validate(valid => {
        if (valid) {
          this.refreshData()
          this.$emit('onSubmit', this.newStructureModel)
        } else {
          return false
        }
      })
    },
    onClear() {
      this.$refs['isForm'].resetFields()
    },
    refreshData () {
      this.$emit('input', this.newStructureModel)
      // this.$refs['isForm'].validate(valid => {
      //   if (valid) {
      //     this.$emit('input', this.newStructureModel)
      //   } else {
      //     return false
      //   }
      // })
    },
    getData () {
      return this.newStructureModel
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  .form {
    flex: 1;
    /deep/ .el-form-item__label {
      width: 75px;
    }
    /deep/ .el-radio-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
  .formInline {
    display: flex;
    flex-wrap: wrap;
    
    /deep/ .el-input {
      width: 90px;
    }
    /deep/ .el-form-item {
      display: flex;
      margin: 0px;
      margin-right: 10px;
      margin-bottom: 6px;
      .el-date-editor--datetimerange {
        width: 350px;
        .el-date-editor, .el-range-input {
          width: auto !important;
        }
      }
      .el-date-editor--daterange {
        width: 248px;
        .el-date-editor, .el-range-separator {
          width: auto;
        }
      }
    }
    /deep/ .el-input__inner {
      // padding-right: 25px
    }
    /deep/ .el-form-item:last-child {
      margin: 0px;
    }
  }
  .formWrap {
    /deep/ .el-form-item__label {
      min-width: 100px;
    }
    /deep/ .el-form-item {
      display: flex;
      width: 100%;
      margin: 0px;
      margin-bottom: 20px;
      &:last-child {
        margin: 0;
      }
      .el-form-item__content {
        flex: 1;
        display: flex;
      }
      .el-input {
        flex: 1;
      }
      .el-date-editor--datetimerange {
        flex: 1;
        .el-date-editor, .el-range-input {
          width: auto !important;
        }
      }
      .el-date-editor--daterange {
        flex: 1;
        .el-date-editor, .el-range-separator {
          width: auto;
        }
      }
    }
  }
  .btnGroup {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}
</style>
