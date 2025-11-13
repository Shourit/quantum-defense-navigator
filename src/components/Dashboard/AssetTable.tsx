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

interface Asset {
  id: string;
  name: string;
  type: string;
  risk: "critical" | "high" | "medium" | "low";
  status: "vulnerable" | "migrating" | "secure";
  algorithm: string;
}

const assets: Asset[] = [
  {
    id: "1",
    name: "VPN Gateway Primary",
    type: "Network",
    risk: "critical",
    status: "vulnerable",
    algorithm: "RSA-2048",
  },
  {
    id: "2",
    name: "TLS Certificate (*.company.com)",
    type: "Certificate",
    risk: "high",
    status: "migrating",
    algorithm: "ECDSA P-256",
  },
  {
    id: "3",
    name: "SSH Key Infrastructure",
    type: "Authentication",
    risk: "high",
    status: "vulnerable",
    algorithm: "RSA-3072",
  },
  {
    id: "4",
    name: "PKI Root CA",
    type: "Certificate",
    risk: "critical",
    status: "vulnerable",
    algorithm: "RSA-2048",
  },
  {
    id: "5",
    name: "API Gateway Cert",
    type: "Certificate",
    risk: "medium",
    status: "secure",
    algorithm: "Kyber-768",
  },
];

const getRiskColor = (risk: Asset["risk"]) => {
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

const getStatusColor = (status: Asset["status"]) => {
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
            {assets.map((asset) => (
              <TableRow key={asset.id} className="border-border">
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell className="text-muted-foreground">{asset.type}</TableCell>
                <TableCell className="font-mono text-sm">{asset.algorithm}</TableCell>
                <TableCell>
                  <Badge variant={getRiskColor(asset.risk)} className="uppercase">
                    {asset.risk}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(asset.status)} className="uppercase">
                    {asset.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
