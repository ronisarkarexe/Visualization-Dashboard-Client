import React , { useState, useEffect, memo } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   ArcElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

import { Pie  } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

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
        text: 'Count Number Of Country With Bar Chart',
      },
    },
};



const PieChart = () => {
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
            result.forEach((item) => {
            if(item.country !== ''){
                if(countryFreq[item.country] > 0){
                    countryFreq[item.country] = countryFreq[item.country] + 1;
                } else {
                    countryFreq[item.country] = 1;
                    }
                }
            })
            setData({
                labels:Object.keys(countryFreq),
                datasets: [
                    {
                        label: 'Count',
                        data:Object.values(countryFreq),
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
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
         <Pie data={data} options={options}/>
      </div>
   );
};

export default memo(PieChart);