import {useState} from "react";
import axios from "axios";


function DNSScanner(){


const [domain,setDomain]=useState("");

const [result,setResult]=useState(null);



async function scanDNS(){


const res = await axios.post(

"http://127.0.0.1:8000/dns-scan",

{
domain
}

);


setResult(res.data);


}



return (

<div className="scanner">


<h2>
🌐 DNS Intelligence
</h2>


<input

className="url-input"

placeholder="Enter domain"

value={domain}

onChange={(e)=>setDomain(e.target.value)}

/>


<button onClick={scanDNS}>
Analyze DNS
</button>




{

result &&

<div className="result-box">


<h2>
Domain:
</h2>

<p>
{result.domain}
</p>



<h3>
🖥 A Records
</h3>

{

result.a_records.map(x=>
<p>{x}</p>
)

}




<h3>
📧 MX Records
</h3>

{

result.mx_records.map(x=>
<p>{x}</p>
)

}




<h3>
🌐 Nameservers
</h3>

{

result.ns_records.map(x=>
<p>{x}</p>
)

}




<h3>
📄 TXT Records
</h3>


{

result.txt_records.map(x=>
<p>{x}</p>
)

}



<h2>

Risk:

{" "}

{result.risk}

</h2>


</div>


}



</div>

)


}


export default DNSScanner;