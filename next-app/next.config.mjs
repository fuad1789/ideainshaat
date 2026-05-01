import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  async redirects() {
    return [
      { source: '/', destination: '/az', permanent: false },
      { source: '/brief', destination: '/az/brief', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
