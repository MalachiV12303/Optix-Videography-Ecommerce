/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'doh7hmrj5r83i2k0.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
