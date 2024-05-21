const mix = require('laravel-mix')
const glob = require('glob')
require('laravel-mix-ejs')
require('laravel-mix-webp-watched')

mix
  .webpackConfig({
    module: {
      rules: [{
        test: /\.scss/,
        enforce: "pre",
        loader: 'import-glob-loader'
      }]
    },
    devtool: "inline-source-map",
  })
  .js('static-resources/js/001_lesson/script.js', 'public/001_lesson/script.js')
  .sourceMaps(false, "inline-source-map")
  .webpWatched('static-resources/img', 'public/assets/img', {
    imageminWebpOptions: {
      quality: 70,
    }
  })
  .browserSync(
    {
      server: {
        baseDir: 'public',
        index: 'index.html'
      },
      port: 8080,
      proxy: false,
      // Watch files
      files: 'public/**/*',
    }
  )

glob.sync(
  'static-resources/ejs/**/*.ejs',
  { ignore: 'static-resources/ejs/**/_*.ejs' }
).map((file) => {
  const index = file.indexOf('/ejs')
  const dir = file.slice(index + 1)
  const path = dir.split("/").reverse().slice(1).reverse().slice(1).join("/")
  mix.ejs(file, 'public/' + path)
})