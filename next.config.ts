import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // About, Solutions, and Speciality were folded into Home and EHR
  // Integration. Keep old links and indexed URLs working.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/solutions", destination: "/", permanent: false },
      { source: "/speciality", destination: "/ehr-integration", permanent: false }
    ];
  }
};

export default nextConfig;
