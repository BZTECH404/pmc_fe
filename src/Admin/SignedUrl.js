import AWS from 'aws-sdk'
import axios from 'axios';
import { KeyId,AccessKey } from '../api';
const s3 = new AWS.S3({
  accessKeyId: KeyId,
  secretAccessKey: AccessKey,
  region: 'ap-south-1',
  apiVersion: '2006-03-01' // Add this line
});
let bucketName = 'dcpr1';
const triggerFunction = async (extension,foldername) => {

// let key1=${foldername}/${Date.now().toString()}.${extension}
let key1=``
// let key1 = foldername ? `${foldername}/${extension}` : `/${extension}`;
console.log(foldername,foldername[foldername.length-1])
if(foldername[foldername.length-1]=='/'){
  // console.log("here")
  key1=`${foldername}${extension}`
}
else if(foldername.length!=0){
  console.log("there")
  key1 = `${foldername}/${extension}` 
}
else{
  key1=`/${extension}`
}
  
try {
  const response = await axios.post("https://jiycm07tpk.execute-api.ap-south-1.amazonaws.com/prod/gsu", {
    bucket: bucketName,
    key1,
    Expires: 300,
  });

  let arr = [response.data.signedUrl, key1];
  console.log(arr); // Log the array containing signedUrl and key1

  return arr; // Return the array as the result of triggerFunction
} catch (error) {
  console.error('Error fetching signedUrl:', error);
  throw error; // Propagate the error if needed
}

  }

  const getPredefinedUrl = (key1) => {
    const modi=encodeURIComponent(key1)
    return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${modi}`;
  };
  
  
  export { triggerFunction, getPredefinedUrl };


  // right
  //https://dcpr1.s3.ap-south-1.amazonaws.com/Appointment+of+developer+for+residential+redevelopment+of+Ambedkar+Nagar+CHS%2C+Worli/0%2B1+2()dfd.png
  //rong
  // https://dcpr1.s3.ap-south-1.amazonaws.com/Appointment+of+developer+for+residential+redevelopment+of+Ambedkar+Nagar+CHS,+Worli/0+1+2()dfd.png