import {useState} from "react";
import axios from "axios";


function PasswordScanner(){


const [password,setPassword]=useState("");

const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);



async function checkPassword(){


if(!password) return;


setLoading(true);



try{


const response = await axios.post(

"http://127.0.0.1:8000/password-check",

{
password:password
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
🔐 Password Security Analyzer
</h2>



<input

className="url-input"

type="password"

placeholder="Enter password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button onClick={checkPassword}>

Analyze

</button>




{

loading &&

<h3>
Checking security...
</h3>

}





{

result &&

<div className="result-box">


<h2>

Strength:
{result.strength}

</h2>



<h2>

Score:
{result.password_score}/100

</h2>



<h3>
Issues
</h3>


<ul>

{

result.issues.map((issue,index)=>(

<li key={index}>
❌ {issue}
</li>

))

}

</ul>


</div>

}



</div>

)

}


export default PasswordScanner;