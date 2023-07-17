/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
//   experimental: {
//     images: {
//         allowFutureImage: true
//     }
// },
scriptLoader: {
    test: '/public/affirm.js', // Path to the Affirm script
    strategy: 'afterInteractive',
  },
images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 3600,
    domains: [
        'assets.angara.com',
        'pics.angara.com',
        'www.angara.com',
        `media.v2.${process.env.ENVIRONMENT}.angara.com`,
        `filehub.v2.${process.env.ENVIRONMENT}.angara.com`,
        'cdn-yotpo-images-production.yotpo.com',
        'mediaprocessing.v2.qa.angara.com',
    ],
},
}

module.exports = nextConfig
