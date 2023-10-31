const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "./",
    devServer: {
        proxy: {
            "/auth": {
                target: "http://lexis-gateway:9999",
                changeOrigin: true,
            },
            "/bridge": {
                target: "http://lexis-gateway:9999",
                changeOrigin: true,
            },
            "/app": {
                target: "http://lexis-gateway:9999",
                changeOrigin: true,
            },
            "/apply": {
                target: "http://lexis-gateway:9999",
                changeOrigin: true,
            },

        },
    },
});
