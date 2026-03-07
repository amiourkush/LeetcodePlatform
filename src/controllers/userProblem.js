const {getlanguagebyId,submitBatch} = require("../utils/problemUtility");

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
    }
}