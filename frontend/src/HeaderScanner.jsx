import {useState} from "react";
import axios from "axios";


function HeaderScanner(){


const [url,setUrl]=useState("");
const [result,setResult]=useState(null);



async function scan(){


const res = await axios.post(

"http://127.0.0.1:8000/header-scan",

{
url
}

);


setResult(res.data);


}



return (

<div className="scanner">


<h2>
🛡 Web Security Analysis
</h2>


<input

className="url-input"

placeholder="https://example.com"

value={url}

onChange={
(e)=>setUrl(e.target.value)
}

/>


<button onClick={scan}>
Check Headers
</button>



{

result &&

<div className="result-box">


<h2>
Target:
</h2>

<p>
{result.url}
</p>



<h1>

Threat Score:

{" "}

{result.score}/100

</h1>



<h2>
Risk: {result.risk}
</h2>




<h3>
Security Headers
</h3>


{

Object.entries(result.headers)
.map(([key,value])=>(


<p key={key}>

{value ? "✅":"❌"}

{" "}

{key}

</p>


))

}



<h3>
Issues
</h3>


{

result.issues.map(
(i)=><p>{i}</p>
)

}



</div>

}



</div>

)


}


export default HeaderScanner;