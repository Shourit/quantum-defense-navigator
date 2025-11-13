import { Shield, Activity, Database, AlertTriangle, TrendingUp, Lock } from "lucide-react";
import { MetricsCard } from "@/components/Dashboard/MetricsCard";
import { RiskChart } from "@/components/Dashboard/RiskChart";
import { AssetTable } from "@/components/Dashboard/AssetTable";
import { MigrationQueue } from "@/components/Dashboard/MigrationQueue";
import { QuantumSimulator } from "@/components/Dashboard/QuantumSimulator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 quantum-glow">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold quantum-text-glow">QUASAR</h1>
                <p className="text-xs text-muted-foreground">
                  Quantum-Augmented Security Architecture & Resilience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Quantum Threat Level"
            value="75%"
            icon={AlertTriangle}
            trend={{ value: 12, isPositive: false }}
            valueClassName="text-destructive"
          />
          <MetricsCard
            title="Total Assets Scanned"
            value="1,247"
            icon={Database}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricsCard
            title="Vulnerable Assets"
            value="184"
            icon={Lock}
            trend={{ value: 15, isPositive: false }}
            valueClassName="text-warning"
          />
          <MetricsCard
            title="Migration Progress"
            value="32%"
            icon={TrendingUp}
            trend={{ value: 23, isPositive: true }}
            valueClassName="text-primary"
          />
        </div>

        {/* Risk Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RiskChart />
          <QuantumSimulator />
        </div>

        {/* Asset Table & Migration Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <AssetTable />
          <MigrationQueue />
        </div>

        {/* Status Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">AI Engine Status</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Neural network trained on 10M+ cryptographic attack patterns
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[89%] bg-primary rounded-full" />
              </div>
              <span className="text-xs font-medium text-primary">89%</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <h3 className="text-sm font-semibold">Post-Quantum Ready</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              NIST-approved algorithms: Kyber, Dilithium, SPHINCS+
            </p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 text-xs rounded bg-success/10 text-success border border-success/20">
                Kyber-768
              </span>
              <span className="px-2 py-1 text-xs rounded bg-success/10 text-success border border-success/20">
                Dilithium-3
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-secondary" />
              <h3 className="text-sm font-semibold">Last Scan</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Full infrastructure scan completed 12 minutes ago
            </p>
            <div className="mt-3">
              <span className="text-xs text-muted-foreground">Next scan in </span>
              <span className="text-xs font-medium text-foreground">48 minutes</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
