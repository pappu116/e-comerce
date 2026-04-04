/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
       {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // আপনার backend port
        pathname: "/uploads/**",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    
      {
        protocol: 'https',
        hostname: 'example.com', // Apnar JSON-e eita ache
      },
    ],
  },
};

export default nextConfig;