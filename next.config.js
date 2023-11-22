/** @type {import('next').NextConfig} */
/* IMPORTANT!!! TO BE ABLE TO USE IMAGES FROM PEXELS.COM AS SOURCES DO THIS DOWN BELOW */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com"
            }
        ]
    }
}

module.exports = nextConfig
