const path = require('path');
const host = '0.0.0.0'
const port = 8085

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 4200,
        https: false,
        proxy: {
            '/repos': {
                target: 'https://api.github.com',
                changeOrigin: true, // 是否改变源地址
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_lib', resolve('src/common'))
            .set('_com', resolve('src/components'))
            .set('_img', resolve('src/assets'))
            .set('_ser', resolve('src/services'))
    }
}