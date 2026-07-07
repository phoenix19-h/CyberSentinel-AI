import { Shield, Activity, Search, Brain, Database } from "lucide-react";
import Scanner from "./Scanner";
import History from "./History";
import ThreatGraph from "./ThreatGraph";
import { useState,useEffect } from "react";
import ScanHistory from "./ScanHistory";
import "./index.css";
import IPScanner from "./IPScanner";
import PasswordScanner from "./PasswordScanner";
import EmailScanner from "./EmailScanner";
import PortScanner from "./PortScanner";
import DNSScanner from "./DNSScanner";
import HeaderScanner from "./HeaderScanner";
import TechScanner from "./TechScanner";
import CVEScanner from "./CVEScanner";




function App(){


const [history,setHistory] = useState(()=>{

const saved = localStorage.getItem("scanHistory");

return saved ? JSON.parse(saved) : [];

});



useEffect(()=>{

localStorage.setItem(
"scanHistory",
JSON.stringify(history)
);

},[history]);



return (

<div className="dashboard">


<div className="header">


<div className="logo">

<Shield size={60}/>

<h1>
CyberSentinel AI
</h1>


</div>


<p>
AI Powered Cyber Threat Intelligence Platform
</p>


</div>



<div className="cards">


<Card 
icon={<Activity/>}
title="Threat Engine"
value="ACTIVE"
/>


<Card
icon={<Search/>}
title="URL Scanner"
value="ONLINE"
/>


<Card
icon={<Brain/>}
title="AI Analyst"
value="READY"
/>


<Card
icon={<Database/>}
title="Database"
value="CONNECTED"
/>


</div>




<div className="content">


<Scanner setHistory={setHistory}/>


<IPScanner/>


<PortScanner/>


<DNSScanner/>


<HeaderScanner/>


<TechScanner/>


<CVEScanner/>


<PasswordScanner/>


<EmailScanner/>


<ThreatGraph data={history}/>


<ScanHistory history={history}/>


<History/>


</div>


</div>

)

}



function Card({icon,title,value}){


return (

<div className="card">


<div className="card-title">

{icon}

<h2>
{title}
</h2>

</div>


<h1>
{value}
</h1>


</div>

)

}



export default App;