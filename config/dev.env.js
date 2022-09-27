'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://xmr.coyotebio-lab.com/lis_classes"',
  //本地
BASE_API: '"http://localhost:8201"',
  // BASE_API: '"http://localhost:8070"',
  // BASE_API: '"8.130.48.31"',
  //肖老师的服务器
 //BASE_API: '"http://xmr.coyotebio-lab.com:8201"',
 //宋春良的服务器
 //BASE_API: '"https://scldev.coyotebio-lab.com:8201"',
  //自己的服务器
   //BASE_API: '"http://120.76.228.139:8201"',

})
