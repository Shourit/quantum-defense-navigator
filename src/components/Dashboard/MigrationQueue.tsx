import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { parseCSV, getMigrationTasks } from "@/utils/dataParser";
import { simulateMigrationStart } from "@/lib/demoClient";
import { toast } from "sonner";

export const MigrationQueue = () => {
  const assets = parseCSV();
  const [tasks, setTasks] = useState(getMigrationTasks(assets));
  const [startingMigration, setStartingMigration] = useState<string | null>(null);

  // DEMO MODE - Simulated migration start
  const handleStartMigration = async (taskId: string, taskName: string) => {
    setStartingMigration(taskId);
    toast.info(`Starting migration for ${taskName}...`);
    
    // Simulate brief delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Update task status client-side only
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, progress: 5, status: "MIGRATING" as const }
        : task
    ));
    
    setStartingMigration(null);
    toast.success(`Migration started for ${taskName}`, {
      description: "ETA: 10 hours"
    });
  };
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
            <div className="space-y-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleStartMigration(task.id, task.name)}
                disabled={startingMigration === task.id || task.progress > 0}
              >
                {startingMigration === task.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : task.progress > 0 ? (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    ETA: 10 hours
                  </>
                ) : (
                  "Start Migration"
                )}
              </Button>
              {task.progress === 0 && (
                <p className="text-[10px] text-muted-foreground text-center">Demo action - no real changes</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
