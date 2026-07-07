import {useState} from "react";
import axios from "axios";


function EmailScanner(){


const [email,setEmail]=useState("");

const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);





async function scanEmail(){


if(!email) return;



setLoading(true);



try{


const response = await axios.post(

"http://127.0.0.1:8000/email-scan",

{
email:email
}

);



setResult(response.data);



}

catch(error){

console.log(error);

}



setLoading(false);


}





return (

<div className="scanner">


<h2>
📧 Phishing Email Detector
</h2>



<textarea


className="url-input"


rows="6"


placeholder="Paste email content here..."


value={email}


onChange={(e)=>setEmail(e.target.value)}


/>




<button onClick={scanEmail}>

Analyze Email

</button>





{

loading &&

<h3>

Scanning email...

</h3>

}





{

result &&


<div className="result-box email-result">


<h2>
📧 PHISHING EMAIL ANALYSIS
</h2>



<div className="threat-score">

Threat Score

<h1>
{result.score}/100
</h1>

</div>




<div 
className={`risk ${
result.risk.toLowerCase()
}`}
>

{result.risk}

</div>




<h3>
Detected Threats
</h3>



<ul className="findings">


{

result.findings.map((item,index)=>(

<li key={index}>

🔴 {item}

</li>

))

}


</ul>



</div>

}



</div>

)

}


export default EmailScanner;