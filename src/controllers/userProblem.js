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


const problemUpdate = async(req,res)=>{

    const {id} = req.params;
    try{
        if(!id){return res.status(404).send("ID Field is Missing")}
        const dsaproblem = await problem.findById(id);
        if(!dsaproblem){return res.status(404).send("Invalid Problem ID")}
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
    
    const newProblem = await problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true})  //here new means that return the document which has updated that means newly edited.and validator means it will check validation 
    res.status(200).send("Problem Updated Successfully");

}catch(err){
    res.status(404).send("Error Occured :"+err);
}
     

}

const problemDelete = async(req,res)=>{
 const {id} =req.params;
 try{
    if(!id){ return res.status(404).send("ID is Missing")}
    const deletedProblem = await problem.findByIdAndDelete(id);
    if(!deletedProblem){return res.status(404).send("ID is not valid")};
      res.status(200).send("Problem Deleted");
 }catch(err){
    res.status(404).send("Error"+err);
 }
}

const getProblemById = async(req,res)=>{
    const {id} = req.params;
    try{
           if(!id){return res.status(404).send("ID is Missing")}
           const getproblem = await problem.findById(id);
           if(!getproblem){return res.status(404).send("ID is invalid")};
           res.status(200).send(getproblem);
    }catch(err){
        res.status(404).send(err);
    }
}


const getAllProblem = async(req,res)=>{
    try{

      const getProblem = await problem.find({})
      if(!getProblem){return res.status(404).send("Problem is Misssing")};
      res.status(200).send(getProblem);

    }catch(err){
        res.status(404).send(err);
    }
}
module.exports={createProblem,problemUpdate,problemDelete,getProblemById,getAllProblem};