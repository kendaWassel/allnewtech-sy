/** @type {import('next').NextConfig} */
const apiHost = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
  : null;

const isLocalApi =
  !process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL.includes('localhost') ||
  process.env.NEXT_PUBLIC_API_BASE_URL.includes('127.0.0.1');

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: isLocalApi,
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/**' },
      ...(apiHost && apiHost !== '127.0.0.1' && apiHost !== 'localhost'
        ? [
            { protocol: 'https', hostname: apiHost, port: '', pathname: '/**' },
            { protocol: 'http', hostname: apiHost, port: '', pathname: '/**' },
          ]
        : []),
    ],
  },
};

export default nextConfig;
