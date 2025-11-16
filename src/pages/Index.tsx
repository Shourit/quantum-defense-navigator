import { useState } from "react";
import { Shield, Activity, Database, AlertTriangle, TrendingUp, Lock, Clock, Zap, Gauge, Award, FileCheck, Target } from "lucide-react";
import { MetricsCard } from "@/components/Dashboard/MetricsCard";
import { RiskChart } from "@/components/Dashboard/RiskChart";
import { AssetTable } from "@/components/Dashboard/AssetTable";
import { MigrationQueue } from "@/components/Dashboard/MigrationQueue";
import { QuantumSimulator } from "@/components/Dashboard/QuantumSimulator";
import { AlgorithmDistribution } from "@/components/Dashboard/AlgorithmDistribution";
import { PerformanceComparison } from "@/components/Dashboard/PerformanceComparison";
import { ComplianceTrend } from "@/components/Dashboard/ComplianceTrend";
import { CertificateStatus } from "@/components/Dashboard/CertificateStatus";
import { UserInteraction } from "@/components/Dashboard/UserInteraction";
import { RightSidebarRisks } from "@/components/Dashboard/RightSidebarRisks";
import { parseCSV, calculateMetrics } from "@/utils/dataParser";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const assets = parseCSV();
  const metrics = calculateMetrics(assets);
  const migrationProgress = Math.round((metrics.postQuantumAssets / metrics.totalAssets) * 100);

  const handleAIQuery = (query: string, verbosity: string, tone: string) => {
    setIsLoading(true);
    // TODO: Connect to Lovable AI for real AI responses
    console.log("AI Query:", { query, verbosity, tone });
    setTimeout(() => setIsLoading(false), 1000);
  };
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
      <main className="container mx-auto px-6 py-8">
        {/* AI Query Section */}
        <div className="mb-8">
          <UserInteraction onSubmit={handleAIQuery} isLoading={isLoading} />
        </div>

        {/* Two-Column Layout: Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
        {/* Section: Quantum Risk Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold">Quantum Risk Assessment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Quantum Threat Level"
              value={`${metrics.averageRiskScore}%`}
              icon={AlertTriangle}
              trend={{ value: 12, isPositive: false }}
              valueClassName="text-destructive"
            />
            <MetricsCard
              title="Avg Vulnerability Score"
              value={metrics.avgQuantumVulnerability}
              icon={Shield}
              valueClassName="text-warning"
            />
            <MetricsCard
              title="Vulnerable Assets"
              value={metrics.vulnerableAssets}
              icon={Lock}
              trend={{ value: 15, isPositive: false }}
              valueClassName="text-warning"
            />
            <MetricsCard
              title="Time to Quantum-Safe"
              value={`${metrics.avgTimeToQSafe}d`}
              icon={Clock}
              valueClassName="text-primary"
            />
          </div>
        </div>

        <Separator />

        {/* Section: Migration Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Migration Progress</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Migration Progress"
              value={`${migrationProgress}%`}
              icon={TrendingUp}
              trend={{ value: 23, isPositive: true }}
              valueClassName="text-primary"
            />
            <MetricsCard
              title="Avg Migration Time"
              value={`${metrics.avgMigrationTime}h`}
              icon={Clock}
            />
            <MetricsCard
              title="Automation Success Rate"
              value={`${metrics.automationSuccessRate}%`}
              icon={Zap}
              valueClassName="text-success"
            />
            <MetricsCard
              title="Total Assets"
              value={metrics.totalAssets.toLocaleString()}
              icon={Database}
              trend={{ value: 8, isPositive: true }}
            />
          </div>
        </div>

        <Separator />

        {/* Section: Performance Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Performance Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Latency Impact"
              value={`${metrics.avgLatencyImpact >= 0 ? '+' : ''}${metrics.avgLatencyImpact}%`}
              icon={Activity}
              valueClassName={metrics.avgLatencyImpact > 5 ? "text-warning" : "text-success"}
            />
            <MetricsCard
              title="CPU Overhead"
              value={`${metrics.avgCpuImpact >= 0 ? '+' : ''}${metrics.avgCpuImpact}%`}
              icon={Gauge}
              valueClassName={metrics.avgCpuImpact > 5 ? "text-warning" : "text-success"}
            />
            <MetricsCard
              title="Memory Overhead"
              value={`${metrics.avgMemoryImpact >= 0 ? '+' : ''}${metrics.avgMemoryImpact}%`}
              icon={Database}
              valueClassName={metrics.avgMemoryImpact > 5 ? "text-warning" : "text-success"}
            />
            <MetricsCard
              title="Throughput Change"
              value={`${metrics.avgThroughputImpact >= 0 ? '+' : ''}${metrics.avgThroughputImpact}%`}
              icon={TrendingUp}
              valueClassName={metrics.avgThroughputImpact < -5 ? "text-warning" : "text-success"}
            />
          </div>
        </div>

        <Separator />

        {/* Section: Security Effectiveness */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-success" />
            <h2 className="text-lg font-semibold">Security Effectiveness</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Compliance Score"
              value={`${metrics.avgComplianceScore}%`}
              icon={Award}
              valueClassName="text-success"
            />
            <MetricsCard
              title="Expired Certificates"
              value={metrics.expiredCerts}
              icon={FileCheck}
              valueClassName={metrics.expiredCerts > 0 ? "text-destructive" : "text-success"}
            />
            <MetricsCard
              title="Encryption Strength"
              value={`${metrics.avgEncryptionStrength}/100`}
              icon={Shield}
              valueClassName="text-primary"
            />
            <MetricsCard
              title="Predicted Migration Risk"
              value={`${metrics.avgPredictedMigrationRisk}%`}
              icon={Target}
              valueClassName={metrics.avgPredictedMigrationRisk > 50 ? "text-warning" : "text-success"}
            />
          </div>
        </div>

        <Separator />

        {/* Risk Timeline & Quantum Simulation */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Risk Analysis & Quantum Simulation</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RiskChart />
            <QuantumSimulator />
          </div>
        </div>

        <Separator />

        {/* Visualizations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Security Insights & Analytics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AlgorithmDistribution />
            <PerformanceComparison />
            <ComplianceTrend />
            <CertificateStatus />
          </div>
        </div>

        <Separator />

        {/* Asset Table & Migration Queue */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Asset Inventory & Migration Queue</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <AssetTable />
            <MigrationQueue />
          </div>
        </div>
          </div>

          {/* Right Sidebar: Top 5 High Risks */}
          <div className="lg:block">
            <RightSidebarRisks />
          </div>
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
