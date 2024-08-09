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

// Register the required components
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
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl h-96 mt-8 bg-white rounded-lg shadow-md p-6 mb-20">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Sales Report</h2>
      <div className="h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesChart;
