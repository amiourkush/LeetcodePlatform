const problem = require("../models/problem");
const submission = require("../models/submission");
const problem = require("../models/problem")
const {getlanguagebyId,submitBatch,submitToken} = require("../utils/problemUtility");

const submitCode =async(req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.id;

        const {code,language} = req.body;

        //fetch the problem from db
        const problem = await problem.findById(problemId);
        

        //storing sumbitted code, before Sending to judge0
        const submittedCode = await submission.create({
            userId,
            problemId,
            code,
            language,
            status : "pending",
            testCasesTotal : problem.hiddenTestCase.length
        })

        //now sending code to judge0
         const languageId = getlanguagebyId(language);

        const submission = problem.hiddenTestCase.map(({ input, output }) => ({
            source_code:code,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((value) => value.token);
        const resultb = await submitToken(resultToken);
        
        let runtime =0;
        let memory=0;
        let status="accepted";
        let errorMessage = null;
        let testCasesPassed=0;
        for(const test of resultb){
            if(test.status_id==3){
                testCasesPassed++;
                runtime+=parseFloat(test.time);
                memory=Math.max(memory,test.memory);


            }
            else{
                if(test.status_id==4){
                    status="error";
                    errorMessage=test.stderr;
                }else{
                    status="wrong";
                    errorMessage=test.stderr;
                }
            }
        }

        submittedCode.runtime=runtime;
        submittedCode.memory=memory;
        submittedCode.status=status;
        submittedCode.errorMessage=errorMessage;
        submittedCode.testCasesPassed=testCasesPassed;
        await submittedCode.save();
        res.status(400).send(submittedCode);

    }catch(err){

        res.status(404).send("Intenal Server Error"+err);
    }
}

module.exports=submitCode;