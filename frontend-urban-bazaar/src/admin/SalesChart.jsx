import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function SalesChart({ orders }) {
  // Prepare data for the chart
  const dates = orders.map(order => new Date(order.order_date).toLocaleDateString());
  const sales = orders.map(order => order.order_total);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Sales (Ksh)",
        data: sales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h2>Sales Report</h2>
      <Line data={data} />
    </div>
  );
}

export default SalesChart;
