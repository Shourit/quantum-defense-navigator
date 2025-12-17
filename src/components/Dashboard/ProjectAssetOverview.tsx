import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Asset } from "@/utils/dataParser";
import { Database, CheckCircle, Clock, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectAssetOverviewProps {
  assets: Asset[];
}

type RiskLevel = "high" | "medium" | "low" | null;

const ProjectAssetOverview = ({ assets }: ProjectAssetOverviewProps) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<RiskLevel>(null);

  // Calculate metrics based on quantum_risk_score thresholds (0-1 scale)
  const totalAssets = assets.length;
  const migratedAssets = assets.filter(a => a.current_status === "post-quantum").length;
  const pendingAssets = assets.filter(a => a.current_status !== "post-quantum").length;

  // Quantum risk categories - using quantum_risk_score (0-1 scale)
  const highRiskAssets = assets.filter(a => a.quantum_risk_score >= 0.7);
  const mediumRiskAssets = assets.filter(a => a.quantum_risk_score >= 0.4 && a.quantum_risk_score < 0.7);
  const lowRiskAssets = assets.filter(a => a.quantum_risk_score < 0.4);

  const highRiskPercent = totalAssets > 0 ? Math.round((highRiskAssets.length / totalAssets) * 100) : 0;
  const mediumRiskPercent = totalAssets > 0 ? Math.round((mediumRiskAssets.length / totalAssets) * 100) : 0;
  const lowRiskPercent = totalAssets > 0 ? Math.round((lowRiskAssets.length / totalAssets) * 100) : 0;

  const pieData = [
    { name: "High Risk", value: highRiskAssets.length, percent: highRiskPercent, color: "hsl(0, 84%, 60%)", level: "high" as const },
    { name: "Medium Risk", value: mediumRiskAssets.length, percent: mediumRiskPercent, color: "hsl(38, 92%, 50%)", level: "medium" as const },
    { name: "Low Risk", value: lowRiskAssets.length, percent: lowRiskPercent, color: "hsl(142, 76%, 36%)", level: "low" as const },
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
      {/* Executive Hero Section with elevation */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-card via-card to-card/80 border border-primary/20 shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Project Asset Overview</h2>
          <span className="text-xs text-muted-foreground ml-2">Executive Summary</span>
        </div>

        {/* Summary Metrics - Simplified to avoid repetition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Total Assets in Scope</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{totalAssets}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Migrated to Post-Quantum</span>
              </div>
              <p className="text-3xl font-bold text-success">{migratedAssets}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-xs text-muted-foreground">Pending Migration</span>
              </div>
              <p className="text-3xl font-bold text-warning">{pendingAssets}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart with Risk Definition Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <Card className="bg-card/50 border-border lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quantum Vulnerability Distribution</CardTitle>
              <p className="text-xs text-muted-foreground">Click a slice to filter assets</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      onClick={(_, index) => handlePieClick(pieData[index])}
                      cursor="pointer"
                      filter="url(#glow)"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={selectedRiskLevel === entry.level ? "hsl(var(--foreground))" : "transparent"}
                          strokeWidth={selectedRiskLevel === entry.level ? 3 : 0}
                          style={{
                            filter: selectedRiskLevel === entry.level ? "brightness(1.2)" : "none"
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => {
                        const item = pieData.find(d => d.name === name);
                        return [`${value} assets (${item?.percent}%)`, name];
                      }}
                    />
                    <Legend 
                      formatter={(value) => {
                        const item = pieData.find(d => d.name === value);
                        return `${value}: ${item?.percent}%`;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Definition Panel */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Quantum Risk Classification</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="w-3 h-3 rounded-full bg-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">High Risk</p>
                    <p className="text-xs text-muted-foreground">quantum_risk_score ≥ 0.7</p>
                    <p className="text-xs text-destructive mt-1">{highRiskAssets.length} assets ({highRiskPercent}%)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="w-3 h-3 rounded-full bg-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Medium Risk</p>
                    <p className="text-xs text-muted-foreground">0.4 ≤ quantum_risk_score &lt; 0.7</p>
                    <p className="text-xs text-warning mt-1">{mediumRiskAssets.length} assets ({mediumRiskPercent}%)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="w-3 h-3 rounded-full bg-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Low Risk</p>
                    <p className="text-xs text-muted-foreground">quantum_risk_score &lt; 0.4</p>
                    <p className="text-xs text-success mt-1">{lowRiskAssets.length} assets ({lowRiskPercent}%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtered Assets Table */}
          <Card className="bg-card/50 border-border">
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
                        <TableHead>Risk Score</TableHead>
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
                            <Badge variant={getRiskBadgeVariant(asset.quantum_risk_score)}>
                              {(asset.quantum_risk_score * 100).toFixed(0)}%
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
    </div>
  );
};

export { ProjectAssetOverview };
