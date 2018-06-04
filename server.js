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
app.get('/server_test', upload.array(), (req,res)=>{
    console.log("request params")
    console.log(req.params)
    res.send(req.params.success);
})
app.post('/server_test', upload.array(), (req,res)=>{
    console.log("request body")
    console.log(req.body)
    res.json(req.body);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen( process.env.PORT || 3050, () => console.log('listening'))