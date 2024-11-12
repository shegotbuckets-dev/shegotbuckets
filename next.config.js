/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "xfnfajmpjdkajuaywztb.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "gdzjjimhuijepuaqyybd.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};
module.exports = nextConfig;
