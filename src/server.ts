import { app } from './app.js'
import { env } from './env/index.js'

// const host = '0.0.0.0'
// const port = 3333

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    const url = `http://localhost:${env.PORT}`
    console.log(`HTTP Server RUnning at ${url}`)
  })
