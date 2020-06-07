module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-weather-app/'
        : '/',

    pwa: {
        name: 'Vue Weather',
        themeColor: '#673ab7',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',


        workboxPluginMode: 'InjectManifest',
        workboxOptions: {

            swSrc: 'dev/sw.js',

        }
    }
}