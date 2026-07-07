import {useEffect,useState} from "react";
import axios from "axios";


function History(){


const [scans,setScans]=useState([]);



useEffect(()=>{


async function loadHistory(){

const res = await axios.get(
"http://127.0.0.1:8000/history"
);


setScans(res.data);

}


loadHistory();


},[]);



return (

<div className="mt-10">





<div className="space-y-4">


{
scans.map((scan)=>(


<div

key={scan.id}

className="
bg-white/10
p-5
rounded-xl
"


>


<h3>

{scan.url}

</h3>


<p>

Risk:
{scan.risk_level}

</p>


<p>

Score:
{scan.risk_score}/100

</p>



</div>


))
}


</div>



</div>


)

}


export default History;