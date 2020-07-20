// 定制了UI框架的主题（这个文件是我自己手动创建的）
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#FF8212',
          'link-color': '#FF8212',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  }
}
