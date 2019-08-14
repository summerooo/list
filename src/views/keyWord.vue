<template>
  <div class="websiteListContainer">
    <div class="websiteListContent">
      <div class="otherOperate">
        <el-button type="primary" size="small" @click="addHandle">添加</el-button>
        <el-button size="small" @click="delHandle(false)">批量删除</el-button>
      </div>
      <sx-min-table
        :loading="tableLoading"
        hasSelection
        :table-structure="tableStructure"
        :table-data="tableData"
        :formatter="formatter"
        @cellClick="cellClick"
        @handleSelectionChange="handleSelectionChange"
        @operateClick="operateClick"
      />
    </div>
    <div style="margin-top:40px;text-align:center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      center
      :close-on-click-modal="false"
      v-if="addAndDelDialog"
      width="500px"
      :visible.sync="addAndDelDialog">
      <sx-dynamic-inline-form
        ref="addAndDelForm"
        v-model="addAndDelData"
        wrap
        size="small"
        :structure="addAndDelStructure"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleHandle">确 定</el-button>
        <el-button @click="addAndDelDialog = false" style="margin-left: 30px;">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sxDynamicInlineForm from '../components/websiteList/dynamicInlineForm'
import sxMinTable from '../components/websiteList/minTable'
import { getTableList, addListData, editListData, deleteListData } from '../api/keyWord'

export default {
  components: {
    sxDynamicInlineForm,
    sxMinTable
  },
  data() {
    return {
      // table 的结构
      tableStructure: [
        { prop: 'name', label: '名称' },
        { prop: 'g', label: '相关搜索数据', popover: true },
        { prop: 'q', label: '搜索框下拉搜索数据', popover: true },
        { label: '操作', width: '100', contain: [{label: '编辑', style: 'color: #E6A23C'}, {label: '删除', style: 'color: #F56C6C'}] }
      ],
      // table 的数据
      tableData: [],
      // table 的加载动画
      tableLoading: false,
      // 添加和编辑 的结构
      addAndDelStructure: {
        data: [
          {
            type: 'input',
            model: 'name',
            label: '名称:',
            placeholder: '请输入名称',
            rules: [
              { required: true, message: '请输入网站名称', trigger: 'change' }
            ],
          }
        ]
      },
      // 添加和编辑 的数据
      addAndDelData: {},
      // 用来区分添加和编辑
      addAndDelFlag: true,
      // 添加和编辑 的弹窗
      addAndDelDialog: false,
      // table 行 选中后的数据
      selectionData: [],
      // 当前页数
      currentPage: 1,
      // 一页默认几条
      pageSize: 10,
      // 总条数
      total: 0
    }
  },
  created() {
    this.show()
  },
  methods: {
    async show () {
      this.tableLoading = true
      let gtl = await getTableList(Object.assign({}, {page: this.currentPage}))
      this.tableLoading = false
      if (!gtl) return
      this.tableData = gtl.data.data
      this.total = gtl.data.count
    },
    formatter (row, column) {
      // 格式表格的时间戳
      if (!row[column.property]) {
        return ''
      } else {
        if (column.property === 'CreateTime')
          return new Date(parseInt(row[column.property]) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
        if (column.property === 'Classify') {
          if (parseInt(row[column.property]) === 1) return '天眼查'
          if (parseInt(row[column.property]) === 2) return '企查查'
        }
        return row[column.property]
      }
    },
    handleSelectionChange (val) {
      // 表格选择后数据
      this.selectionData = val
    },
    operateClick (row, index, x) {
      // 表格中按钮操作
      switch (x.label) {
        case '编辑':
          this.editHandle(row, index, x)
          break
        case '删除':
          this.delHandle(row)
          break
      }
      console.log(row, index, x)
    },
    cellClick (row, column) {
      if (column.property === 'p_url') window.open(row.p_url)
    },
    addHandle () {
      // 添加 dialog
      this.addAndDelData = {}
      this.addAndDelDialog = true
      this.addAndDelFlag = true
    },
    editHandle(row, index, x) {
      // 编辑 dialog
      console.log(row, index, x)
      this.addAndDelData = Object.assign({}, row)
      this.addAndDelDialog = true
      this.addAndDelFlag = false
    },
    delHandle (value) {
      console.log(value)
      if (value) this.selectionData.push(value)
      console.log(this.selectionData)
      if (!this.selectionData.length) return this.$message({ type: 'info', message: '未选择' })
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let dld = await deleteListData(this.selectionData)
        if (dld) this.show()
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.show()
    },
    async dialogVisibleHandle () {
      let callbackData = null
      let addAndDelData = Object.assign({}, this.addAndDelData, this.$refs.addAndDelForm.getData())
      // dialog 中接口调用
      callbackData = this.addAndDelFlag ? await addListData(addAndDelData) : await editListData(addAndDelData)
      console.log(callbackData)
      if (callbackData) {
        this.show()
        this.addAndDelFlag = {}
        this.addAndDelDialog = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.websiteListContainer {
  height: 100%;
  width: 100%;
  .websiteListContent {
    height: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    .otherOperate {
      margin: 16px 0;
    }
  }
  /deep/ .el-pagination.is-background .el-pager li {
    background: white !important;
  }
}
</style>

