import React, { useState }  from 'react';
import BarChart from "./BarChart"
import DoughnutChart from "./DoughnutChart"
import PieChart from "./PieChart"

const Dashboard = () => {

   const [toggle, setToggle] = useState(true)

   return (
      <div>
         <h2 className="text-2xl">Dashboard</h2>
         <BarChart/>
         <div>
            <hr></hr>
            <button onClick={()=>setToggle(!toggle)} className="btn btn-info mt-4">Toggle</button>
         </div>
         {
            toggle ? <DoughnutChart/> : <PieChart/>
         }
      </div>
   );
};

export default Dashboard;