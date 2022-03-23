import React from 'react';
import Chart from "react-apexcharts";

function CoinCardAreaChart({ series }) {
  /**
   * Format time series data given by CoinGecko into what ApexCharts craves.
   */
  const formattedSeries = () => {
    return [{
      name: 'Price',
      data: series.map(item => ({
        x: item[0], // timestamp
        y: item[1]  // price
      }))
    }]
  };

  /**
   * Return red or green for chart color based on price increase or decrease between first and last data point.
   */
  const getChartColor = () => {
    const isNegative = series[0][1] > series[series.length - 1][1];
    return isNegative
      ? '#B91C1C' // tailwind red-700
      : '#10B981'; // tailwind emerald-700
  };

  /**
   * Formatting and display options for the chart. Gross.
   */
  const options = {
    chart: {
      toolbar: {
        show: false // hide download, etc toolbar
      },
      sparkline: {
        enabled: true // not sure what the hell sparkline is, but this removes all extra padding ¯\_(ツ)_/¯
      },
      width: '100%'
    },
    colors: [getChartColor()],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      show: false // hides background lines
    },
    tooltip: {
      enabled: true,
      x: {
        // formats hover label to: "Mar 7, 9 PM"
        formatter: (val) => new Date(val).toLocaleDateString("en-US", { month: 'short', day: 'numeric', hour: 'numeric' })
      },
      y: {
        // formats hover label to add $ sign to beginning of price
        formatter: (val) => ('$' + val)
      }
    },
    xaxis: {
      axisTicks: {
        show: false // hides little tick marks on axis border
      },
      labels: {
        show: false
      },
      type: 'datetime'
    },
    yaxis: {
      axisTicks: {
        show: false // hides little tick marks on axis border
      },
      labels: {
        show: false
      }
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={formattedSeries()} type="area" height={64}/>
    </div>
  );
}

export default CoinCardAreaChart;