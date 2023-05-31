import React , { useState, useEffect, memo } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
   plugins: {
     title: {
       display: true,
       text: 'Chart.js Bar Chart - Stacked'
     },
   },
   responsive: true,
   scales: {
     x: {
       stacked: true,
     },
     y: {
       stacked: true
     }
   }
 }


const Topics = () => {
   const [data, setData] = useState({
      labels:[],
      datasets: [
          {
              label: 'Country',
              data: [],
              borderColor: 'rgb(53, 262, 235)',
              backgroundColor: 'rgba(53, 262, 235, 0.5)',
          },
      ],
   });

   useEffect(() => {
      fetch('http://localhost:8080/api/v1/information')
      .then(res => res.json())
      .then(result => {
          let countryFreq = {};
          const country = [];
          result.forEach((item) => {
            if(item.country !== ''){
               if(countryFreq[item.country] > 0){
                  countryFreq[item.country] = countryFreq[item.country] + 1;
               } else {
                  countryFreq[item.country] = 1;
               }
            }
            if(item.country !== '' && item.end_year !== '' && item.start_year !== ''){
               country.push({
                  country: item.country,
                  start: item.start_year,
                  end: item.end_year
               })
            }
          })

          console.log(country.map((p) => console.log(p.start, p.end)))

          setData({
              labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                  {
                      label: 'Count',
                      data:country.map((p) => Number(-p.start, p.end)),
                      borderColor: [
                          'rgb(54, 162, 235)',
                          'rgb(153, 102, 255)',
                          'rgb(201, 203, 207)'
                      ],
                      backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(201, 203, 207, 0.2)'
                      ],
                  },
               ],
          })
      })
  },[])

   return (
      <div>
         <h2 className="text-2xl">Topic</h2>
         <Bar data={data} options={options}/>
      </div>
   );
};

export default memo(Topics);