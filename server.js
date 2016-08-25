import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ip from 'ip'
import http from 'http'
import chokidar from 'chokidar'
import config from './webpack.config.js'

const app = express()
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'dist/',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.use((req, res, next) => {
  require('./mock')(req, res, next)
})

const watcher = chokidar.watch('./mock')
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Clearing /mock/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]mock[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

compiler.plugin('done', () => {
  console.log('Clearing /src/ module cache from server')
  Object.keys(require.cache).forEach((id) => {
    if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id]
  })
})

const server = http.createServer(app)
server.listen(3300, ip.address(), (err) => {
  if (err) throw err
  const addr = server.address()
  console.log('==> 🌎 Listening on  http://%s:%d', addr.address, addr.port)
})

