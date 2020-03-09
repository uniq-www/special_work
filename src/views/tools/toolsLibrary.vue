<template>
  <div style="text-align: left">
    <h2>封装工具类</h2>
    <div style="width: 80%">
      <h3>本界面提供了常用的前端工具类封装函数：其中包括了判空工具，时间封装工具，</h3>
      <div id="components-null" style="padding-top: 10px">
        <h3>判空工具</h3>
        <p>1，判断是否为空值</p>
        <pre v-highlightA>
          <code>
isNull (str) {
  if (str != null && typeof str !== 'undefined' && str !== '' && str !== 'null') {
    return false
  } else {
    return true
  }
},
          </code>
        </pre>
        <p>2，判断是否为空对象</p>
        <pre v-highlightA>
          <code>
objectIsBlank (obj) {
if(JSON.stringify(obj)=="{}"){
  return true
}
if(Object.keys(obj).length==0){
  return true
}
return false
}
          </code>
        </pre>
      </div>
      <div id="components-time" style="padding-top: 10px">
        <h3>时间类工具</h3>
        <p>1，将传入时间转换为所需时间格式，可控制年份</p>
        <pre v-highlightA>
          <code>
/**
 * @param date antd时间选择器日期
 * @param dateFormat 转换时间的格式
 * @param yearStr 相差年份
 * @returns {string}
 */
function formatterDate (date, dateFormat, yearStr) {
  let s = ''
  if (date) {
    s = new Date(date)
  } else {
    // 若无传入日期，默认当前日期
    s = new Date()
  }
  let year
  if (yearStr) {
    year = s.getFullYear() - yearStr
  } else {
    year = s.getFullYear()
  }
  let month = (s.getMonth() + 1);
  let day = s.getDate();
  let hours = s.getHours();
  let minutes = s.getMinutes();
  let seconds = s.getSeconds();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  hours = hours > 9 ? hours : '0' + hours;
  minutes = minutes > 9 ? minutes : '0' + minutes;
  seconds = seconds > 9 ? seconds : '0' + seconds;
  let dateFmt = '';
  if (dateFormat === formatter._YMD1) {
    dateFmt = year + '-' + month + '-' + day
  } else if (dateFormat === formatter._YMD2) {
    dateFmt = year + '' + month + '' + day
  } else if (dateFormat === formatter._YM1) {
    dateFmt = year + '-' + month
  } else if (dateFormat === formatter._YM2) {
    dateFmt = year + '' + month
  } else if (dateFormat === formatter._YM3) {
    dateFmt = year + '/' + month
  } else if (dateFormat === formatter._YMDTIMES) {
    dateFmt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  } else if (dateFormat === formatter._YMDTIMES2) {
    dateFmt = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds
  } else if (dateFormat === formatter._YMDTIMEM) {
    dateFmt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  } else if (dateFormat === formatter._YMDTIMEH) {
    dateFmt = year + '-' + month + '-' + day + ' ' + hours
  }
  return dateFmt
}
          </code>
        </pre>
        <p>2，获取时间戳</p>
        <pre v-highlightA>
          <code>
/**
 * @param date 传入时间（YYYY/MM/DD格式）
 * @returns {number}
 */
function stringToDateTime (date) {
  let time = 0;
  if (date) {
    date = date.replace('/', '').replace('/', '').replace(' ', '').replace(':', '').replace(':', '')
    let dateLength = date.length;
    let year;
    let month;
    let day;
    let hours;
    let minutes;
    let seconds;
    if (dateLength && dateLength === 14) {
      year = parseInt(date.substring(0, 4));
      month = parseInt(date.substring(4, 6));
      day = parseInt(date.substring(6, 8));
      hours = parseInt(date.substring(8, 10));
      minutes = parseInt(date.substring(10, 12));
      seconds = parseInt(date.substring(12, 14));
      let sTime = new Date(year, month - 1, day, hours, minutes, seconds);
      time = sTime.getTime()
    } else if (dateLength && dateLength === 8) {
      year = parseInt(date.substring(0, 4));
      month = parseInt(date.substring(4, 6));
      day = parseInt(date.substring(6, 8));
      let sTime = new Date(year, month, day);
      time = sTime.getTime()
    }
  }
  return time
}
          </code>
        </pre>
        <p>3，获得两个日期之间相差的天数</p>
        <pre v-highlightA>
          <code>
/**
 * @param date1 日期对象
 * @param date2 日期对象
 * @returns {number}
 */
function getDays(date1, date2) {
    const dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
    const minusDays = Math.floor(((date2.getTime() - date1.getTime()) / dateTime));//计算出两个日期的天数差
    return Math.abs(minusDays);
}
          </code>
        </pre>
        <p>3，获取当月第一天或最后一天</p>
        <pre v-highlightA>
          <code>
/**
 * @param date 日期对象
 * @param last last为true表示获取最后一天
 * @returns {string}
 */
function getMonthSomeDay(date, last=false) {
    let d = new Date();
    if(!last){
        d= new Date(date.getFullYear(), date.getMonth() , 1);
    }else{
        d = new Date(date.getFullYear(), date.getMonth() +1, 0);
    }
    return d;
}
          </code>
        </pre>
        <p>4，判断日期区间是否在限定范围内</p>
        <pre v-highlightA>
          <code>
 /**
 * @param beginDate 起始日期: YYYYMMDD
 * @param endDate 结束日期: YYYYMMDD
 * @param section 判断区间（月份数） 整数
 * @param errorMsg 错误提示消息
 * @returns {msg: string, success: boolean}
 */
function judgeDate (beginDate, endDate, section, errorMsg) {
  let result = { success: false, msg: errorMsg }; // success为false时为报错
  let beginYear = parseInt(beginDate.substring(0, 4));
  let beginMonth = parseInt(beginDate.substring(4, 6));
  let beginDay = parseInt(beginDate.substring(6, 8));
  let endYear = parseInt(endDate.substring(0, 4));
  let endMonth = parseInt(endDate.substring(4, 6));
  let endDay = parseInt(endDate.substring(6, 8));
  if (beginYear > endYear) { // 起始日期大于结束日期报错
    result.msg = '起始日期大于结束日期';
    return result;
  }
  if (beginYear &#60; endYear) {
    endMonth = endMonth + 12 * (endYear - beginYear);
  }
  if ((endMonth - beginMonth) &#60;= section) {
    if (beginDate.length &#60; 8) {
      result.success = true
    } else {
      if (endDay - beginDay > 0 && (endMonth - beginMonth) === section) {
        result.success = false
      } else {
        result.success = true
      }
    }
    return result
  } else {
    result.success = false;
    return result
  }
}
          </code>
        </pre>
      </div>
      <div id="components-number" style="padding-top: 10px">
        <h3>数字类工具</h3>
        <p>1，分转元，保留两位小数</p>
        <pre v-highlightA>
          <code>
 /**
 * @param amount 传入金额
 * @returns {number}
 */
function formatterFloat (amount) {
  let returnMoney = 0;
  if (amount) {
    let money = amount / 100;
    returnMoney = returnMoney + money
  }
  return returnMoney.toFixed(2)
}
          </code>
        </pre>
        <p>2，截取数据保留规定位小数</p>
        <pre v-highlightA>
          <code>
 /**
 * @param num 传入数字
 * @param decimal 规定小数位
 * @returns {number}
 */
function formatDecamal (num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}
          </code>
        </pre>
      </div>
      <div id="components-array" style="padding-top: 10px">
        <h3>数组类工具</h3>
        <p>1，数组去重</p>
        <pre v-highlightA>
          <code>
/**
 * @param arr 传入数组
 * @returns {array}
 */
 var unique = function(arr) {
    if ( Array.hasOwnProperty('from') ) {
      return Array.from(new Set(arr));
    }else{
      var n = {},r=[];
      for(var i = 0; i &#60; arr.length; i++){
        if (!n[arr[i]]){
          n[arr[i]] = true;
          r.push(arr[i]);
        }
      }
      return r;
    }
  }
          </code>
        </pre>
      </div>
      <div id="components-cookie" style="padding-top: 10px">
        <h3>cookie工具类</h3>
        <p>1，设置cookie</p>
        <pre v-highlightA>
          <code>
// 设置cookie,增加到vue实例方便全局调用
function setCookie (cname, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + 'domain=' + window.config.COOKIEULR
}
          </code>
        </pre>
        <p>2，删除cookie</p>
        <pre v-highlightA>
          <code>
function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString() + '; path=/;'
  }
}
          </code>
        </pre>
        <p>3，获取cookie</p>
        <pre v-highlightA>
          <code>
function getCookie (cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i &#60; ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
          </code>
        </pre>
      </div>
    </div>
    <div style="position: fixed; right: 5%;top: 35%;width: 10%">
      <a-anchor>
        <a-anchor-link href="#components-null" title="判空工具" />
        <a-anchor-link href="#components-time" title="时间类工具" />
        <a-anchor-link href="#components-number" title="数字转换工具" />
        <a-anchor-link href="#components-array" title="数组类工具" />
        <a-anchor-link href="#components-cookie" title="cookie工具类" />
      </a-anchor>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsLibrary",
  data: function () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
