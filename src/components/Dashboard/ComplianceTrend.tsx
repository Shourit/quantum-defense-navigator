import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getComplianceTrend } from "@/utils/chartHelpers";
import { parseCSV } from "@/utils/dataParser";

export const ComplianceTrend = () => {
  const assets = parseCSV();
  const data = getComplianceTrend(assets);

  return (
    <Card className="quantum-glow border-primary/20 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Security Compliance Trend</CardTitle>
        <p className="text-xs text-muted-foreground">NIST PQC Standards & Encryption Strength</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
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
            <Line 
              type="monotone" 
              dataKey="compliance" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="Compliance Score"
            />
            <Line 
              type="monotone" 
              dataKey="strength" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Encryption Strength"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
