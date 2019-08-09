<template>
  <div class="historicalRankingContainer">
    <div class="historicalRankingContent">
      <el-popover
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
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
import { getHistory, postHistory } from '../api/historicalRanking'
export default {
  props: {
    query: {
      type: null,
      default () {
        return null
      }
    }
  },
  data() {
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
      visible: false,
      screeningOption: null,
      activeScreeningOption: null
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
      if (getOrPost) {
        history = await getHistory(Object.assign({}, this.query, { date: this.activeScreeningOption.value }, {id: 33}))
      } else {
        history = await postHistory(Object.assign({}, this.query, this.activeScreeningOption, { date: '' }))
      }
      console.log(history)
      this.chartData.rows = []
      for (let i in history.data.data) {
        let date = new Date(parseInt(history.data.data[i]['CreateTime']) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
        this.$set(this.chartData.rows, i, { 日期: date, 排名: history.data.data[i]['top'] })
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
