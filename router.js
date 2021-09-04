const viewController = require('./controller/viewController');
module.exports = function(app) {
    app.get('/',viewController.Render);
    app.post('/login',viewController.Login);
    app.post('/login/:auth',viewController.Auth);
    app.get('/login/:auth',viewController.Index);
    app.post('/shortURL',viewController.ShortURL);
    app.get('/:shortURL',viewController.RedirectFullURL)
};
