const nextConfig = {
 output: 'standalone',
 allowedDevOrigins: ['scoring.local'],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: "scoring.local" }],
          destination: "/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
