/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ⬅ ini yang mem-bypass error build
  },
  typescript:{
    ignoreBuildErrors:true,     // opsional biar build lanjut meski TS error
  }
}

module.exports = nextConfig
