'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  /*NODE_ENV: '"development"'*/
<<<<<<< HEAD
  /*NODE_ENV: '"http://192.168.8.93:8080"'*/
  NODE_ENV: '"http://localhost:8088"'
=======
  // NODE_ENV: '"http://192.168.8.93:8080"'
  NODE_ENV: '"http://localhost:8080"'
>>>>>>> origin/master
})
