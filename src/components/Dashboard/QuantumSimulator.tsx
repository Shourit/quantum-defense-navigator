import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { parseCSV, getQuantumSimulationData } from "@/utils/dataParser";

export const QuantumSimulator = () => {
  const assets = parseCSV();
  const results = getQuantumSimulationData(assets);
  return (
    <Card className="col-span-1 quantum-glow border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary quantum-text-glow" />
          Quantum Attack Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive">
            Shor's Algorithm simulation active
          </p>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => {
            const vulnerability = Math.round(result.breakTime);
            const getSeverity = (time: number) => {
              if (time >= 90) return "critical";
              if (time >= 70) return "high";
              if (time >= 50) return "medium";
              return "low";
            };
            const severity = getSeverity(vulnerability);
            
            return (
              <div
                key={index}
                className="space-y-2 p-3 rounded-lg bg-card/50 border border-border"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">{result.algorithm}</span>
                  <Badge
                    variant={
                      severity === "critical"
                        ? "destructive"
                        : severity === "high"
                        ? "warning"
                        : severity === "medium"
                        ? "secondary"
                        : "success"
                    }
                    className="text-xs"
                  >
                    {severity}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Vulnerability</span>
                    <span
                      className={
                        vulnerability > 80
                          ? "text-destructive"
                          : vulnerability > 50
                          ? "text-warning"
                          : "text-success"
                      }
                    >
                      {vulnerability}%
                    </span>
                  </div>
                  <Progress value={vulnerability} className="h-1.5" />
                </div>
                <div className="text-xs text-muted-foreground">
                  Confidence: <span className="text-foreground">{result.confidence.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          Run New Simulation
        </Button>
      </CardContent>
    </Card>
  );
};
