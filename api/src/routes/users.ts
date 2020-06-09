import express from 'express'
const router = express.Router()
const Not = require('you-are-not')
const not = Not.create()
const DB = require('../models/index')

router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.User.findAll().then((result: any) => {
        console.log(result)
        res.send(result)
    }).catch((err: Error) => {
        // Calling #next will hand the error back to express,
        // so that the error handler defined in `app.ts` will handle.
        next(err)
    })
})

router.put('/add', function (req: express.Request, res: express.Response, next: express.NextFunction) {

    not('string', req.body.name)
    
    DB.User.create({
        name: req.body.name
    }).then((result: any) => {
        console.log(result)
        res.send(result)
    }).catch((err: Error) => {
        next(err)
    })
})

module.exports = router