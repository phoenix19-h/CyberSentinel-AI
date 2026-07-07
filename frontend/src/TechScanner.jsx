import {useState} from "react";
import axios from "axios";


function TechScanner(){


const [url,setUrl]=useState("");

const [result,setResult]=useState(null);



async function scan(){


const res=await axios.post(

"http://127.0.0.1:8000/tech-detect",

{
url
}

);


setResult(res.data);

}



return (

<div className="scanner">


<h2>
🕵️ Technology Detector
</h2>


<input

className="url-input"

placeholder="https://example.com"

value={url}

onChange={(e)=>setUrl(e.target.value)}

/>


<button onClick={scan}>
Detect
</button>




{

result &&

<div className="result-box">


<h3>
Detected:
</h3>


{

result.technologies.map(

(t,i)=>

<p key={i}>
✅ {t}
</p>

)

}


</div>

}



</div>

)

}


export default TechScanner;