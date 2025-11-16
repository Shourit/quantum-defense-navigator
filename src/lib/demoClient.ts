// DEMO MODE - NO EXTERNAL CALLS
// This provides simulated streaming responses for demonstration purposes

interface StreamOptions {
  question: string;
  verbosity: "short" | "medium" | "long";
  tone: "technical" | "non-technical";
  onChunk: (chunk: string, done: boolean) => void;
}

const DEMO_RESPONSES = {
  short: {
    technical: "Your infrastructure shows 67% quantum vulnerability across RSA-2048 assets. Immediate PQC migration recommended for critical systems.",
    "non-technical": "Your systems have significant exposure to future quantum threats. We recommend upgrading security protocols soon."
  },
  medium: {
    technical: "Analysis reveals 67% of assets use quantum-vulnerable algorithms (RSA-2048, ECC). Current quantum threat level is at 73%. Post-quantum cryptography migration should prioritize TLS certificates and API endpoints. Estimated timeline: 6-8 months for full deployment.",
    "non-technical": "Our security systems are at risk from emerging quantum computing technology. About two-thirds of our digital assets need security upgrades. This is a significant but manageable project that will take 6-8 months to complete properly."
  },
  long: {
    technical: "Comprehensive quantum risk assessment indicates 73% threat level with 67% asset vulnerability. Your infrastructure relies heavily on RSA-2048 (342 assets) and ECDSA-P256 (89 assets), both quantum-vulnerable. Shor's algorithm simulations show these can be broken within 24 hours by a sufficiently powerful quantum computer. Recommended migration path: 1) Prioritize internet-facing TLS certificates and authentication endpoints, 2) Deploy CRYSTALS-Kyber for key exchange, 3) Implement ML-DSA for digital signatures. Estimated performance impact: 15-20% latency increase, 30% higher CPU utilization during initial rollout. Full migration timeline: 8-12 months with phased deployment.",
    "non-technical": "Your organization faces growing security risks from quantum computing advances. Currently, about 70% of your digital security systems use older encryption methods that quantum computers could break. This affects everything from customer data to internal communications. The good news: proven quantum-safe solutions exist and can be deployed over the next year. The transition will require careful planning to avoid disrupting business operations. We'll prioritize customer-facing systems first, then internal infrastructure. Expect minor performance impacts during rollout, but long-term security benefits far outweigh short-term costs. Executive approval and budget allocation needed for Q1 next year."
  }
};

const CONTEXTUAL_KEYWORDS = {
  "risk": "Based on QUASAR data, your top risks include: RSA-2048 certificates (342 assets), vulnerable APIs, and legacy authentication systems.",
  "migration": "Migration priority: 89 assets flagged critical. Recommend starting with internet-facing TLS endpoints and customer authentication layers.",
  "compliance": "Current compliance score: 67%. NIST PQC standards require migration by 2025. You're on track but need acceleration.",
  "certificate": "Certificate analysis: 127 expired or expiring within 90 days. 89 use quantum-vulnerable algorithms. Renewal + PQC upgrade recommended.",
  "performance": "PQC performance impact: +15-20% latency, +30% CPU. ML-DSA signatures 2x slower than ECDSA but quantum-safe."
};

export async function streamDemoResponse({ question, verbosity, tone, onChunk }: StreamOptions) {
  // DEMO MODE - Simulated streaming with deterministic responses
  
  await new Promise(resolve => setTimeout(resolve, 200)); // Initial delay
  
  // Build response based on inputs
  let response = DEMO_RESPONSES[verbosity][tone];
  
  // Check for contextual keywords and enhance response
  const lowerQuestion = question.toLowerCase();
  for (const [keyword, context] of Object.entries(CONTEXTUAL_KEYWORDS)) {
    if (lowerQuestion.includes(keyword)) {
      response = context + " " + response;
      break;
    }
  }
  
  // Stream the response in chunks
  const words = response.split(" ");
  const chunkSize = verbosity === "short" ? 3 : verbosity === "medium" ? 4 : 5;
  
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(" ") + " ";
    onChunk(chunk, false);
    await new Promise(resolve => setTimeout(resolve, 180 + Math.random() * 120)); // 180-300ms delay
  }
  
  onChunk("", true); // Signal completion
}

export function generateDemoSimulationData() {
  // DEMO MODE - Generate deterministic 7-day simulation data
  const algorithms = ["RSA-2048", "RSA-4096", "ECDSA-P256", "ML-DSA", "CRYSTALS-Kyber"];
  const baseVulnerability = [85, 60, 78, 12, 8];
  
  return algorithms.map((algo, idx) => ({
    algorithm: algo,
    breakTime: baseVulnerability[idx] + Math.floor(Math.random() * 10),
    confidence: 85 + Math.random() * 12
  }));
}

export function simulateMigrationStart(assetId: string) {
  // DEMO MODE - Client-side only migration simulation
  return {
    assetId,
    status: "MIGRATING",
    eta: "10 hours",
    progress: 0
  };
}
