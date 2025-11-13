import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SimulationResult {
  algorithm: string;
  vulnerability: number;
  breakTime: string;
  severity: "critical" | "high" | "medium" | "low";
}

const results: SimulationResult[] = [
  {
    algorithm: "RSA-2048",
    vulnerability: 95,
    breakTime: "8 hours",
    severity: "critical",
  },
  {
    algorithm: "ECDSA P-256",
    vulnerability: 87,
    breakTime: "2 days",
    severity: "high",
  },
  {
    algorithm: "RSA-3072",
    vulnerability: 78,
    breakTime: "1 week",
    severity: "high",
  },
  {
    algorithm: "Kyber-768",
    vulnerability: 12,
    breakTime: ">1000 years",
    severity: "low",
  },
];

export const QuantumSimulator = () => {
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
          {results.map((result, index) => (
            <div
              key={index}
              className="space-y-2 p-3 rounded-lg bg-card/50 border border-border"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">{result.algorithm}</span>
                <Badge
                  variant={
                    result.severity === "critical"
                      ? "destructive"
                      : result.severity === "high"
                      ? "warning"
                      : result.severity === "medium"
                      ? "secondary"
                      : "success"
                  }
                  className="text-xs"
                >
                  {result.severity}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Vulnerability</span>
                  <span
                    className={
                      result.vulnerability > 80
                        ? "text-destructive"
                        : result.vulnerability > 50
                        ? "text-warning"
                        : "text-success"
                    }
                  >
                    {result.vulnerability}%
                  </span>
                </div>
                <Progress value={result.vulnerability} className="h-1.5" />
              </div>
              <div className="text-xs text-muted-foreground">
                Est. break time: <span className="text-foreground">{result.breakTime}</span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          Run New Simulation
        </Button>
      </CardContent>
    </Card>
  );
};
