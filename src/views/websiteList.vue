<template>
  <div class="websiteListContainer">
    <div class="websiteListContent">
      <sx-dynamic-inline-form
        size="small"
        :structure="basicControlStructure"
        @onSubmit="onSubmit"
      />
      <div class="otherOperate">
        <el-button type="primary" size="small" @click="addHandle">添加</el-button>
        <el-button size="small" @click="delHandle(false)">批量删除</el-button>
      </div>
      <sx-min-table
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      center
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
import { getTableList, addListData, editListData, deleteListData } from '../api/websiteList'
const validateUrl = (rule, value, callback) => {
  const isUrl = url => {
    const a = document.createElement('a')
    a.href = url
    return [
      /^(http|https):$/.test(a.protocol),
      a.host,
      a.pathname !== url,
      a.pathname !== `/${url}`,
    ].find(x => !x) === undefined
  }
  if (isUrl(value)) callback()
  else callback(new Error('请输入正确网址, 网址格式如 (http|https)://...'))
}
export default {
  components: {
    sxDynamicInlineForm,
    sxMinTable
  },
  data() {
    return {
      // 结构
      basicControlStructure: {
        data: [
          {
            type: 'input',
            model: 'brandName',
            label: '网站名称:',
            placeholder: '请输入名称'
          },
          {
            type: 'datetimerange',
            model: 'releaseTime',
            label: '发布时间:',
            placeholder: '请输入发布时间',
            // 占位
            structure: [{}, {}]
          },
          {
            type: 'to',
            model: 'releaseTime1',
            label: '当前页数:',
            placeholder: '请输入发布时间',
            // 占位
            structure: [{}, {}]
          },
          {
            type: 'to',
            model: 'releaseTime2',
            label: '当前排名:',
            placeholder: '请输入发布时间',
            // 占位
            structure: [{}, {}]
          },
          {
            type: 'select',
            model: 'companyName',
            label: '所属公司:',
            placeholder: '请选择',
            options: [{ value: '1111', label: '1111' }, { value: '222', label: '222' }]
          }
          // { type: 'daterange', model: 'submissionTime', label: '提交时间'}
        ],
        buttonGroup: ['search', 'clear']
      },
      // table 的结构
      tableStructure: [
        { prop: 'name', label: '网站名称', sortable: true },
        { prop: 'url', label: '打开链接' },
        { prop: 'CreateTime', label: '发布时间', sortable: true  },
        { prop: 'page', label: '当前页数', sortable: true  },
        { prop: 'top', label: '当前排名', sortable: true },
        { prop: 'vary', label: '升降情况', width: '80', other: true },
        { label: '操作', width: '170', contain: [{label: '查看历史排名'}, {label: '编辑', style: 'color: #E6A23C'}, {label: '删除', style: 'color: #F56C6C'}] }
      ],
      // table 的数据
      tableData: [],
      // 添加和编辑 的结构
      addAndDelStructure: {
        data: [
          {
            type: 'input',
            model: 'name',
            label: '网站名称:',
            placeholder: '请输入名称',
            rules: [
              { required: true, message: '请输入网站名称', trigger: 'change' }
            ],
          },
          {
            type: 'input',
            model: 'url',
            label: '网址:',
            placeholder: '请输入网址',
            rules: [
              { required: true, message: '网址不能为空', trigger: 'change' },
              { validator: validateUrl, trigger: 'blur' }
            ]
          },
          {
            type: 'input',
            model: 'page',
            label: '页码:',
            placeholder: '请输入页码数',
            rules: [
              { required: true, message: '页码不能为空', trigger: 'change' }
            ]
          }
          // { type: 'daterange', model: 'submissionTime', label: '提交时间'}
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
      let gtl = await getTableList({page: this.currentPage})
      console.log(gtl)
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
        return row[column.property]
      }
    },
    onSubmit (model) {
      console.log(model)
    },
    handleSelectionChange (val) {
      this.selectionData = val
    },
    operateClick (row, index, x) {
      switch (x.label) {
        case '查看历史排名':
          this.$router.push({name: 'historicalRanking', query: { id: row.id }})
          break
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
      if (column.property === 'url') window.open(row.url)
    },
    addHandle () {
      this.addAndDelData = {}
      console.log(this.selectionData)
      this.addAndDelDialog = true
      this.addAndDelFlag = true
    },
    editHandle(row, index, x) {
      console.log(row, index, x)
      this.addAndDelData = Object.assign({}, row)
      // for (let i in row) {
      //   this.$set(this.addAndDelData, i, Object.assign({}, row)[i])
      // }
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.show()
      console.log(`当前页: ${val}`);
    },
    async dialogVisibleHandle () {
      let callbackData = null
      let addAndDelData = Object.assign({}, this.addAndDelData, this.$refs.addAndDelForm.getData())
      if (this.addAndDelFlag) {
        callbackData = await addListData(addAndDelData)
      } else {
        callbackData = await editListData(addAndDelData)
      }
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
  width: 100%;
  .websiteListContent {
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

