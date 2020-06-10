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

router.post('/add', function (req: express.Request, res: express.Response, next: express.NextFunction) {

    not('string', req.body.name)
    
    // most of the time, you will need findOrCreate
    // as users may attempt to create a user account
    // with a username or email that already exist
    return DB.User.findOrCreate({
        where: {
            name: req.body.name
        }
    }).then((user: Array <any | boolean>) => {
        // #findOrCreate returns an array [user, created (true or false)]
        console.log(user)
        if (user[1]) res.status(201)
        res.send(user[0])
    }).catch((err: Error) => {
        next(err)
    })
})

module.exports = router