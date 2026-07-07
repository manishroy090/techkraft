const nextConfig = {
 output: 'standalone',
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
