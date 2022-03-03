import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
    base: '/',
    history: {
        type: 'hash',
    },
    publicPath: './',
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    // https://umijs.org/zh-CN/plugins/plugin-locale
    locale: {
        // default zh-CN
        default: 'en_US',
        antd: true,
        baseNavigator: false,
        baseSeparator: '_',
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    routes,
    theme: {
        'primary-color': '#1890ff',
    },
    title: false,
    ignoreMomentLocale: true,
    // proxy,
    manifest: {
        basePath: '/',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    webpack5: {},
    chainWebpack(memo) {
        memo.output.filename('js/[name].[hash:8].js');
        memo.output.chunkFilename('js/[name].[hash:8].js');
        memo.plugin('extract-css').tap(args => [
            {
                ...(args[0] || {}),
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
            }
        ])
    }
});
