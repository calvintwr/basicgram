// @ts-ignore
import createError = require('http-errors')
import express = require('express')
import { join } from 'path'
// @ts-ignore
import cookieParser = require('cookie-parser')
// @ts-ignore
import logger = require ('morgan')
// @ts-ignore
import Magic = require('express-routemagic')
import cors from 'cors'

const app: express.Application = express()

// enable cors
app.use(cors({
    credentials: true,
    origin: true,
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
    maxAge: 31536000000000,
    preflightContinue: true
}))

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))
Magic.use(app, { invokerPath: __dirname, logMapping: true }) // need to use `invokerPath` because we are not in root dir.


// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404))
})
// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err)
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.send({ message: err.message })
})
module.exports = app
