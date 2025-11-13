import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseCSV, getRiskLevel, getStatusFromLegacy } from "@/utils/dataParser";

const getRiskColor = (risk: "critical" | "high" | "medium" | "low") => {
  switch (risk) {
    case "critical":
      return "destructive";
    case "high":
      return "warning";
    case "medium":
      return "secondary";
    case "low":
      return "success";
  }
};

const getStatusColor = (status: "vulnerable" | "migrating" | "secure") => {
  switch (status) {
    case "vulnerable":
      return "destructive";
    case "migrating":
      return "warning";
    case "secure":
      return "success";
  }
};

export const AssetTable = () => {
  const allAssets = parseCSV();
  const displayAssets = allAssets.slice(0, 12);
  return (
    <Card className="col-span-3 quantum-glow border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Cryptographic Asset Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Asset Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Algorithm</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAssets.map((asset) => {
              const risk = getRiskLevel(asset.quantum_risk_score);
              const status = getStatusFromLegacy(asset.current_status);
              
              return (
                <TableRow key={asset.asset_id} className="border-border">
                  <TableCell className="font-medium">{asset.asset_id}</TableCell>
                  <TableCell className="text-muted-foreground">{asset.type}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.encryption_algorithm}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(risk)} className="uppercase">
                      {risk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(status)} className="uppercase">
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
