import { Asset } from './dataParser';

export const getAlgorithmDistribution = (assets: Asset[]) => {
  const distribution: Record<string, number> = {};
  
  assets.forEach(asset => {
    const algo = asset.encryption_algorithm;
    distribution[algo] = (distribution[algo] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getPerformanceComparison = (assets: Asset[]) => {
  const legacyAssets = assets.filter(a => a.current_status === 'legacy');
  const pqAssets = assets.filter(a => a.current_status === 'post-quantum');
  
  const avgMetric = (arr: Asset[], before: keyof Asset, after: keyof Asset) => {
    if (arr.length === 0) return { before: 0, after: 0 };
    const beforeAvg = arr.reduce((sum, a) => sum + (a[before] as number), 0) / arr.length;
    const afterAvg = arr.reduce((sum, a) => sum + (a[after] as number), 0) / arr.length;
    return { before: Math.round(beforeAvg), after: Math.round(afterAvg) };
  };
  
  return {
    latency: avgMetric(pqAssets, 'latency_before', 'latency_after'),
    cpu: avgMetric(pqAssets, 'cpu_usage_before', 'cpu_usage_after'),
    memory: avgMetric(pqAssets, 'memory_usage_before', 'memory_usage_after'),
    throughput: avgMetric(pqAssets, 'throughput_before', 'throughput_after'),
  };
};

export const getComplianceTrend = (assets: Asset[]) => {
  const today = new Date();
  const chartData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const monthDay = `${date.getMonth() + 1}/${date.getDate()}`;
    
    const progressFactor = 1 - (i * 0.08);
    const pqAssets = assets.filter(a => a.current_status === 'post-quantum');
    const avgCompliance = pqAssets.length > 0 
      ? pqAssets.reduce((sum, a) => sum + a.compliance_score, 0) / pqAssets.length 
      : 0;
    
    const compliance = Math.round(avgCompliance * progressFactor);
    const strength = Math.round(assets.reduce((sum, a) => sum + a.encryption_strength_index, 0) / assets.length * progressFactor);
    
    chartData.push({
      date: monthDay,
      compliance,
      strength,
    });
  }
  
  return chartData;
};

export const getCertificateStatus = (assets: Asset[]) => {
  const valid = assets.filter(a => a.cert_valid === 'valid').length;
  const expired = assets.filter(a => a.cert_valid === 'expired').length;
  
  return [
    { name: 'Valid', value: valid, fill: 'hsl(var(--success))' },
    { name: 'Expired', value: expired, fill: 'hsl(var(--destructive))' },
  ];
};
