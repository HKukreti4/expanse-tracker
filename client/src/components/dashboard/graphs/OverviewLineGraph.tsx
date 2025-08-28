import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
const OverviewLineGraphs = ({ data }: GraphProps) => {
  return (
    <ResponsiveContainer height="100%" className="w-auto ">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" className="capitalize" />
        <YAxis dataKey="totalAmount" />
        <Tooltip labelClassName="capitalize" />
        <Legend formatter={(value) => value.toUpperCase()} />
        <Line
          dataKey="totalAmount"
          type="monotone"
          stroke="#D08700"
          name="Amount"
          strokeWidth={4}
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OverviewLineGraphs;
