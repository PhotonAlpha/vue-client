const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
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