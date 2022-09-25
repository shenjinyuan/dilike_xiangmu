import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //基本地址
  timeout:5000
})
export default service
