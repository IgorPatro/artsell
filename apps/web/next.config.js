const { withNx } = require('@nrwl/next/plugins/with-nx');

const nextConfig = {
  nx: {
    svgr: true,
  },
  compiler: {
    styledComponents: true,

  },
  images: {
    domains: ['assets.modernitycloud.pl']
  }
};

module.exports = withNx(nextConfig);
