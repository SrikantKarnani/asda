const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
app.set('view engine' , 'ejs');
app.set('views',"./views");
app.use(express.static('dist'))
app.get('/',(req,res)=>res.render('home'));
const httpsOptions = {
    cert : fs.readFileSync(path.join(__dirname , 'server.crt')),
    key : fs.readFileSync(path.join(__dirname , 'server.key'))
}
https.createServer(httpsOptions,app).listen(
    process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,()=>console.log("Server Started"));
