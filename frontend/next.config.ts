const nextConfig = {

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: "greenvally.localhost" }],
          destination: "/:path*",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "silveroakhospital.localhost" }],
          destination: "/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
