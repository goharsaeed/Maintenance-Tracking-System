import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  const pieData = [
    { name: "Operational", value: 10 },
    { name: "Down", value: 5 },
  ];

  const barData = [
    { department: "Machining", hours: 50 },
    { department: "Assembly", hours: 30 },
  ];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={150}>
          {pieData.map((entry, index) => (
            <Cell key={index} fill={entry.name === "Operational" ? "green" : "red"} />
          ))}
        </Pie>
      </PieChart>

      <BarChart width={600} height={300} data={barData}>
        <XAxis dataKey="department" />
        <YAxis />
        <Bar dataKey="hours" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
