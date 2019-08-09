module.exports = {
  presets: [
    '@vue/app',
    ["@babel/preset-env"]
  ],
  sourceType: 'unambiguous',
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
