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
import { PieChart, Pie, Sector, Cell } from "recharts";
// import { chartData } from "../utils/data";
import { useSelector } from "react-redux";

export function PriorityChart() {
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

export function DonutChart() {
  const tasks = useSelector((state) => state.task.tasks);
  const activeTasks = tasks.filter((task) => {
    return task.isTrashed === false;
  });
  let completedTasks = activeTasks.filter((task) => task.stage === "completed");
  let inProgressTasks = activeTasks.filter(
    (task) => task.stage === "in progress"
  );
  let todoTasks = activeTasks.filter((task) => task.stage === "todo");

  const data = [
    { name: "Completed Tasks", value: completedTasks.length },
    { name: "Todo Tasks", value: todoTasks.length },

    { name: "In Progress Task", value: inProgressTasks.length },
  ];
  const COLORS = ["#00ae11", "#3e82db", " rgb(216, 159, 33)"];

  return (
    <ResponsiveContainer minWidth={260} width={400} height={260}>
      <PieChart width={300} height={260}>
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={8}
          dataKey="value"
          nameKey="name"
          // label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        {/* <Pie
    data={data}
    cx={420}
    cy={200}
    startAngle={180}
    endAngle={0}
    innerRadius={60}
    outerRadius={80}
    fill="#8884d8"
    paddingAngle={5}
    dataKey="value"
  >
    {data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie> */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
