const { WebpackWarPlugin } = require('webpack-war-plugin');

module.exports = {
    publicPath: '/visual',
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            // mutate for production...
            return {
                plugins: [
                    new WebpackWarPlugin({
                        archiveName: 'visual',
                    })
                ],
                devServer: {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                }   
            }
        } else {
            // mutate for development...
        }
    }
}