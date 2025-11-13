import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { parseCSV, getMigrationTasks } from "@/utils/dataParser";

export const MigrationQueue = () => {
  const assets = parseCSV();
  const tasks = getMigrationTasks(assets);
  return (
    <Card className="col-span-2 quantum-glow border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Migration Orchestrator
          </CardTitle>
          <Badge variant="outline" className="text-primary border-primary">
            {tasks.length} Pending
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
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={task.priority === "critical" ? "destructive" : "warning"} className="text-xs">
                    {task.priority}
                  </Badge>
                  <h4 className="font-semibold text-sm">{task.name}</h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{task.currentAlgorithm}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="font-mono text-success">{task.targetAlgorithm}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {task.type} • Est. {task.estimatedTime}
                </p>
              </div>
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
            <Button variant="outline" size="sm" className="w-full">
              Start Migration
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
