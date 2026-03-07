const axios = require("axios")
const getlanguagebyId =(lang)=>{
     const language = {
        "c++" : 54,
        "java" : 62,
        "javascript" : 63
     }
     return language[lang.toLowerCase()];
}

const submitBatch = async(submission)=>{
   
   const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
params: {
  base64_encoded: 'true'
},
headers: {
  'x-rapidapi-key':RAPID_KEY,
  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  'Content-Type': 'application/json'
},
data :{
   submission
}
   }

   async function fetchData() {
       try{
      const response = await axios.request(options);
      return response.data;
       
   }
   catch(err){
        console.log(err)
   }
   
   }

   return await fetchData();

}

module.exports ={getlanguagebyId,submitBatch};

