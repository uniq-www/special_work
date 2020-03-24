<template>
  <div>
    <tcc-date-picker style="margin-bottom: 20px"></tcc-date-picker>
    <tcc-date-picker :dateProps="dateInit1" style="margin-bottom: 20px"></tcc-date-picker>
    <tcc-date-picker :dateProps="dateInit2" style="margin-bottom: 20px"></tcc-date-picker>
    <tcc-date-picker :dateProps="dateInit3" style="margin-bottom: 20px"></tcc-date-picker>
    <tcc-date-picker :dateProps="dateInit4" style="margin-bottom: 20px"></tcc-date-picker>
  </div>
</template>

<script>
import TccDatePicker from '../../components/tcc/DatePicker/tcc-datePicker'

export default {
  name: "dateComponents",
  components: {TccDatePicker},
  data() {
    return {
      dateInit1: {
        label: '帐期',
        singleDate: true, // 单/双帐期
        dateMode: 'date',
        dateFormat: 'YYYYMMDD',
        dateShowFormat: 'YYYY-MM-DD',
        clearable: true,
        defaultDate: true
      },
      dateInit2: {
        label: '日期',
        singleDate: false, // 单/双帐期
        dateMode: 'month',
        dateFormat: 'YYYYMM',
        dateShowFormat: 'YYYY-MM',
        clearable: true,
        defaultDate: true,
        disableDate: true,
        limitBegin: 0,
        limitEnd: 0,
        limitType: 'month'
      },
      dateInit3: {
        label: '选择日期',
        singleDate: false, // 单/双帐期
        dateMode: 'date',
        dateFormat: 'YYYYMMDD',
        dateShowFormat: 'YYYY-MM-DD',
        clearable: true,
        defaultDate: true,
        disableDate: false,
        limitBegin: 2,
        limitEnd: 1,
        limitType: 'month'
      },
      dateInit4: {
        label: '选择时间',
        singleDate: false, // 单/双帐期
        dateMode: 'time',
        dateFormat: 'YYYYMMDDHHMMSS',
        dateShowFormat: 'YYYY-MM-DD HH:mm:ss',
        clearable: true,
        defaultDate: true,
        disableDate: false,
        limitBegin: 2,
        limitEnd: 1
      }
    }
  }
}
</script>

<style scoped>

</style>
