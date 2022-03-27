// 先引入mockjs模块
import Mock from 'mockjs';

//把json数据格式引进进来[json数据格式根本就没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、json数据格式
import banner from './banner.json';
import floor from './floor.json'

// Mock.mock( rurl, template )：记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
// 第一个参数 rurl：请求地址，表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'。
// 第二个参数 template：请求数据，表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
Mock.mock("/mock/banner", {code:200, data:banner})//模拟首页大的轮播图的数据
Mock.mock("/mock/floor", {code:200, data:floor})
