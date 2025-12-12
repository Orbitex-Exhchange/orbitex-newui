/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    // Force all pages to be dynamically rendered for better SSR compatibility
    output: 'standalone',
};

export default nextConfig;
