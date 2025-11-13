import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { parseCSV, getRiskChartData } from "@/utils/dataParser";

export const RiskChart = () => {
  const assets = parseCSV();
  const data = getRiskChartData(assets);
  return (
    <Card className="col-span-2 quantum-glow border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Asset Migration Timeline
          <span className="text-xs text-muted-foreground font-normal">
            (7 Day Trend)
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
              dataKey="date"
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
              dataKey="vulnerable"
              stroke="hsl(var(--destructive))"
              fill="url(#threatGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="migrating"
              stroke="hsl(var(--warning))"
              fill="url(#assetGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="secure"
              stroke="hsl(var(--success))"
              fill="url(#assetGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Vulnerable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Migrating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Secure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
