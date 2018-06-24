const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const app = express();
app.set('view engine' , 'ejs');
app.set('views',"./views");
app.use(express.static('dist'))
app.get('/',(req,res)=>res.render('home'));
const httpsOptions = {
    cert : fs.readFileSync(path.join(__dirname , 'server.crt')),
    key : fs.readFileSync(path.join(__dirname , 'server.key'))
}
https.createServer(httpsOptions, app).listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
module.exports = app;
