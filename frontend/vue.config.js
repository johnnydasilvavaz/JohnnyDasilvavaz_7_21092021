module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/social-frontend/'
        : '/',
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/_variables.scss";`
            }
        }
    }
};