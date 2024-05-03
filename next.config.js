/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'imagezen-uploaded-images.s3.eu-central-1.amazonaws.com' },
    ],
  },
}

module.exports = nextConfig
