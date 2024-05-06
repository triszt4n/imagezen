/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com`,
      },
      {
        hostname: `lh3.googleusercontent.com`,
      },
    ],
  },
}

module.exports = nextConfig
