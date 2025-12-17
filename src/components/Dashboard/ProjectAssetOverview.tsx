import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Asset } from "@/utils/dataParser";
import { Database, CheckCircle, Clock, AlertTriangle, Shield, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectAssetOverviewProps {
  assets: Asset[];
}

type RiskLevel = "high" | "medium" | "low" | null;

const ProjectAssetOverview = ({ assets }: ProjectAssetOverviewProps) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<RiskLevel>(null);

  // Calculate metrics based on quantum_vulnerability_score thresholds
  const totalAssets = assets.length;
  const migratedAssets = assets.filter(a => a.current_status === "post-quantum").length;
  const pendingAssets = assets.filter(a => a.current_status !== "post-quantum").length;

  // Quantum vulnerability categories per project memory
  const highRiskAssets = assets.filter(a => a.quantum_vulnerability_score >= 0.7);
  const mediumRiskAssets = assets.filter(a => a.quantum_vulnerability_score >= 0.4 && a.quantum_vulnerability_score < 0.7);
  const lowRiskAssets = assets.filter(a => a.quantum_vulnerability_score < 0.4);

  const highRiskPercent = totalAssets > 0 ? Math.round((highRiskAssets.length / totalAssets) * 100) : 0;
  const mediumRiskPercent = totalAssets > 0 ? Math.round((mediumRiskAssets.length / totalAssets) * 100) : 0;
  const lowRiskPercent = totalAssets > 0 ? Math.round((lowRiskAssets.length / totalAssets) * 100) : 0;

  const pieData = [
    { name: "High Risk", value: highRiskAssets.length, color: "hsl(0, 84%, 60%)", level: "high" as const },
    { name: "Medium Risk", value: mediumRiskAssets.length, color: "hsl(38, 92%, 50%)", level: "medium" as const },
    { name: "Low Risk", value: lowRiskAssets.length, color: "hsl(142, 76%, 36%)", level: "low" as const },
  ];

  const handlePieClick = (data: { level: RiskLevel }) => {
    if (selectedRiskLevel === data.level) {
      setSelectedRiskLevel(null);
    } else {
      setSelectedRiskLevel(data.level);
    }
  };

  const getFilteredAssets = (): Asset[] => {
    if (!selectedRiskLevel) return [];
    switch (selectedRiskLevel) {
      case "high":
        return highRiskAssets;
      case "medium":
        return mediumRiskAssets;
      case "low":
        return lowRiskAssets;
      default:
        return [];
    }
  };

  const filteredAssets = getFilteredAssets();

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 0.7) return "destructive";
    if (score >= 0.4) return "secondary";
    return "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Project Asset Overview</h2>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Assets</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalAssets}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Migrated</span>
            </div>
            <p className="text-2xl font-bold text-success">{migratedAssets}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold text-warning">{pendingAssets}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">High Risk</span>
            </div>
            <p className="text-2xl font-bold text-destructive">{highRiskPercent}%</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">Medium Risk</span>
            </div>
            <p className="text-2xl font-bold text-warning">{mediumRiskPercent}%</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Low Risk</span>
            </div>
            <p className="text-2xl font-bold text-success">{lowRiskPercent}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart and Filtered Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quantum Vulnerability Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">Click a slice to filter assets</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(_, index) => handlePieClick(pieData[index])}
                    cursor="pointer"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={selectedRiskLevel === entry.level ? "hsl(var(--foreground))" : "transparent"}
                        strokeWidth={selectedRiskLevel === entry.level ? 3 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {selectedRiskLevel 
                  ? `${selectedRiskLevel.charAt(0).toUpperCase() + selectedRiskLevel.slice(1)} Risk Assets (${filteredAssets.length})`
                  : "Select a risk level to view assets"}
              </CardTitle>
              {selectedRiskLevel && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedRiskLevel(null)}>
                  Clear Filter
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedRiskLevel && filteredAssets.length > 0 ? (
              <div className="max-h-[280px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Algorithm</TableHead>
                      <TableHead>Vuln. Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.slice(0, 20).map((asset) => (
                      <TableRow key={asset.asset_id}>
                        <TableCell className="font-medium text-xs">{asset.asset_id}</TableCell>
                        <TableCell className="text-xs">{asset.type}</TableCell>
                        <TableCell className="text-xs">{asset.encryption_algorithm}</TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(asset.quantum_vulnerability_score)}>
                            {(asset.quantum_vulnerability_score * 100).toFixed(0)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs capitalize">{asset.current_status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredAssets.length > 20 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Showing 20 of {filteredAssets.length} assets
                  </p>
                )}
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                <p className="text-sm">Click a pie slice to view filtered assets</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ProjectAssetOverview };
