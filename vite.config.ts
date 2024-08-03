import {
    defineConfig,
    loadEnv,
} from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
// @ts-ignore
import typescriptPermissionsPlugin from './typescriptPermissionsPlugin'

export default defineConfig((config) => {
    const env = loadEnv(config.mode, process.cwd(), '')

    return {
        plugins: [
            // original
            laravel({
                input: ['resources/css/app.css', 'resources/js/index.ts'],
                refresh: true,
            }),
            // laravel({
            //   input: 'resources/js/app.tsx',
            //   refresh: true,
            // }),
            react(),
            typescriptPermissionsPlugin(),
        ],
        resolve:
            {
                alias: {
                    '@':
                        '/resources/js',
                },
            },
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    }
})
