import {useState} from "react";
import axios from "axios";


function Scanner({setHistory}){


const [url,setUrl]=useState("");
const [result,setResult]=useState(null);
const [loading,setLoading]=useState(false);
const [step,setStep]=useState("");



async function scanURL(){


if(!url) return;


setLoading(true);
setResult(null);


setStep("Connecting to target...");


setTimeout(()=>{
setStep("Checking security headers...");
},1000);



setTimeout(()=>{
setStep("Analyzing threats...");
},2500);



setTimeout(()=>{
setStep("AI generating report...");
},4000);



try{


const response = await axios.post(

"http://127.0.0.1:8000/scan-url",

{
url:url
}

);



console.log(response.data);



setResult(response.data);



setHistory(prev=>[

...prev,

{

id:Date.now(),

url:response.data.url,

risk_score:response.data.risk_score,

risk_level:response.data.risk_level

}

]);



}

catch(error){

console.log(error);

}



setLoading(false);


}





return (

<div className="scanner">



<input

type="text"

placeholder="Enter URL"

value={url}

onChange={(e)=>setUrl(e.target.value)}

/>



<button onClick={scanURL}>

Scan URL

</button>



{
loading &&

<h3>

{step}

</h3>

}



{

result &&


<div className="result-box">


<h2>

Risk Score:
{result.risk_score}/100

</h2>



<h2>

{result.risk_level}

</h2>



<p>

{result.ai_report}

</p>


</div>

}


</div>

)

}



export default Scanner;