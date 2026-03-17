const {getlanguagebyId,submitBatch,submitToken} = require("../utils/problemUtility");
const problem = require("../models/problem")

const createProblem =async (req,res)=>{

    const{title,description,difficulty,tags,visibleTestcase,hiddenTestcase,startcode,referenceCode,problemCreator} = req.body;
    for(const {language,completecode} of referenceCode){

        const languageId = getlanguagebyId(language);

        const submission = visibleTestcase.map(({input,output})=>({
            source_code : completecode,
            language_id:languageId,
            stdin : input,
            expected_output : output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((value)=>value.token);
        const resultb = await submitToken(resultToken);

        for(const test of resultb){
            if(test.status_id!=3){
                return res.status(400).send("Error Occured");
            }
        }
    }

    const userProblem = await problem.create({...req.body,problemCreator:req.result._id})
    res.status(200).send("Problem Saved Successfully");
}

module.exports=createProblem;