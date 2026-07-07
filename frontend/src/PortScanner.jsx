import { useState } from "react";
import axios from "axios";


function PortScanner(){


    const [target,setTarget] = useState("");

    const [result,setResult] = useState(null);

    const [loading,setLoading] = useState(false);



    async function scanPorts(){


        if(!target){
            return;
        }


        setLoading(true);
        setResult(null);



        try{


            const response = await axios.post(

                "http://127.0.0.1:8000/port-scan",

                {
                    target: target
                }

            );


            console.log(response.data);


            setResult(response.data);



        }

        catch(error){

            console.log(error);

            setResult({

                error:"Scan failed"

            });

        }



        setLoading(false);


    }





    return (

        <div className="scanner">


            <h2>
                🔌 Network Port Scanner
            </h2>



            <input

                className="url-input"

                type="text"

                placeholder="Enter IP or Domain"

                value={target}

                onChange={(e)=>setTarget(e.target.value)}

            />



            <button onClick={scanPorts}>

                Scan Ports

            </button>





            {

            loading &&

            <h3>

                Scanning ports...

            </h3>

            }





            {


            result && !result.error &&

            <div className="result-box">



                <h2>

                    🎯 Target

                </h2>


                <p>

                    {result.target}

                </p>





                <h2>

                    Risk:
                    
                    <span>

                    {" "}{result.risk}

                    </span>

                </h2>




                <h3>

                    Open Ports:
                    {" "}
                    {result.open_ports}

                </h3>





                {


                result.results.length === 0 ?


                (

                    <h3>

                    No open ports detected

                    </h3>

                )


                :


                (


                <div>


                {

                result.results.map((item,index)=>(


                    <div 

                    className="port-card"

                    key={index}

                    >


                        <h3>


                        {

                        item.status==="OPEN"

                        ?

                        "🟢"

                        :

                        "🔴"

                        }


                        Port {item.port}


                        </h3>



                        <p>

                        Service:
                        {" "}
                        {item.service}

                        </p>


                        <p>

                        Status:
                        {" "}
                        {item.status}

                        </p>



                    </div>


                ))

                }


                </div>


                )


                }




            </div>


            }





            {


            result?.error &&


            <div className="result-box">

                ❌ {result.error}

            </div>


            }



        </div>


    )


}



export default PortScanner;