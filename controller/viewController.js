const cache = require('../cache');
const jwt = require('jsonwebtoken');

function getrandom() {    
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return "https://"+result+"/";
}

exports.Index = async function(req, res) {
    try{
        const urlData = JSON.parse(await cache.getValue('urlData'));
        res.render('index',{
            cacheData: urlData
        });
        return false;
    } catch(e) {

    }
};

exports.Auth = async function(req, res) {
    try{
        const accessToken = await cache.getValue('accessToken');
        // const urlData = JSON.parse(await cache.getValue('urlData'));
        const auth = req.params.auth;
        if(accessToken == auth) {
             res.render('index');
        }
        return false;
    } catch(e) {

    }
};

exports.Render = async function(req, res) {
    try{
        res.render('login');
        return false;
    } catch(e) {

    }
};

exports.Login = async function(req, res) {
    try{
        const ACCESS_TOKEN = 'd8fae95dc376ae85d52990ccaf1d7c5267c2feac1113afcb92a8aaeabaf03e0ceaa8e7bfb3bbf269215bec47634813139eb5331762f7d9c3e5d0646ecd5a759b'
        await cache.setKeyValue('username',req.body.username);
        await cache.setKeyValue('password',req.body.password);
        const user = {name:req.query.username};
        const accessToken = jwt.sign(user,ACCESS_TOKEN);
        res.render('apiKey',{
            accessToken: accessToken
        });
        await cache.setKeyValue('accessToken',accessToken);
        return false;
    } catch(e) {

    }
};


exports.ShortURL = async function(req, res) {
    try{
        if(req.body !=""){
        const shortUrl = getrandom();
        const urlData = JSON.parse(await cache.getValue('urlData'));
        urlData['urlMapping'] ={};
        urlData.urlMapping['fullUrl'] = req.body;
        urlData.urlMapping['shortUrl'] = shortUrl
        await cache.setKeyValue('urlData',JSON.stringify(urlData));
        res.json(urlData)
        }
        return false;
    } catch(e) {

    }
    
    
};

exports.RedirectFullURL = async function(req, res) {
    const shortUrl = req.params.shortURL;
    const urlData = JSON.parse(await cache.getValue('urlData'));
    if(urlData.urlMapping.shortUrl == shortUrl) {
        res.redirect(urlData.urlMapping.fullUrl); 
        return false;
    } else {
        res.sendStatus(404);
    }
};