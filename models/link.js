const mongoose = require('mongoose')
const Schema = mongoose.Schema


// function shortLink(length){
// }


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true,
        // default: ""
    },
    visits: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

urlSchema.methods.generateLink = function(){
    let length = 3
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let charactersLength = characters.length

    for (let i=0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = mongoose.model('Link', urlSchema)