/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev }) => {
        config.resolve.symlinks = true
        return config
    }
};

export default nextConfig;
