function ScanHistory({history}){


return (

<div className="history-container">


<h2>
Recent Scans
</h2>



<div className="history-grid">



{

history.map((item)=>(


<div

className="history-card"

key={item.id}

>



<h3>

🌐 {item.url}

</h3>



<p>

Score: {item.risk_score}/100

</p>



<div

className={`badge ${item.risk_level.toLowerCase()}`}

>


{
item.risk_level==="HIGH" &&
"🔴 HIGH RISK"
}


{
item.risk_level==="MEDIUM" &&
"🟡 MEDIUM RISK"
}


{
item.risk_level==="LOW" &&
"🟢 LOW RISK"
}


</div>



</div>


))

}



</div>


</div>

)

}


export default ScanHistory;