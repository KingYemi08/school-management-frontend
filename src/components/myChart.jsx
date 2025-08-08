import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class MyChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        }
      },
      series: [{
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60]
      }]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar" // or 'line', 'area', 'pie', etc.
              width="300"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyChartComponent;