/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cors: {
    origin: ["*"],
    methods: ["GET", "PUT", "POST", "DELETE"]
  },
};

export default nextConfig;
