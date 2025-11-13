import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, CheckCircle2 } from "lucide-react";

interface MigrationTask {
  id: string;
  asset: string;
  priority: number;
  progress: number;
  aiRecommendation: string;
  status: "pending" | "in-progress" | "completed";
}

const tasks: MigrationTask[] = [
  {
    id: "1",
    asset: "VPN Gateway Primary",
    priority: 1,
    progress: 0,
    aiRecommendation: "Immediate migration to Kyber-1024 recommended",
    status: "pending",
  },
  {
    id: "2",
    asset: "PKI Root CA",
    priority: 2,
    progress: 0,
    aiRecommendation: "Critical path - schedule maintenance window",
    status: "pending",
  },
  {
    id: "3",
    asset: "TLS Certificate (*.company.com)",
    priority: 3,
    progress: 65,
    aiRecommendation: "Migration in progress - ETA 2 hours",
    status: "in-progress",
  },
  {
    id: "4",
    asset: "SSH Key Infrastructure",
    priority: 4,
    progress: 0,
    aiRecommendation: "Schedule after PKI migration",
    status: "pending",
  },
];

export const MigrationQueue = () => {
  return (
    <Card className="col-span-2 quantum-glow border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Migration Orchestrator
          </CardTitle>
          <Badge variant="outline" className="text-primary border-primary">
            4 Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg bg-card/50 border border-border space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                    {task.priority}
                  </Badge>
                  <h4 className="font-semibold text-sm">{task.asset}</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {task.aiRecommendation}
                </p>
              </div>
              {task.status === "in-progress" ? (
                <Clock className="h-4 w-4 text-warning animate-pulse" />
              ) : task.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : null}
            </div>
            {task.progress > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}
            {task.status === "pending" && (
              <Button variant="outline" size="sm" className="w-full">
                Start Migration
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
