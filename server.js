const express       = require('express');
const path          = require('path')
const bodyParser    = require('body-parser')
const multer        = require('multer');

const app           = express();
const upload        = multer();

/** use **/
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** routes **/
app.post('/callback', upload.array(), (req,res)=>{
    console.log("request body")
    console.log(req.body)
    res.json(req.body);
})
app.get('/redirect', upload.array(), (req,res)=>{
    console.log("request query")
    console.log(req.query)
    res.send(req.query.success);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen( process.env.PORT || 3050, () => console.log('listening'))