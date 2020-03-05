module.exports = {
  publicPath: '/',
  outputDir: 'shop',
  lintOnSave: true,
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: ''
  //     }
  //   }
  // },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.devtool('')
    } else {
      // 为开发环境修改配置...
    }
  }
}
