const express = require('express');
const path = require('path')
const app = express();

app.get('/server_test', (req,res)=>{
    console.log('server_test')
    res.send( 'server_test' )
})

app.use(express.static('build'))
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen( process.env.PORT || 3050, () => console.log('listening'))