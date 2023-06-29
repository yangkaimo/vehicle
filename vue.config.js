const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
        index:{
          // 入口
          entry:'src/main.js',
        },
      },
  lintOnSave:false,//关闭语法检查
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
  }
})

// module.exports = {
//   pages:{
//     index:{
//       // 入口
//       entry:'src/main.js',
//     },
//   },
//   lintonSave:false//关闭语法检查
// }
