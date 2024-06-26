/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'miro.medium.com' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
            { protocol: 'http', hostname: 'localhost' },
        ], // <== Domain name
    },
};

export default nextConfig;
