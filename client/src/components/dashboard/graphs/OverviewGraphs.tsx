import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface graphData {
  totalAmount: number;
  date: string;
}
type GraphProps = {
  data: graphData[];
};
const colors = ["#D08700", "#f1cf54"];
const OverviewGraphs = ({ data }: GraphProps) => {
  return (
    <ResponsiveContainer height="100%" className="w-auto">
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" className="capitalize" />
        <YAxis dataKey="totalAmount" />
        <Tooltip labelClassName="capitalize" />
        <Legend formatter={(value) => value.toUpperCase()} />
        <Bar
          dataKey="totalAmount"
          fill="#D08700"
          name="Amount"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OverviewGraphs;
