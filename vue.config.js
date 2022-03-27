module.exports = {
    lintOnSave: false,
    //代理跨域
    devServer: {
        //只有浏览器与服务器之间才会有跨域问题，服务器与服务器之间是没有跨域问题的
        //所以在这里设置了一个代理服务器用与和目标服务器进行交互
        proxy: {
            //若请求路径中有/api，代理服务器就会去寻找target里的服务器
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' },
            },
        },
    }
}