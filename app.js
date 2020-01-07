const app = require("./ssr-server");
const PORT = require("./config/config.json").PORT;

var server = app.listen(process.env.PORT || PORT, function() {
    console.log('Listening on port ' + server.address().port);
});