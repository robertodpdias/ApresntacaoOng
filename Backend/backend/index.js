
require('dotenv').config()

const route = require('./routes')

const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json({limit:"150mb"}))
app.use(Express.json({limit:"150mb"}))
/*app.use((req,res,next) =>{

    res.header("Access-Control-Allow-Origin", "*")
    req.header("Access-Control-Allow-Origin", "*")
    req.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors())
    next()
})*/

app.use(cors())
app.use(route)

app.listen(process.env.APP_PORT, () => {
    console.log("Servidor rodando na porta 3000")
})