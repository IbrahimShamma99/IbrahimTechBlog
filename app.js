const { app } = require("./server");

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});