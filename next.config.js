const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register:true
    //skipWaiting:true,
    
  }
  //webpack5: true
})

module.exports = {
  // Webpack 5 is enabled by default
  // You can still use webpack 4 while upgrading to the latest version of Next.js by adding the "webpack5: false" flag
  webpack5: true,
}

module.exports = {
  reactStrictMode: true,
}