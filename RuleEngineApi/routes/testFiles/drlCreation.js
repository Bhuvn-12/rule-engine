var express = require('express');
var router = express.Router();
var ruleEngineCon = require('../../connections/mysqlRuleEngineDbCon.js')



router.get('/testGet/fsample', (req, res) => {
    var obj = {}
    obj["val1"] = "ThisString"

    var query = "Select rule_structure from rule_meta where rule_set_id=5"

    ruleEngineCon.query(query, function (error, results) {
        if (error) {
            res.send(error)
        } else {
            try {
                var temp = JSON.parse(results[0].rule_structure)
                console.log(temp.rules[0].when.rules[2].value)
            } catch (ex) {
                console.log("Error while parsing or fetching-->", ex)
            }

        }
    })

    res.send(JSON.stringify(obj))
});

router.post('/testPost/fsample', (req, res) => {
    var obj = req.body;

    obj.rules[0].when.rules[2]
});


router.post('/createDrl', (req, res) => {

    var objectToSend={}
    var ent_cd = 'F101'

    var rule_set_id = 35;

    ruleEngineCon.query("Select rule_structure from rule_meta where rule_set_id='" + rule_set_id + "'", function (error0, results0) {
        if (error0) {
            console.log("Error-->routes-->ruleComponents-->ruleDefinition-->createDrl--", error0)
            objectToSend["error"] = true
            objectToSend["data"] = "Can't create rule at the moment.Please try again later. If problem persists call support"
            res.send(objectToSend);
        } else {

            console.log(results0[0].rule_structure)
            var obj = JSON.parse(results0[0].rule_structure)

            


            var drlContent = "package Test.Rules;\nimport Test.Rules.InputRecord;\n";

            var salience = -1;

            var inputObject = null;

            var outputObjects = {}

            var lookupsName = {}



            for (var i = 0; i < obj.length; i++) {
                var rule_temp = obj[i]
                inputObject = rule_temp.inputDataObj

                var then_temp = rule_temp.then

                for (var j = 0; j < then_temp.length; j++) {
                    outputObjects[then_temp[j].outputDataObject] = ""
                }

            }

            var outObjStr = ""

            var distOutModels = Object.keys(outputObjects)

            for (var i = 0; i < distOutModels.length; i++) {
                outObjStr += ",'" + distOutModels[i] + "'"
                
            }

            var sql_getColTypes = "Select mi.model_id,mi.model_name,mm.column_name,mm.column_type from"
                + " (Select model_id,model_name from model_info where model_name in ('" + inputObject + "'" + outObjStr + ") "
                + " and ent_cd ='" + ent_cd + "') mi "
                + " join model_meta mm on mm.model_id=mi.model_id "

            ruleEngineCon.query(sql_getColTypes, function (error1, results1) {
                if (error1) {
                    console.log("Error-->routes-->ruleComponents-->ruleDefinition-->createDrl--", error1)
                    objectToSend["error"] = true
                    objectToSend["data"] = "Can't create rule at the moment.Please try again later. If problem persists call support"
                    res.send(objectToSend);
                } else if (results1.length == 0) {
                    objectToSend["error"] = true
                    objectToSend["data"] = "No columns defined for data objects"
                    res.send(objectToSend);
                } else {
                    var column_type_info = {}

                    for (var k = 0; k < results1.length; k++) {



                        if (column_type_info[results1[k].model_name] == undefined) {
                            var outer_obj = {}
                            var temp_obj = {}

                            temp_obj[results1[k].column_name] = results1[k].column_type

                            outer_obj["col_info"] = temp_obj
                            outer_obj["model_id"] = results1[k].model_id
                            column_type_info[results1[k].model_name] = outer_obj
                        } else {
                            column_type_info[results1[k].model_name]["col_info"][results1[k].column_name] = results1[k].column_type
                        }
                    }

                    for (var l = 0; l < obj.length; l++) {

                        var rule = obj[l]

                        var rule_name = rule.ruleName;

                        inputObject = rule.inputDataObj

                        var when = rule.when;

                        var condition = when.condition

                        var when_clause = when.rules

                        drlContent+='rule "'+rule_name+'"\n'

                        drlContent += "when \n"

                        if (when_clause.length > 0) {

                            drlContent += "input:InputRecord(\n"

                            for (var m = 0; m < when_clause.length; m++) {
                                var clause = when_clause[m]

                                var exprType = clause.function;

                                if (exprType == "static") {
                                    drlContent += 'input.get("' + clause.field + '")' + clause.operator
                                    if (column_type_info[inputObject]["col_info"][clause.field] == "string") {
                                        drlContent += '"' + clause.value + '"\n'
                                    }else{
                                        drlContent +=  clause.value + '\n'
                                    }
                                } else if (exprType == "expression") {
                                    drlContent += 'input.get("' + clause.field + '")' + clause.operator + clause.value + '\n'
                                } else if (exprType == "derived") {
                                    drlContent += 'input.get("' + clause.field + '")' + clause.operator + 'input.get("' + clause.newfield + '")\n'
                                } else {
                                    lookupsName[clause.lookupname] = ""
                                    drlContent += 'input.get("' + clause.field + '")' + clause.operator
                                        + 'Lookup.from("' + clause.lookupname + '",input.get("' + clause.lookupkey + '"))\n'
                                }

                                if (m < when_clause.length - 1) {
                                    drlContent += condition + '\n'
                                }


                            }
                            drlContent += ")\n"
                        }

                        var then = rule.then

                        drlContent += "then\n"

                        if (then.length > 0) {

                            for (m = 0; m < then.length; m++) {

                                var outModel = then[m].outputDataObject

                                var asmts = then[m].assignments

                                var variable_name = outModel + "_" + i
                                drlContent += 'OutputRecord ' + variable_name + ' = new OutputRecord("' + outModel + '"); \n '

                                for (var n = 0; n < asmts.length; n++) {

                                    var temp_asmt = asmts[n]
                                    var asmt_value = "";
                                    if (temp_asmt.function == "static") {
                                        if (column_type_info[outModel]["col_info"][temp_asmt.field] == "string") {
                                            asmt_value = '"' + temp_asmt.value + '"'
                                        }else{
                                            asmt_value = temp_asmt.value
                                        }
                                    } else if (temp_asmt.function == "derived") {
                                        asmt_value = 'input.get("' + temp_asmt.newfield + '")'
                                    } else if (temp_asmt.function == "expression") {
                                        asmt_value = temp_asmt.value
                                    } else {
                                        lookupsName[temp_asmt.lookupname] = ""
                                        asmt_value = 'Lookup.from("' + temp_asmt.lookupname + '","' + temp_asmt.lookupkey + '")'
                                    }

                                    drlContent += variable_name + '.set("' + temp_asmt.field + '",' + asmt_value + ');\n'
                                }
                                drlContent += 'input.setOutput(' + variable_name + ');\n'

                            }
                        }

                        drlContent += "end\n"
                    }

                    console.log(drlContent)

                    var sql_insertDrl = "update rule_meta set drl_content='" + drlContent + "' where rule_set_id='" + rule_set_id + "'"

                    var sql_inModel = "insert into rule_xref_in_model (rule_id,model_id) values ('" + rule_set_id + "','" + column_type_info[inputObject]["model_id"] + "')"


                    var sql_outModel="insert into rule_xref_out_model (rule_id,model_id) values "

                    if(distOutModels.length>0){
                        for(var p=0;p<distOutModels.length;p++){
                            sql_outModel+="('"+rule_set_id+"','"+column_type_info[distOutModels]["model_id"]+"')"
    
                            if(p<distOutModels.length-1){
                                sql_outModel+=","
                            }
                        }
                    }else{
                        sql_outModel+="('"+rule_set_id+"',null)"
                    }

                    
                   

                    var lookup_names=""

                    var lookupUsed=Object.keys(lookupsName)

                    if(lookupUsed.length>0){
                        for(var p=0;p<lookupUsed.length;p++){
                            lookup_names+="'"+lookupUsed[p]+"'"
    
                            if(p<lookupUsed.length-1){
                                lookup_names+=","
                            }
                        }
                    }else{
                        lookup_names+="'null'"
                    }

                    

                    var sql_getLookupId="Select lookup_id from lookup_info where ent_cd = '"+ent_cd+"' and lookup_name in ("+lookup_names+")"

                    ruleEngineCon.query(sql_getLookupId,function(error3,results3){
                        if(error3){
                            console.log("Error-->routes-->ruleComponents-->ruleDefinition-->createDrl--", error4)
                            objectToSend["error"] = true
                            objectToSend["data"] = "Can't create rule at the moment.Please try again later. If problem persists call support"
                            res.send(objectToSend);
                        }else{
                            

                            var sql_insertRuleXlookup="insert into rule_xref_lookups (rule_id,lookup_id) values"

                            if(results3.length>0){
                                for(var q=0;q<results3.length;q++){
                                    sql_insertRuleXlookup+="('"+rule_set_id+"','"+results3[q].lookup_id+"')"
    
                                    if(q<results3.length-1){
                                        sql_insertRuleXlookup+=","
                                    }
                                }
                            }else{
                                sql_insertRuleXlookup+="('"+rule_set_id+"',null)"
                            }

                            var final_query=sql_insertDrl+";"+sql_inModel+";"+sql_outModel+";"+sql_insertRuleXlookup

                            console.log(final_query)

                            ruleEngineCon.query(final_query,function(error4,results4){

                                if(error4){
                                    console.log("Error-->routes-->ruleComponents-->ruleDefinition-->createDrl--", error4)
                                    objectToSend["error"] = true
                                    objectToSend["data"] = "Can't create rule at the moment.Please try again later. If problem persists call support"
                                    res.send(objectToSend);
                                }else{
                                    /////////////
                                    //////create drl file if required
        
                                    objectToSend["error"] = true
                                    objectToSend["data"] = "Rule set created successfully"
                                    res.send(objectToSend);
        
        
                                }
        
                            })
                            
                        }
                    })
                    

                }
            })



        }
    })




    
});

module.exports = router;