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
  migration_priority?: string;
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
}

export const parseCSV = (): Asset[] => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const asset: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (header === 'key_length') {
        asset[header] = parseInt(value);
      } else if (header === 'quantum_risk_score') {
        asset[header] = parseFloat(value);
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
  
  return {
    totalAssets: assets.length,
    vulnerableAssets,
    postQuantumAssets,
    averageRiskScore: Math.round(averageRiskScore * 100),
    criticalAssets,
    highRiskAssets,
    mediumRiskAssets,
    lowRiskAssets,
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
