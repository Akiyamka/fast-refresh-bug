// const postCSSConfig = {
//   plugins: [
//     require('autoprefixer')
//   ]
// }

// export default postCSSConfig;

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-normalize'),
    require('postcss-nested'),
  ]
}