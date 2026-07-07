import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


function ThreatGraph({data}){


return (

<div className="graph-card">


<h2>
Threat Score History
</h2>


<ResponsiveContainer width="100%" height={300}>


<LineChart data={data}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis domain={[0,100]}/>


<Tooltip/>


<Line

type="monotone"

dataKey="score"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>


)

}


export default ThreatGraph;