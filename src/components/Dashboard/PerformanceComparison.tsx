import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getPerformanceComparison } from "@/utils/chartHelpers";
import { parseCSV } from "@/utils/dataParser";

export const PerformanceComparison = () => {
  const assets = parseCSV();
  const perfData = getPerformanceComparison(assets);
  
  const chartData = [
    { metric: 'Latency (ms)', before: perfData.latency.before, after: perfData.latency.after },
    { metric: 'CPU Usage (%)', before: perfData.cpu.before, after: perfData.cpu.after },
    { metric: 'Memory (MB)', before: Math.round(perfData.memory.before / 10), after: Math.round(perfData.memory.after / 10) },
    { metric: 'Throughput', before: Math.round(perfData.throughput.before / 10), after: Math.round(perfData.throughput.after / 10) },
  ];

  return (
    <Card className="quantum-glow border-primary/20 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Performance Impact Analysis</CardTitle>
        <p className="text-xs text-muted-foreground">Before vs After PQC Migration</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="metric" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="before" fill="hsl(var(--warning))" name="Before" />
            <Bar dataKey="after" fill="hsl(var(--success))" name="After" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
