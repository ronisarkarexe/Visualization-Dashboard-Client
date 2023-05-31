import React , { useState, useEffect, memo } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   Title,
   LineElement,
   Tooltip,
   Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

const options = {
   indexAxis: 'x',
   elements: {
     bar: {
       borderWidth: 2,
     },
   },
   responsive: true,
   plugins: {
     legend: {
       position: 'top',
     },
     title: {
       display: true,
       text: 'Count Intensity Of Country',
     },
   },
};

const AnalyticsData = () => {
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      labels:[],
      datasets: [
         {
            label: 'Intensity',
            data: [],
            borderColor: 'rgb(53, 262, 235)',
            backgroundColor: 'rgba(53, 262, 235, 0.5)',
         },
         {
            label: 'relevance',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
         },
         {
            label: 'likelihood',
            data: [],
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
         },
         {
            label: [],
            data: [],
            borderColor: 'rgb(255, 119, 124)',
            backgroundColor: 'rgba(255, 159, 64, 0.4)',
         },
      ],
  });

  useEffect(()=>{
   setLoading(true)
   fetch('http://localhost:8080/api/v1/information')
   .then(res => res.json())
   .then(result => {
      console.log("result", result)
      const nameIntensity = {};
      const nameRelevance = {};
      const nameLikelihood = {};
      const nameRegion = {}

      result.forEach(key => {
         if(key.country !== ''){
            if(nameIntensity[key.country] > 0){
               nameIntensity[key.country] = nameIntensity[key.country] + parseInt(key.intensity);
            } else {
               nameIntensity[key.country] = key.intensity;
            }
         }
         if(key.country !== ''){
            if(nameRelevance[key.country] > 0){
               nameRelevance[key.country] = nameRelevance[key.country] + parseInt(key.relevance);
            } else {
               nameRelevance[key.country] = key.relevance;
            }
         }
         if(key.country !== ''){
            if(nameLikelihood[key.country] > 0){
               nameLikelihood[key.country] = nameLikelihood[key.country] + parseInt(key.likelihood);
            } else {
               nameLikelihood[key.country] = key.likelihood;
            }
         }
         if(key.country !== ''){
            if(nameRegion[key.region] > 0){
               nameRegion[key.region] = nameRegion[key.region] + 1;
            } else {
               nameRegion[key.region] = 1;
            }
         }
      })

      console.log("n", nameRegion)

      setData({
         labels:Object.keys(nameIntensity),
         datasets: [
             {
                 label: 'Intensity',
                 data:Object.values(nameIntensity),
             },
             {
                 label: 'relevance',
                 data:Object.values(nameRelevance),
             },
             {
                 label: 'likelihood',
                 data:Object.values(nameLikelihood),
             },
             {
                 label: 'region',
                 data:Object.values(nameRegion),
             },
          ],
     })
     setLoading(false)
   })
},[])
  
    

   return (
      <div className="mt-3">
         <Line data={data} options={options} />
      </div>
   );
};

export default memo(AnalyticsData);