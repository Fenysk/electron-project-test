const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Stock VG Manager",
        appId: 'stock.vg.manager',
        mac: {
          icon: 'public/icon.icns',
        }
      },
    },
  },
})
