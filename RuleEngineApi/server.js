var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');






//start body-parser configuration
app.use(bodyParser.json({limit: '50mb'})); 
    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 



/////////////////F_add start



var errorInfo=require('./routes/reject_handling/errorInfo.js');
app.use('/errorInfo',errorInfo)

var modelInfo=require('./routes/ruleComponents/metaDefinition.js');
app.use('/metaInfo',modelInfo)

var ruleInfo=require('./routes/ruleComponents/ruleDefinition.js');
app.use('/ruleInfo',ruleInfo)



var test2=require('./routes/testFiles/drlCreation.js');
app.use("/test",test2)





////////////////////F_add end





//Server listen method
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});



