import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { time: "00:00", threat: 45, assets: 82 },
  { time: "04:00", threat: 52, assets: 78 },
  { time: "08:00", threat: 61, assets: 75 },
  { time: "12:00", threat: 58, assets: 80 },
  { time: "16:00", threat: 67, assets: 73 },
  { time: "20:00", threat: 71, assets: 70 },
  { time: "24:00", threat: 75, assets: 68 },
];

export const RiskChart = () => {
  return (
    <Card className="col-span-2 quantum-glow border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Quantum Threat Timeline
          <span className="text-xs text-muted-foreground font-normal">
            (24 Hour Window)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Area
              type="monotone"
              dataKey="threat"
              stroke="hsl(var(--destructive))"
              fill="url(#threatGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="assets"
              stroke="hsl(var(--primary))"
              fill="url(#assetGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Threat Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Secure Assets</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
