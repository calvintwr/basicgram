import express from 'express'
import { Fields, Files, File } from 'formidable' // typing
import { join } from 'path' // we will use this for joining paths
const formidable = require('formidable') // formidable

const router = express.Router()
const Not = require('you-are-not')
const not = Not.create()
const DB = require('../models/index')

// we will receive userID as a string. We want to parse it and make sure
// it's an integer like "1", "2" etc, and not "1.1", "false"
Not.defineType({
    primitive: 'string',
    type: 'parseable-string',
    pass(id: string) {
        return parseInt(id).toString() === id
    }
})

router.post('/add', function (req: express.Request, res: express.Response, next: express.NextFunction) {

    const form = formidable({ multiples: true })

    let params: any
    form.parse(req, (err: Error, fields: Fields, files: Files) => {
        params = fields

        // use Not to sanitise our received payload

        // define a schema
        let schema = {
            userID: ['string', 'number'],
            caption: ['string']
        }

        // sanitise it
        let sanitised = Not.checkObject(
            'params',
            schema, 
            params, 
            { returnPayload: true }
        )
        
        // if sanitised is an array, we will throw it 
        if(Array.isArray(sanitised)) {
            throw Error(sanitised.join(' | ')) // join the errors
        }
        params = sanitised
    })

    let fileName: string;
    form.on('fileBegin', (name: string, file: File) => {
        fileName = name + (new Date().getTime()).toString() + '.jpg'
        file.path = join(__dirname, '../../public/uploads', fileName)
    })

    form.on('error', (err: Error) => {
        next(err) // bubbble the error to express middlewares
    })

    // we let the file upload process complete before we create the db entry.
    // you can also do it asynchronously, but will require rollback mechanisms
    // like transactions, which is more complicated.
    form.on('end', () => {
        return DB.Post.create({
            User_userID: params.userID,
            image: fileName,
            caption: params.caption
        }).then((post: any) => {
            console.log(post)
            res.status(201).send(post)
        }).catch((err: Error) => {
            next(err)
        })
    })
})

router.get('/own', function (req: express.Request, res: express.Response, next: express.NextFunction) {

    // for GET, the standard is to use querystring.
    // so it will be `req.query` instead of `req.body`
    not('parseable-string', req.query.userID)  

    DB.Post.findAll({
        where: {
            User_userID: req.query.userID
        },
        order: [ ['id', 'DESC'] ] // order post by id in descending, so the latest will be first.
    }).then((posts:any) => {
        res.send(posts)
    }).catch((err:Error) => {
        next(err)
    })
})

router.get('/feed', function (req: express.Request, res: express.Response, next: express.NextFunction) {

    not('parseable-string', req.query.userID)  

    // user's feed is not his/her own posts
    DB.Post.findAll({
        where: {
            User_userID: {
                [DB.Sequelize.Op.ne]: req.query.userID
            }
        },
        include: [ DB.User],
        order: [ ['id', 'DESC'] ] // order post by id in descending, so the latest will be first.
    }).then((posts:any) => {
        res.send(posts)
    }).catch((err:Error) => {
        next(err)
    })
})

module.exports = router
