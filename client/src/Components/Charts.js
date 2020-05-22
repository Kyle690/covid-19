import React,{useRef, useEffect, useState} from "react";
import Chart from 'chart.js';

export const LineChart=({labels,datasets})=>{
    const chartConfig={
        type:'line',
        data:{
            labels,
            datasets
        },
        options:{
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    };
    const [chartInstance, setChartInstance] = useState(null);


    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance= new Chart(chartContainer.current, chartConfig);
            //setChartInstance(newChartInstance);
        }


    }, [chartContainer,datasets]);

    return (
        <div>
            <canvas ref={chartContainer}/>
        </div>

    );

}

export const BarChart=({labels,datasets})=>{
    const chartConfig={
        type:'bar',
        data:{
            labels,
            datasets
        },
        options:{
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    }

    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            new Chart(chartContainer.current, chartConfig);
        }
    }, [chartContainer]);

    return (
        <div>
            <canvas ref={chartContainer}/>
        </div>

    );
}
