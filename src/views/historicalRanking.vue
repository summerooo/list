<template>
  <div class="historicalRankingContainer">
    <div class="historicalRankingContent">
      <el-popover
        v-if="chartData.rows.length"
        placement="bottom-start"
        width="400"
        trigger="manual"
        v-model="visible">
        <div style="padding: 10px;">
          <p style="margin-bottom: 8px;">快捷筛选</p>
          <div style="margin-bottom: 16px;width: 100%;display: flex;justify-content: space-between;">
            <el-button v-for="(item, index) in btnGroup" :key="index" @click="changeOption(item)">{{item.label}}</el-button>
          </div>
          <p style="margin-bottom: 8px;">日期筛选</p>
          <el-date-picker
            style="width: 100% !important;"
            v-model="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <div style="margin-top: 26px;display:flex;justify-content:center;">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="confirm" style="margin-left: 26px;">确定</el-button>
          </div>
        </div>
        <el-button slot="reference"  @click="visible = true">{{activeScreeningOption.label}}</el-button>
      </el-popover>
      <div v-if="!chartData.rows.length">暂无数据</div>
      <ve-line :data="chartData" v-else :events="chartEvents"></ve-line>
    </div>
    <el-dialog
      center
      :close-on-click-modal="false"
      v-if="addAndEditDialog"
      width="500px"
      :visible.sync="addAndEditDialog">
      <sx-dynamic-inline-form
        ref="addAndEditForm"
        v-model="addAndEditData"
        wrap
        size="small"
        :structure="addAndEditStructure"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleHandle">确 定</el-button>
        <el-button @click="addAndEditDialog = false" style="margin-left: 30px;">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sxDynamicInlineForm from '../components/websiteList/dynamicInlineForm'
import { getHistory, postHistory, getHistoryArticle, postHistoryArticle, webUpdateexplain, articleUpdateexplain } from '../api/historicalRanking'
export default {
  components: {
    sxDynamicInlineForm
  },
  props: {
    query: {
      type: null,
      default () {
        return null
      }
    }
  },
  data() {
    this.chartSettings = {
      selectedMode: 'single',
      hoverAnimation: false
    }
    var self = this
    this.chartEvents = {
      click (e) {
        self.openExplain(e)
      }
    }
    return {
      btnGroup: [
        {label: '近7天', value: 7},
        {label: '近30天', value: 30},
        {label: '近90天', value: 90},
      ],
      date: '',
      chartData: {
        columns: ['日期', '排名'],
        rows: []
      },
      addAndEditDialog: false,
      addAndEditStructure: {
        data: [
          {
            type: 'input',
            model: 'currentExplain',
            label: '现有说明:',
            disabled: true,
            placeholder: '',
            rules: [],
          },
          {
            type: 'input',
            model: 'explain',
            label: '说明:',
            placeholder: '请输入说明',
            rules: [
              { required: true, message: '请输入说明', trigger: 'change' }
            ]
          }
        ]
      },
      addAndEditData: {},
      visible: false,
      screeningOption: null,
      activeScreeningOption: null,
      explainIndex: 0
    }
  },
  created() {
    console.log(this.query)
    this.activeScreeningOption = this.btnGroup[0]
    this.show()
  },
  methods: {
    async show (getOrPost = true) {
      let history = null
      if (getOrPost) {postHistoryArticle
        switch (this.query.origin) {
          case 'websiteList':
            history = await getHistory(Object.assign({}, this.query, { date: this.activeScreeningOption.value }))
            break;
          case 'articleList':
            history = await getHistoryArticle(Object.assign({}, this.query, { date: this.activeScreeningOption.value }))
            break;
        }
      } else {
        switch (this.query.origin) {
          case 'websiteList':
            history = await postHistory(Object.assign({}, this.query, this.activeScreeningOption, { date: '' }))
            break;
          case 'articleList':
            history = await postHistoryArticle(Object.assign({}, this.query, { date: this.activeScreeningOption.value }))
            break;
        }
      }
      console.log(history)
      this.chartData.rows = []
      for (let i in history.data.data) {
        let date = new Date(parseInt(history.data.data[i]['CreateTime']) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
        this.$set(this.chartData.rows, i, Object.assign({}, { 日期: date, 排名: history.data.data[i]['top'] }, history.data.data[i]))
      }
      console.log(this.chartData.rows)
    },
    changeOption (item) {
      this.screeningOption = item
      this.date = ''
    },
    confirm () {
      if (this.date) {
        this.activeScreeningOption = { label: this.date.toString(), star_time: this.date[0], end_time: this.date[1] }
        this.show(false)
      } else {
        this.activeScreeningOption = this.screeningOption
        this.show()
      }
      this.visible = false
      this.date = ''
    },
    openExplain (e) {
      this.explainIndex = e.dataIndex
      this.addAndEditData = Object.assign({}, { currentExplain: this.chartData.rows[e.dataIndex].explain1 })
      this.addAndEditDialog = true
    },
    async dialogVisibleHandle () {
      // webUpdateexplain
      this.$refs.addAndEditForm.refreshData()
      let explain
      switch (this.query.origin) {
        case 'websiteList':
          explain = await webUpdateexplain(Object.assign({}, this.chartData.rows[this.explainIndex], this.addAndEditData))
          break;
        case 'articleList':
          explain = await articleUpdateexplain(Object.assign({}, this.chartData.rows[this.explainIndex], this.addAndEditData))
          break;
      }
      if (!explain) return
      this.show()
      this.addAndEditDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.historicalRankingContainer {
  width: 100%;
  height: 100%;
  .historicalRankingContent{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: white;
  }
}
</style>

<style>
.el-popover, .btnGroup {
  
}
</style>
