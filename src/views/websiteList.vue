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
        ref="addAndEditForm"
        v-model="addAndEditData"
        wrap
        size="small"
        :structure="addAndEditStructure"
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
      // 数据基础搜索 结构
      basicControlStructure: {
        data: [
          {
            type: 'input',
            model: 'name',
            label: '网站名称:',
            placeholder: '请输入'
          },
          {
            // datetimerange
            type: 'daterange',
            model: 'releaseTime',
            label: '发布时间:',
            placeholder: '请输入发布时间'
          },
          {
            type: 'to',
            model: 'currentPage',
            label: '当前页数:',
            placeholder: '请输入发布时间',
            // 占位
            structure: [{}, {}]
          },
          {
            type: 'to',
            model: 'currentRanking',
            label: '当前排名:',
            placeholder: '请输入发布时间',
            // 占位
            structure: [{}, {}]
          },
          {
            type: 'select',
            model: 'varty',
            label: '升降情况:',
            placeholder: '请选择',
            options: [{ value: 1, label: '升' }, { value: -1, label: '降' }]
          }
          // { type: 'daterange', model: 'submissionTime', label: '提交时间'}
        ],
        buttonGroup: ['search', 'clear']
      },
      // 基础搜索 数据
      basicControlModel: {},
      // table 的结构
      tableStructure: [
        { prop: 'name', label: '网站名称' },
        { prop: 'url', label: '打开链接' },
        { prop: 'CreateTime', label: '发布时间', width: '160', sortable: true  },
        { prop: 'Npage', label: '当前页数', width: '100', sortable: true  },
        { prop: 'top', label: '当前排名', width: '100', sortable: true },
        { prop: 'vary', label: '升降情况', width: '100', other: true },
        { label: '操作', width: '170', contain: [{label: '查看历史排名'}, {label: '编辑', style: 'color: #E6A23C'}, {label: '删除', style: 'color: #F56C6C'}] }
      ],
      // table 的数据
      tableData: [],
      // table 的加载动画
      tableLoading: false,
      // 添加和编辑 的结构
      addAndEditStructure: {
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
              // { required: true, message: '页码不能为空', trigger: 'change' }
            ]
          }
          // { type: 'daterange', model: 'submissionTime', label: '提交时间'}
        ]
      },
      // 添加和编辑 的数据
      addAndEditData: {},
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
      let gtl = await getTableList(Object.assign({}, {page: this.currentPage}, this.basicControlModel))
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
        return row[column.property]
      }
    },
    onSubmit (model) {
      // 格式数据基础搜索  数据
      let params = {
        star_time: model['releaseTime'].length ? model['releaseTime'][0] : '',
        end_time: model['releaseTime'].length ? model['releaseTime'][1] : '',
        star_Npage: model['currentPage'].length ? model['currentPage'][0] : '',
        end_Npage: model['currentPage'].length ? model['currentPage'][1] : '',
        star_top: model['currentRanking'].length ? model['currentRanking'][0] : '',
        end_top: model['currentRanking'].length ? model['currentRanking'][1] : ''
      }
      this.basicControlModel = Object.assign({}, model, params)
      this.show()
    },
    handleSelectionChange (val) {
      // 表格选择后数据
      this.selectionData = val
    },
    operateClick (row, index, x) {
      // 表格中按钮操作
      switch (x.label) {
        case '查看历史排名':
          this.$router.push({name: 'historicalRanking', query: { id: row.id, origin: 'websiteList' }})
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
      // 添加 dialog
      this.addAndEditData = {}
      this.addAndDelDialog = true
      this.addAndDelFlag = true
    },
    editHandle(row, index, x) {
      // 编辑 dialog
      console.log(row, index, x)
      this.addAndEditData = Object.assign({}, row)
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
      let addAndEditData = Object.assign({}, this.addAndEditData, this.$refs.addAndEditForm.getData())
      // dialog 中接口调用
      callbackData = this.addAndDelFlag ? await addListData(addAndEditData) : await editListData(addAndEditData)
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
  height: 100%;
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

