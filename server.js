const express = require('express');
const path = require('path')
const app = express();

app.post('/server_test', (req,res)=>{
    //console.log('request/response')
    //console.log(req)
    //console.log(res)
    res.send( 'callback/return' )
})

app.use(express.static('build'))
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen( process.env.PORT || 3050, () => console.log('listening'))