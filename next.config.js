/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { dev, isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Enhanced bundle optimization
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: "all",
                maxInitialRequests: 25,
                minSize: 20000,
                cacheGroups: {
                    default: {
                        minChunks: 1,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        priority: -10,
                    },
                    // Split heavy libraries into separate chunks
                    framerMotion: {
                        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                        name: "framer-motion",
                        chunks: "all",
                        priority: 10,
                    },
                    pdfRenderer: {
                        test: /[\\/]node_modules[\\/]@react-pdf[\\/]/,
                        name: "pdf-renderer",
                        chunks: "all",
                        priority: 10,
                    },
                    stripe: {
                        test: /[\\/]node_modules[\\/]@stripe[\\/]/,
                        name: "stripe",
                        chunks: "all",
                        priority: 10,
                    },
                    clerk: {
                        test: /[\\/]node_modules[\\/]@clerk[\\/]/,
                        name: "clerk",
                        chunks: "all",
                        priority: 10,
                    },
                },
            };
        }

        return config;
    },
    images: {
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "xfnfajmpjdkajuaywztb.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "wlkdhvpgjaohkhndaqvy.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
    compress: true,
    poweredByHeader: false,
    experimental: {
        optimizePackageImports: ["framer-motion", "lodash"],
        serverComponentsExternalPackages: ["@react-pdf/renderer"],
    },
};
module.exports = nextConfig;
