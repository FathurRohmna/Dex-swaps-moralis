module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    }
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; }
}
