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
        user.token = user.generateJWT();
    } catch (e) {
        res.status(422).send({ error: "there was an error while registering" });
    };
    user.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({ succes: false, message: 'User already exist!' });
            }
            return res.status(422).send(err);
        }
        res.json({
            username: user.username,
            email: user.email,
            token: user.token
        });
    });
});

module.exports = router;