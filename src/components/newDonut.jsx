import React from 'react';
import Chart from 'react-apexcharts';

const DonutChartComponent = () => {
  const series = [44, 55, 41, 17, 15]; // Data for the donut chart segments
  const options = {
    labels: ['Maths', 'English', 'Chemistry', 'Biology', 'Physics'], // Labels for each segment
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="donut-chart-container">
      <Chart options={options} series={series} type="donut" width="300" />
    </div>
  );
};

export default DonutChartComponent;