import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
const req = require.context('./svg', false, /\.svg$/)
// const fn = require.context('./svg', false, /\.svg$/)
// fn(路径) ==>
// fn.keys()==> 返回路径数组
//第一个参数是要寻找的文件路径
// 第二个是是非去子文件中寻找
//第三个是正则
// require 是根据路径对应的模块导入进来
// keys 是个方法返回一个函数 返回一个数组

const requireAll = requireContext => requireContext.keys().map((val) => {
  return requireContext(val)
})

// function requireAll(fn) {
//   return fn.keys().map((item) => {
//   return fn(item)
// })
// }
// requireAll(fn)
requireAll(req)

// map返回出一个和原数组相同数量的数组
// map（requireContext） 接受的就是req这个函数
// requireAll(req)
console.log(requireAll(req));
