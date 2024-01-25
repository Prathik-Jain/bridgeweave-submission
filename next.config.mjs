/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'ui.cltpstatic.com',
            },
        ],
    },
};

export default nextConfig;
