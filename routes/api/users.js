var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.Register, (req, res, next) => {
    user = new User();
    const registerInfo = req.body.user;

    try {
        user.username = registerInfo.username;
        user.email = registerInfo.email;
        user.setPassword(registerInfo.password);

    } catch (e) {
        res.status(422).send({ error: "there was an error while registering" });
    };

    user.save().then(function() {
        user = user.toAuthJSON();
        return res.json({
            email: user.email,
            username: user.username,
            token: user.token
        });
    }).catch(next);

});

module.exports = router;