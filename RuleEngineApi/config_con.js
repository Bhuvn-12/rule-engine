//sql connection  variables
var mysqlHost="host5";
var mysqlUser="rajan";
var mysqlPwd="fun2learn";



var ruleEngineDbName="rule_engine";




var ruleEngineDbConfig={
    host: mysqlHost, //mysql database host name
    user: mysqlUser, //mysql database user name
    password: mysqlPwd, //mysql database password
    database: ruleEngineDbName, //mysql database name
    multipleStatements:true
}





module.exports={
    //sql connection prop
    ruleEngineDbProps:ruleEngineDbConfig,
    

}
