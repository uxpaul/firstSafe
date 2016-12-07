'use strict'

let Controller = require('./Controller')
const AIDREC = require('../models/aidreceivers')
const AIDPRO = require('../models/aidproviders')

class AidReceiversController extends Controller {
    constructor() {
        super(AIDREC)
    }

    findById(req, res, next) {
        this.model.findById(req.params.id).populate({
            path: 'challenges',
        }).exec((err, document) => {
            if (err) next(err)
            else res.json(document)
        })
    }

}
module.exports = AidReceiversController
