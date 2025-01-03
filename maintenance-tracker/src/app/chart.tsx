import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Operational", value: 10 },
  { name: "Down", value: 2 },
  { name: "Maintenance", value: 3 },
  { name: "Retired", value: 1 },
];

export default function Dashboard() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={["#4caf50", "#ff5722", "#ffc107", "#9e9e9e"][index]} />
        ))}
      </Pie>
    </PieChart>
  );
}
