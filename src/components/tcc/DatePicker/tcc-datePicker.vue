<template>
  <div style="text-align: left">
    <label style="margin-right: 10px">{{dateProps.label}}</label>
    <template v-if="dateProps.dateMode==='month'">
      <a-month-picker
        @change="(e)=>changeMonth('start', e)"
        placeholder="请选择"
        style="width: 120px"
        :format="dateProps.dateShowFormat"
        :value="startMonth"
        :mode="dateProps.dateMode"
        :allowClear="dateProps.clearable"
        :disabledDate="(e)=>_disabledStartMonth(e, dateProps.limitBegin, dateProps.limitType)"
      ></a-month-picker>
    </template>
    <template v-else>
      <a-date-picker
        @change="(e)=>changeDate('start', e)"
        placeholder="请选择"
        :showTime="dateProps.dateMode==='time'"
        :format="dateProps.dateShowFormat"
        :value="startDate"
        :allowClear="dateProps.clearable"
        :disabledDate="(e)=>_disabledStartDate(e, dateProps.limitBegin, dateProps.limitType)"
      ></a-date-picker>
    </template>
    <template v-if="!dateProps.singleDate">
      ~
      <a-month-picker
        @change="(e)=>changeMonth('end', e)"
        v-if="dateProps.dateMode==='month'"
        placeholder="请选择"
        style="width: 120px"
        :format="dateProps.dateShowFormat"
        :value="endMonth"
        :mode="dateProps.dateMode"
        :allowClear="dateProps.clearable"
        :disabledDate="(e)=>_disabledEndMonth(e, dateProps.limitEnd, dateProps.limitType)"
      ></a-month-picker>
      <a-date-picker
        @change="(e)=>changeDate('end', e)"
        v-if="dateProps.dateMode!=='month'"
        :showTime="dateProps.dateMode==='time'"
        placeholder="请选择"
        :format="dateProps.dateShowFormat"
        :value="endDate"
        :allowClear="dateProps.clearable"
        :disabledDate="(e)=>_disabledEndDate(e, dateProps.limitEnd, dateProps.limitType)"
      ></a-date-picker>
    </template>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "tcc-datePicker",
  props: {
    dateProps: {
      type: Object,
      default() {
        return {
          label: '帐期',
          singleDate: true, // 单/双帐期
          dateMode: 'month',
          dateFormat: 'YYYYMM',
          dateShowFormat: 'YYYY-MM',
          clearable: true,
          defaultDate: true,
          disableDate: false,
          limitBegin: 0,
          limitEnd: 0,
          limitType: 'month'
        }
      }
    }
  },
  data() {
    return {
      startMonth: null,
      endMonth: null,
      startDate: null,
      endDate: null
    }
  },
  mounted() {
    if (this.dateProps.defaultDate) {
      this._defalutSetDate()
    }
  },
  methods: {
    moment,
    changeMonth (type, value) {
      if (type === 'start') {
        this.startMonth = value
      } else {
        this.endMonth = value
      }
    },
    changeDate (type, value) {
      if (type === 'start') {
        this.startDate = value
      } else {
        this.endDate = value
      }
    },
    _disabledStartMonth (valueSingMonth, limit, type) {
      if (!this.dateProps.disableDate) {
        return false
      }
      if (!valueSingMonth) {
        return false
      }
      let str = type === 'year' ? 'years' : 'months'
      return (valueSingMonth > this.moment().endOf(str).subtract(limit, str))
    },
    _disabledEndMonth (endValue, limit, type) {
      // 双帐期结束时间展示
      if (!this.dateProps.disableDate) {
        return false
      }
      let startValue = this.startMonth ? this.startMonth : new Date()
      if (!endValue || !startValue) {
        return false
      }
      let str = type === 'year' ? 'years' : 'months'
      // 结束时间必须大于开始时间且可选时间不得大于当前时间
      return ((endValue > this.moment().endOf(str).subtract(limit, str)) || ((startValue.valueOf() > endValue.valueOf())))
    },
    _disabledStartDate (startValue, limit, type) {
      // 双帐期开始时间展示
      let endValue = this.endDate ? this.endDate : new Date()
      if (!this.dateProps.disableDate || !startValue || !endValue) {
        return false
      }
      let str = type === 'year' ? 'years' : 'months'
      // 开始时间必须小于结束时间且可选时间不得大于当前时间
      if (this.dateProps.dateMode !== 'time') {
        return ((startValue > this.moment().endOf(str).subtract(limit, str)) || (startValue.valueOf() > (endValue.valueOf() + 30 * 24 * 60 * 60 * 1000)))
      } else {
        // 时间格式精确到时间时限制选择当天0点之前的日期
        return ((startValue > (new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000) ||
          (startValue.valueOf() > endValue.valueOf())))
      }
    },
    _disabledEndDate (endValue, limit, type) {
      // 双帐期结束时间展示
      let startValue = this.startDate ? this.startDate : new Date()
      if (!this.dateProps.disableDate || !endValue || !startValue) {
        return false
      }
      let str = type === 'year' ? 'years' : 'months'
      // 结束时间必须大于开始时间且可选时间不得大于当前时间
      if (this.dateProps.dateMode !== 'time') {
        return ((endValue > this.moment().endOf(str).subtract(limit, str)) || (startValue.valueOf() > endValue.valueOf()))
      } else {
        // 时间格式精确到时间时限制选择当天0点之前的日期
        return ((endValue > (new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000) ||
          (startValue.valueOf() > endValue.valueOf())))
      }
    },
    // 设置默认时间
    _defalutSetDate () {
      if (this.dateProps.singleDate && this.dateProps.defaultDate) {
        let dateStr = this.formatterDate(null, this.dateProps.dateShowFormat)
        this.startMonth = moment(dateStr, this.dateProps.dateShowFormat)
      }
      if (!this.dateProps.singleDate && this.dateProps.defaultDate) {
        let startDate = this.formatterDate(null, this.dateProps.dateShowFormat)
        let endDate = this.formatterDate(null, this.dateProps.dateShowFormat)
        this.startDate = moment(startDate, this.dateProps.dateShowFormat)
        this.endDate = moment(endDate, this.dateProps.dateShowFormat)
      }
    },
    formatterDate (date, dateFormat, yearStr, monthStr) {
      let s = ''
      if (date) {
        s = new Date(date)
      } else {
        s = new Date()
      }
      let year
      if (yearStr) {
        year = s.getFullYear() - yearStr
      } else {
        year = s.getFullYear()
      }
      let month = (s.getMonth() + 1)
      if (monthStr) {
        month = month === 1 ? 12 : month - monthStr
        year = month === 12 ? year - 1 : year
      }
      let day = s.getDate()
      if (!this.isLeapYear(year) && month === 2 && day === 29) {
        // 处理闰年
        day = day - 1
      }
      let hours = s.getHours()
      let minutes = s.getMinutes()
      let seconds = s.getSeconds()
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      hours = hours > 9 ? hours : '0' + hours
      minutes = minutes > 9 ? minutes : '0' + minutes
      seconds = seconds > 9 ? seconds : '0' + seconds
      let dateFmt = ''
      if (dateFormat === 'YYYY-MM-DD') {
        dateFmt = year + '-' + month + '-' + day
      } else if (dateFormat === 'YYYYMMDD') {
        dateFmt = year + '' + month + '' + day
      } else if (dateFormat === 'YYYY-MM') {
        dateFmt = year + '-' + month
      } else if (dateFormat === 'YYYYMM') {
        dateFmt = year + '' + month
      } else if (dateFormat === 'YYYY/MM') {
        dateFmt = year + '/' + month
      } else if (dateFormat === 'YYYY-MM-DD HH:mm:ss') {
        dateFmt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      } else if (dateFormat === 'YYYYMMSSHHmmss') {
        dateFmt = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds
      } else if (dateFormat === 'YYYY-MM-DD HH:mm') {
        dateFmt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      } else if (dateFormat === 'YYYY-MM-DD HH') {
        dateFmt = year + '-' + month + '-' + day + ' ' + hours
      }

      return dateFmt
    },
    isLeapYear (year) {
      year = Number(year)
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // 闰年
        return true
      } else {
        // 平年
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
