import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { parseCSV } from "@/utils/dataParser";
import { useMemo } from "react";

interface RiskItem {
  rank: number;
  riskLabel: string;
  score: number;
  explanation: string;
  actions: string[];
  evidenceSnippet: string;
}

export const RightSidebarRisks = () => {
  const topRisks = useMemo(() => {
    try {
      const assets = parseCSV();
      
      // Calculate composite risk score for each asset
      const assetsWithRisk = assets.map(asset => {
        // Normalize quantum_vulnerability_score (0-100) and quantum_risk_score (0-1)
        const vulnNormalized = asset.quantum_vulnerability_score / 100;
        const riskNormalized = asset.quantum_risk_score;
        
        // Composite score: 60% vulnerability, 40% risk score
        const compositeScore = Math.min(100, Math.round((vulnNormalized * 0.6 + riskNormalized * 0.4) * 100));
        
        return {
          ...asset,
          compositeScore
        };
      });

      // Sort by composite score descending and take top 5
      const sortedRisks = assetsWithRisk
        .sort((a, b) => b.compositeScore - a.compositeScore)
        .slice(0, 5);

      // Map to RiskItem format
      return sortedRisks.map((asset, idx) => {
        const actions: string[] = [];
        
        if (asset.current_status === "legacy") {
          actions.push(`Migrate ${asset.encryption_algorithm} to post-quantum algorithm`);
        }
        if (asset.cert_valid === "expired") {
          actions.push("Renew expired certificate immediately");
        }
        if (asset.automation_status === "manual") {
          actions.push("Enable automation for faster migration");
        }
        if (asset.quantum_vulnerability_score > 90) {
          actions.push("Prioritize as critical vulnerability");
        }
        if (actions.length === 0) {
          actions.push("Monitor and maintain current security posture");
        }

        const explanation = `${asset.type} using ${asset.encryption_algorithm} with ${asset.key_length}-bit keys poses ${
          asset.criticality
        } risk. Estimated ${asset.estimated_time_to_qsafe} days to quantum-safe state.`;

        return {
          rank: idx + 1,
          riskLabel: `${asset.asset_id} - ${asset.type}`,
          score: asset.compositeScore,
          explanation,
          actions: actions.slice(0, 3),
          evidenceSnippet: `Vulnerability: ${asset.quantum_vulnerability_score}%, Risk: ${(asset.quantum_risk_score * 100).toFixed(0)}%, Status: ${asset.current_status}`
        };
      });
    } catch (error) {
      console.error("Error processing CSV:", error);
      // Return fallback dummy data
      return [
        {
          rank: 1,
          riskLabel: "vpn-001 - VPN Endpoint",
          score: 95,
          explanation: "Legacy RSA-2048 encryption poses critical quantum vulnerability requiring urgent migration.",
          actions: ["Migrate to Kyber-1024", "Enable automation", "Update within 48 hours"],
          evidenceSnippet: "Vulnerability: 95%, Risk: 87%, Status: legacy"
        },
        {
          rank: 2,
          riskLabel: "ssh-key-024 - SSH Key",
          score: 93,
          explanation: "RSA-4096 keys with high usage frequency need immediate attention.",
          actions: ["Replace with Dilithium-2", "Rotate keys", "Monitor usage"],
          evidenceSnippet: "Vulnerability: 98%, Risk: 97%, Status: legacy"
        },
        {
          rank: 3,
          riskLabel: "tls-cert-002 - TLS Certificate",
          score: 68,
          explanation: "Expired ECDSA-256 certificate with medium quantum risk.",
          actions: ["Renew certificate", "Upgrade to CRYSTALS-Kyber", "Enable auto-renewal"],
          evidenceSnippet: "Vulnerability: 68%, Risk: 63%, Status: expired"
        },
        {
          rank: 4,
          riskLabel: "vpn-021 - VPN Endpoint",
          score: 91,
          explanation: "ECC-384 endpoint with urgent migration priority due to high exposure.",
          actions: ["Migrate to post-quantum", "Schedule downtime", "Test compatibility"],
          evidenceSnippet: "Vulnerability: 93%, Risk: 85%, Status: legacy"
        },
        {
          rank: 5,
          riskLabel: "ssh-key-019 - SSH Key",
          score: 92,
          explanation: "High-usage RSA-4096 key requiring coordinated migration effort.",
          actions: ["Plan migration window", "Update all clients", "Verify compatibility"],
          evidenceSnippet: "Vulnerability: 96%, Risk: 91%, Status: legacy"
        }
      ];
    }
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 90) return "text-destructive";
    if (score >= 70) return "text-orange-500";
    if (score >= 50) return "text-yellow-500";
    return "text-success";
  };

  const getRiskBadgeVariant = (score: number): "destructive" | "default" | "secondary" => {
    if (score >= 90) return "destructive";
    if (score >= 70) return "default";
    return "secondary";
  };

  return (
    <Card className="quantum-glow h-fit sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Top 5 High Risks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topRisks.map((risk) => (
          <Card key={risk.rank} className="border-l-4 border-l-primary/50">
            <CardContent className="pt-4 space-y-2">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      #{risk.rank}
                    </span>
                    <h4 className="text-sm font-semibold line-clamp-1">
                      {risk.riskLabel}
                    </h4>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(risk.score)} className="shrink-0">
                  <span className={getRiskColor(risk.score)}>{risk.score}</span>
                </Badge>
              </div>

              {/* Explanation */}
              <p className="text-xs text-muted-foreground">{risk.explanation}</p>

              {/* Actions */}
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Recommended Actions:
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5 pl-4">
                  {risk.actions.map((action, idx) => (
                    <li key={idx} className="list-disc">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidence */}
              <div className="pt-2 border-t">
                <p className="text-xs flex items-start gap-1">
                  <Clock className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">{risk.evidenceSnippet}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
