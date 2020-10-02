import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import mockdata from "./mock";

import axios from 'axios'
import App from './App.vue'
import UserInfo from './components/UserInfo.vue'
import moment from 'moment'

Vue.use(ElementUI)
Vue.prototype.$axios = axios

//获取年份
Vue.filter('moment', function (value, formatString) {
  // formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format("YYYY-MM-DD"); // value可以是普通日期 20170723
});

new Vue({
  el: '#app',
  data () {
    return {
        tableData: [
          
        ]
        }   

},
methods: {
  getUserInfo() {
    this.$axios.get('http://localhost:8010/api/findAll').then(res => {
      console.log("下面这条日志是main.js打印的")
      console.log(res.data.data)
      this.tableData = res.data  
    })
  },
},
created(){
  this.getUserInfo()
},
  render: h => h(UserInfo)
})
