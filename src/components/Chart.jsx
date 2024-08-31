import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
// import { chartData } from "../utils/data";
import { useSelector } from "react-redux";

function Chart() {
  const tasks = useSelector((state) => state.task.tasks);
  const activeTasks = tasks.filter((task) => {
    return task.isTrashed === false;
  });

  let count = {
    high: 0,
    medium: 0,
    normal: 0,
  };

  let totalTasks = 0;
  activeTasks.forEach((task) => {
    totalTasks++;
    if (task.priority === "high") {
      count.high++;
    } else if (task.priority === "medium") {
      count.medium++;
    } else {
      count.normal++;
    }
  });

  const chartData = [
    {
      name: "High",
      total: count.high || 0,
      fill: "rgb(220 38 38)",
    },
    {
      name: "Medium",
      total: count.medium || 0,
      fill: "rgb(202 138 4)",
    },
    {
      name: "Low",
      total: count.normal || 0,
      fill: "rgb(22 163 74)",
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#666" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
