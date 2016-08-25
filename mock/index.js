import express from 'express'

const app = express.Router()

app.get('/cash/account/bindCard.do', (req, res) => {
    res.jsonp({"responseCode":"000000","responseMessage":"绑卡成功"})
})

module.exports = app
