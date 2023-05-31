import * as d3 from 'd3';
import React, {useEffect, useState, memo} from 'react';

const Histogram = () => {
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState([]);
   let drawChart ;

   useEffect(()=>{
      if (data.length > 0) {
         drawChart();
      } else {
         getURLData();
      }
   },[data, drawChart])

   const getURLData = async () => {
      setLoading(true)
      const res = await fetch('http://localhost:8080/api/v1/information')
      const data = await res.json();

      let countryFreq = {};
      data.forEach((item) => {
         if(item.country !== ''){
            if(countryFreq[item.country] > 0){
               countryFreq[item.country] = countryFreq[item.country] + 1;
            } else {
               countryFreq[item.country] = 1;
            }
         }
      })

      const countryFreqArray = Object.keys(countryFreq).map((key) => {
         return {'country': key, 'freq': countryFreq[key] }
      })

      setData(countryFreqArray.sort((x, y) => {return x.freq - y.freq}))
      setLoading(false)
   }

   drawChart = () => {
      const margin = {top: 70, right: 50, bottom: 70, left: 50};
      const width = 970;
      const height = 400;

      const svg = d3.select("#histogram")
      .append('svg')
		  .style("background-color", "d3d3d3")
		  .attr("width", width)
		  .attr("height", height)
		  .append('g')
		  .attr("transform",`translate(0,-${margin.bottom-10})`);
      
      // create the x axis scale
      const xScale = d3.scaleBand()
         .domain(data.map(d => d.country))
         .rangeRound([margin.left, width - margin.right])
         .padding(0.1)

      // create the y axis scale
      const yScale = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.freq)])
         .range([height - margin.bottom, margin.top])

      // create scale color
      const barColors = d3.scaleLinear()
         .domain([0,d3.max(data, d => d.freq)])
         .range(["blue","red"])

      // set x axis
      // title the axis
      svg.append("g")
      .attr('transform', `translate(0,${height-margin.bottom})`)
         .call(d3.axisBottom(xScale))
         .selectAll("text")
         .style("text-anchor", "end")
         .attr("dx", "-.8em")
         .attr("dy", ".15em")
         .attr("transform", "rotate(-65)");

      // set y axis
      svg.append("g")
      .attr('transform', `translate(${margin.left},0)`)
         .call(d3.axisLeft(yScale))
         .selectAll("rect")
         .data(data)
         .enter().append("rect")
            .attr('x', d => xScale(d.country))
            .attr('y', d => yScale(d.freq))
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(0) - yScale(d.freq))
            .style("padding", "2px")
            .style("margin", "1px")
            .style("width", d => `${d * 10}px`)
            .attr("fill", function(d) {return barColors(d.freq)})
            .attr("stroke", "black")
            .attr("stroke-width", 1)
   }

   /*useEffect(() => {
        const fetchData= async()=> {
            const url = 'http://localhost:8080/api/v1/information'
            const country = []
            const countryName = []
  
           await fetch(url).then((data)=> {
                const res = data.json();
                return res
           }).then((res) => {
            let nameStringFreq = {};
            res.forEach((item) => {
                if(item.country) {
                    if(item.country !== ''){
                        countryName.push(item.country);
                        if(nameStringFreq[item.country] > 0){
                            country.push(nameStringFreq[item.country] = nameStringFreq[item.country] + 1);
                        } else {
                            country.push(nameStringFreq[item.country] = 1);
                        }
                    }
                }
            })

            setData({
                labels:countryName,
                datasets: [
                    {
                        label: 'Country',
                        data:country,
                        borderColor: 'rgb(53, 262, 235)',
                        backgroundColor: 'rgba(53, 262, 235, 0.5)',
                    },
                 ],
            })
            }).catch(e => {
                console.log("error", e)
            })
        }
  
        fetchData();
     }, [])*/

   return (
      <div>
         <h1 className="text-2xl">Most Repeated Country Visualization</h1>
         {
            loading ? 
            <div class="text-center">
               <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                     <span class="sr-only">Loading...</span>
                  </div>
               </div> 
            :
            <div id="histogram"></div>
         }
      </div>
   );
};

export default memo(Histogram);