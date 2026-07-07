import {useState} from "react";
import axios from "axios";


function CVEScanner(){


const [product,setProduct]=useState("");

const [result,setResult]=useState(null);



async function scanCVE(){


const response=await axios.post(

"http://127.0.0.1:8000/cve-check",

{
product
}

);


setResult(response.data);


}



return (

<div className="scanner">


<h2>
🐛 CVE Vulnerability Lookup
</h2>



<input

className="url-input"

placeholder="Example: apache"

value={product}

onChange={
(e)=>setProduct(e.target.value)
}

/>



<button onClick={scanCVE}>

Search CVEs

</button>




{

result &&


<div className="result-box">



<h2>

Product:
{result?.product || "Unknown"}

</h2>



<h2>

Risk:
{result.risk}

</h2>



<h3>

Found:
{result.count || 0}

CVEs

</h3>



{


result.cves?.map(

(cve,index)=>(


<div

className="port-card"

key={index}

>


<h3>

🐛 {cve.id}

</h3>


<p>

{cve.summary}

</p>



<p>

CVSS:
{cve.severity}

</p>



</div>


)

)


}



</div>


}


</div>

)


}


export default CVEScanner;