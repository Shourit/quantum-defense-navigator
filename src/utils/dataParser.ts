import csvData from '@/data/QUASAR_Test_Data.csv?raw';

export interface Asset {
  asset_id: string;
  type: string;
  encryption_algorithm: string;
  key_length: number;
  last_rotation_date: string;
  usage_frequency: 'high' | 'medium' | 'low';
  quantum_risk_score: number;
  criticality: 'high' | 'medium' | 'low';
  current_status: 'legacy' | 'post-quantum' | 'migrating';
  migration_priority: string;
  quantum_vulnerability_score: number;
  estimated_time_to_qsafe: number;
  migration_time: number;
  automation_status: 'success' | 'manual';
  latency_before: number;
  latency_after: number;
  cpu_usage_before: number;
  cpu_usage_after: number;
  memory_usage_before: number;
  memory_usage_after: number;
  throughput_before: number;
  throughput_after: number;
  compliance_score: number;
  cert_valid: 'valid' | 'expired';
  encryption_strength_index: number;
  predicted_migration_risk: number;
  predicted_latency: number;
  predicted_cpu: number;
  predicted_memory: number;
}

export interface DashboardMetrics {
  totalAssets: number;
  vulnerableAssets: number;
  postQuantumAssets: number;
  averageRiskScore: number;
  criticalAssets: number;
  highRiskAssets: number;
  mediumRiskAssets: number;
  lowRiskAssets: number;
  avgQuantumVulnerability: number;
  avgTimeToQSafe: number;
  avgMigrationTime: number;
  automationSuccessRate: number;
  avgLatencyImpact: number;
  avgCpuImpact: number;
  avgMemoryImpact: number;
  avgThroughputImpact: number;
  avgComplianceScore: number;
  expiredCerts: number;
  avgEncryptionStrength: number;
  avgPredictedMigrationRisk: number;
}

export const parseCSV = (): Asset[] => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const asset: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (['key_length', 'quantum_vulnerability_score', 'estimated_time_to_qsafe', 'migration_time', 
           'latency_before', 'latency_after', 'cpu_usage_before', 'cpu_usage_after',
           'memory_usage_before', 'memory_usage_after', 'throughput_before', 'throughput_after',
           'compliance_score', 'encryption_strength_index', 'predicted_latency', 'predicted_cpu', 'predicted_memory'].includes(header)) {
        asset[header] = parseInt(value) || 0;
      } else if (['quantum_risk_score', 'predicted_migration_risk'].includes(header)) {
        asset[header] = parseFloat(value) || 0;
      } else {
        asset[header] = value;
      }
    });
    
    return asset as Asset;
  });
};

export const calculateMetrics = (assets: Asset[]): DashboardMetrics => {
  const vulnerableAssets = assets.filter(a => a.current_status === 'legacy').length;
  const postQuantumAssets = assets.filter(a => a.current_status === 'post-quantum').length;
  const criticalAssets = assets.filter(a => a.criticality === 'high' && a.current_status === 'legacy').length;
  
  const totalRiskScore = assets.reduce((sum, asset) => sum + asset.quantum_risk_score, 0);
  const averageRiskScore = totalRiskScore / assets.length;
  
  const highRiskAssets = assets.filter(a => a.quantum_risk_score >= 0.8).length;
  const mediumRiskAssets = assets.filter(a => a.quantum_risk_score >= 0.6 && a.quantum_risk_score < 0.8).length;
  const lowRiskAssets = assets.filter(a => a.quantum_risk_score < 0.6).length;
  
  const avgQuantumVulnerability = Math.round(assets.reduce((sum, a) => sum + a.quantum_vulnerability_score, 0) / assets.length);
  const avgTimeToQSafe = Math.round(assets.filter(a => a.estimated_time_to_qsafe > 0).reduce((sum, a) => sum + a.estimated_time_to_qsafe, 0) / assets.filter(a => a.estimated_time_to_qsafe > 0).length || 0);
  const avgMigrationTime = Math.round(assets.filter(a => a.migration_time > 0).reduce((sum, a) => sum + a.migration_time, 0) / assets.filter(a => a.migration_time > 0).length || 0);
  const automationSuccessRate = Math.round((assets.filter(a => a.automation_status === 'success').length / assets.length) * 100);
  
  const avgLatencyImpact = Math.round(assets.reduce((sum, a) => sum + ((a.latency_after - a.latency_before) / a.latency_before * 100), 0) / assets.length);
  const avgCpuImpact = Math.round(assets.reduce((sum, a) => sum + ((a.cpu_usage_after - a.cpu_usage_before) / a.cpu_usage_before * 100), 0) / assets.length);
  const avgMemoryImpact = Math.round(assets.reduce((sum, a) => sum + ((a.memory_usage_after - a.memory_usage_before) / a.memory_usage_before * 100), 0) / assets.length);
  const avgThroughputImpact = Math.round(assets.reduce((sum, a) => sum + ((a.throughput_after - a.throughput_before) / a.throughput_before * 100), 0) / assets.length);
  
  const avgComplianceScore = Math.round(assets.reduce((sum, a) => sum + a.compliance_score, 0) / assets.length);
  const expiredCerts = assets.filter(a => a.cert_valid === 'expired').length;
  const avgEncryptionStrength = Math.round(assets.reduce((sum, a) => sum + a.encryption_strength_index, 0) / assets.length);
  const avgPredictedMigrationRisk = Math.round(assets.reduce((sum, a) => sum + a.predicted_migration_risk, 0) / assets.length * 100);
  
  return {
    totalAssets: assets.length,
    vulnerableAssets,
    postQuantumAssets,
    averageRiskScore: Math.round(averageRiskScore * 100),
    criticalAssets,
    highRiskAssets,
    mediumRiskAssets,
    lowRiskAssets,
    avgQuantumVulnerability,
    avgTimeToQSafe,
    avgMigrationTime,
    automationSuccessRate,
    avgLatencyImpact,
    avgCpuImpact,
    avgMemoryImpact,
    avgThroughputImpact,
    avgComplianceScore,
    expiredCerts,
    avgEncryptionStrength,
    avgPredictedMigrationRisk,
  };
};

export const getRiskLevel = (score: number): 'critical' | 'high' | 'medium' | 'low' => {
  if (score >= 0.9) return 'critical';
  if (score >= 0.8) return 'high';
  if (score >= 0.6) return 'medium';
  return 'low';
};

export const getStatusFromLegacy = (current_status: string): 'vulnerable' | 'migrating' | 'secure' => {
  if (current_status === 'legacy') return 'vulnerable';
  if (current_status === 'post-quantum') return 'secure';
  return 'migrating';
};

export const getMigrationTasks = (assets: Asset[]) => {
  return assets
    .filter(a => a.current_status === 'legacy' && a.criticality === 'high')
    .sort((a, b) => b.quantum_risk_score - a.quantum_risk_score)
    .slice(0, 8)
    .map(asset => ({
      id: asset.asset_id,
      name: asset.asset_id,
      type: asset.type,
      currentAlgorithm: asset.encryption_algorithm,
      targetAlgorithm: asset.encryption_algorithm.includes('RSA') || asset.encryption_algorithm.includes('ECC') 
        ? 'Kyber-768' 
        : asset.encryption_algorithm.includes('AES') 
        ? 'AES-256-GCM' 
        : 'CRYSTALS-Dilithium',
      priority: asset.quantum_risk_score >= 0.9 ? 'critical' as const : 'high' as const,
      progress: 0,
      estimatedTime: `${Math.ceil(asset.quantum_risk_score * 10)} hours`,
    }));
};

export const getRiskChartData = (assets: Asset[]) => {
  const today = new Date();
  const chartData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const monthDay = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Simulate trend - decreasing vulnerable assets over time
    const vulnerableFactor = 1 - (6 - i) * 0.05;
    const vulnerable = Math.round(assets.filter(a => a.current_status === 'legacy').length * vulnerableFactor);
    const migrating = Math.min(10 + (6 - i) * 2, 15);
    const secure = assets.length - vulnerable - migrating;
    
    chartData.push({
      date: monthDay,
      vulnerable,
      migrating,
      secure,
    });
  }
  
  return chartData;
};

export const getQuantumSimulationData = (assets: Asset[]) => {
  const algorithms = ['RSA-2048', 'RSA-3072', 'RSA-4096', 'ECDSA-256', 'ECC-384'];
  
  return algorithms.map(algo => {
    const algoAssets = assets.filter(a => a.encryption_algorithm === algo);
    const avgRisk = algoAssets.length > 0
      ? algoAssets.reduce((sum, a) => sum + a.quantum_risk_score, 0) / algoAssets.length
      : 0;
    
    return {
      algorithm: algo,
      breakTime: avgRisk * 100, // Simulated years
      confidence: 85 + Math.random() * 10,
    };
  });
};
