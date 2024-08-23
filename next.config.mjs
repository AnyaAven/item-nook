import {
    WebpackZiggyCompilePlugin,
} from './webpackPlugins.js'
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev }) => {
        config.resolve.symlinks = true

        config.plugins.push(
            new WebpackZiggyCompilePlugin({
                output: {
                    path: 'src/ziggy.js',
                    types: true,
                }
            })
        )

        return config
    }
};

export default nextConfig;
