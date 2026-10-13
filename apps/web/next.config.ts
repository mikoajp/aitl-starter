import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: ['@aitl/core'],
  // Lint uruchamiany jest osobno w CI (npm run lint), nie podczas buildu.
  eslint: { ignoreDuringBuilds: true },
}

export default config
