import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import indexRouter from './routes/index'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)

app.use((req, res) => res.status(404).json({ message: 'Page not found' }))

// app.use(expressWinston.errorLogger(cfgErrorLog))

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  const message = req.app.get('env') === 'production' ? 'Internal server error' : err.message
  res.status(500).json({ message })
})

export default app
