var express = require('express');
var router = express.Router();
var ruleEngineCon=require('../../connections/mysqlRuleEngineDbCon.js')



router.get('/getAllErrors:dtls', (req, res) => {

    try{
        var objectToSend={}
    

        var ent_cd=req.params.dtls;
    
        var query="Select * from error_info where ent_cd = '"+ent_cd+"'";
    
        ruleEngineCon.query(query,function(error,results){
    
            if(error){
                console.log("Error-->routes-->reject_handling-->errorInfo-->getAllErrors--",error)
                objectToSend["error"]=true
                objectToSend["data"]="Can't fetch error info at the moment.Please try again later. If problem persists call support"
                res.send(objectToSend);
            }else{
                objectToSend["error"]=false
                objectToSend["data"]=results;
                res.send(objectToSend);
            }
        })
    }catch(ex){
        console.log("Error-->routes-->reject_handling-->errorInfo-->getAllErrors--",ex)
        objectToSend["error"]=true
        objectToSend["data"]="Can't fetch error info at the moment.Please try again later. If problem persists call support"
        res.send(objectToSend);
    }
    
});

router.post('/ignoreError', (req, res) => {

    try{
        var objectToSend={}
    

        var error_id=req.body.error_id;
    
        var query="delete from error_info where error_id='"+error_id+"'";
    
        ruleEngineCon.query(query,function(error,results){
    
            if(error){
                console.log("Error-->routes-->reject_handling-->errorInfo-->ignoreError--",error)
                objectToSend["error"]=true
                objectToSend["data"]="Can't ignore this error at the moment.Please try again later. If problem persists call support"
                res.send(objectToSend);
            }else{
                objectToSend["error"]=false
                objectToSend["data"]="Error Ignored";
                res.send(objectToSend);
            }
        })
    }catch(ex){
        console.log("Error-->routes-->reject_handling-->errorInfo-->ignoreError--",ex)
        objectToSend["error"]=true
        objectToSend["data"]="Can't ignore this error at the moment.Please try again later. If problem persists call support"
        res.send(objectToSend);
    }
    
});




module.exports = router;
