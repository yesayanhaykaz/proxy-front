/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return [
      // keep legacy PHP paths SEO-safe
      { source: '/pages/pricing.php', destination: '/pricing', permanent: true },
      { source: '/pages/home.php', destination: '/', permanent: true },
      { source: '/pages/residential.php', destination: '/residential-proxies', permanent: true },
      { source: '/pages/mobile.php', destination: '/mobile-proxies', permanent: true },
      { source: '/pages/datacenter.php', destination: '/datacenter-proxies', permanent: true },
      { source: '/pages/fast.php', destination: '/fast-proxies', permanent: true }
    ];
  }
};
export default nextConfig;
