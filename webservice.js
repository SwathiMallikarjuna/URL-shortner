const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require("body-parser");
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.text({ type: "text/plain" }));

app.use(express.static(path.join(__dirname, "/public")));

require('./router')(app);
let server;
    server = app.listen(5000, 'localhost', function() {
        console.log("---------App is up now---------");
    });
// server.setTimeout(0);
