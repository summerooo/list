<template>
  <el-table
    v-loading="loading"
    height=500
    :data="tableData"
    @selection-change="handleSelectionChange"
    @cell-click="cellClick">
    <el-table-column
      v-if="hasSelection"
      type="selection"
      width="55">
    </el-table-column>
    <!--  align="center" -->
    <el-table-column
      v-if="hasIndex"
      type="index"
      label="序号"
    >
    </el-table-column>
    <!--  + Math.random() -->
    <el-table-column
      v-for="(item, index) in tableStructure"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :align="item.align || 'center'"
      :sortable="item.sortable"
      :fixed="item.fixed"
      :width="item.width"
      filter-placement="bottom-end"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <div v-if="item.contain && !item.other" style="display: flex;justify-content:space-between">
          <div v-for="(x, key) in item.contain" :key="key">
            <el-button
              v-if="filterBtn(scope.row, x, scope.column, scope.row[item.prop], scope.$index)"
              :type="x.type || 'text'"
              :size="x.size || 'mini'"
              :style="x.style"
              @click="operateClick(scope.row, scope.$index, x)"
            >{{ x.label }}</el-button>
          </div>
        </div>
        <div v-if="!item.contain && !item.other">
          {{
            formatter(
              scope.row,
              scope.column,
              scope.row[item.prop],
              scope.$index
            )
          }}
        </div>
        <div v-if="!item.contain && item.other" style="font-size: 20px">
          <i v-if="Boolean(scope.row['vary'])" class="list-icon-arrow-up" style="color: #67C23A;"></i>
          <i v-else class="list-icon-arrow-down" style="color: #F56C6C;"></i>
          <!-- {{scope.row}} -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    hasSelection: {
      type: Boolean,
      default() {
        return false
      }
    },
    hasIndex: {
      type: Boolean,
      default() {
        return false
      }
    },
    tableStructure: {
      type: Array,
      default() {
        return []
      }
    },
    filterBtn: {
      type: Function,
      default () {
        return _ => true
      }
    },
    formatter: {
      type: Function,
      default () {
        return (row, column, cellValue, index) => {
          if (!row[column.property]) {
            return ''
          } else {
            return row[column.property]
          }
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    operateClick(row, index, x) {
      this.$emit('operateClick', row, index, x)
    },
    cellClick (row, column, cell, event) {
      this.$emit('cellClick', row, column, cell, event)
    }
  }
}
</script>
