/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:8000', 
  },
};

export default nextConfig;
