import {useState} from "react";
import axios from "axios";


function IPScanner(){


const [ip,setIp] = useState("");

const [result,setResult] = useState(null);

const [loading,setLoading] = useState(false);



async function scanIP(){


if(!ip) return;


setLoading(true);



try{


const response = await axios.post(

"http://127.0.0.1:8000/scan-ip",

{
ip:ip
}

);



console.log(response.data);


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

🔍 IP Reputation Scanner

</h2>



<input


className="url-input"


placeholder="Enter IP Address"


value={ip}


onChange={(e)=>setIp(e.target.value)}


/>




<button onClick={scanIP}>

Scan IP

</button>




{

loading &&

<h3>

Analyzing IP...

</h3>

}





{

result &&


<div className="result-box">


<h2>

IP:
{result.ip}

</h2>



<h2>

Score:
{result.risk_score}/100

</h2>




<h2>

{result.risk_level}

</h2>




<div className="ip-report">


<h2>
🛡️ IP THREAT INTELLIGENCE
</h2>



<div className="ip-row">

<span>🌐 IP Address</span>

<strong>{result.ip}</strong>

</div>



<div className="ip-row">

<span>🌍 Country</span>

<strong>{result.country}</strong>

</div>




<div className="ip-row">

<span>🏢 ISP</span>

<strong>
{result.report.match(/ISP:\n(.*)/)?.[1]}
</strong>

</div>





<div className="ip-row">

<span>📊 Total Reports</span>

<strong>
{result.report.match(/Reports:\n(.*)/)?.[1]}
</strong>

</div>




<div className="ip-row">

<span>⚠️ Threat Score</span>

<strong>

{result.risk_score}/100

</strong>

</div>





<div className={`risk ${result.risk_level.toLowerCase()}`}>

{result.risk_level}

</div>



</div>



</div>


}



</div>

)

}



export default IPScanner;