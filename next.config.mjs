/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],

  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.0.22:3000',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doh7hmrj5r83i2k0.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
