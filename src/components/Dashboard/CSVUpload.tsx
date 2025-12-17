import { useState, useRef } from "react";
import { Upload, FileText, X, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CSVUploadProps {
  onDataChange: (data: any[] | null, mode: "combined" | "uploadOnly") => void;
}

const REQUIRED_COLUMNS = [
  "asset_id",
  "type",
  "encryption_algorithm",
  "key_length",
  "current_status",
  "quantum_vulnerability_score",
  "migration_priority",
  "predicted_migration_risk",
];

const SAMPLE_CSV = `asset_id,type,encryption_algorithm,key_length,last_rotation_date,usage_frequency,quantum_risk_score,criticality,current_status,migration_priority,quantum_vulnerability_score,estimated_time_to_qsafe,migration_time,automation_status,latency_before,latency_after,cpu_usage_before,cpu_usage_after,memory_usage_before,memory_usage_after,throughput_before,throughput_after,compliance_score,cert_valid,encryption_strength_index,predicted_migration_risk,predicted_latency,predicted_cpu,predicted_memory
ASSET-001,database,RSA-2048,2048,2024-01-15,high,0.85,high,legacy,P1,0.82,30,24,success,45,52,30,35,512,580,1000,950,85,valid,65,0.75,55,38,620
ASSET-002,api,ECDSA-256,256,2024-02-20,medium,0.45,medium,post-quantum,P2,0.35,0,12,success,22,24,25,27,256,270,2000,1980,92,valid,82,0.25,25,28,280
ASSET-003,storage,AES-256,256,2023-11-10,low,0.65,high,legacy,P1,0.58,45,36,manual,35,42,40,48,1024,1150,800,750,78,expired,58,0.55,45,52,1200`;

const CSVUpload = ({ onDataChange }: CSVUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [dataMode, setDataMode] = useState<"combined" | "uploadOnly">("combined");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSVContent = (content: string): any[] => {
    const lines = content.trim().split("\n");
    if (lines.length < 2) throw new Error("CSV must have headers and at least one data row");

    const headers = lines[0].split(",").map(h => h.trim());
    
    // Validate required columns
    const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);
    }

    return lines.slice(1).map(line => {
      const values = line.split(",");
      const row: any = {};
      headers.forEach((header, i) => {
        const value = values[i]?.trim() || "";
        // Parse numeric fields
        if (["key_length", "quantum_vulnerability_score", "estimated_time_to_qsafe", "migration_time",
             "latency_before", "latency_after", "cpu_usage_before", "cpu_usage_after",
             "memory_usage_before", "memory_usage_after", "throughput_before", "throughput_after",
             "compliance_score", "encryption_strength_index", "predicted_latency", "predicted_cpu", "predicted_memory"].includes(header)) {
          row[header] = parseInt(value) || 0;
        } else if (["quantum_risk_score", "predicted_migration_risk"].includes(header)) {
          row[header] = parseFloat(value) || 0;
        } else {
          row[header] = value;
        }
      });
      return row;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      const content = await file.text();
      const data = parseCSVContent(content);
      setUploadedFile(file);
      setUploadedData(data);
      onDataChange(data, dataMode);
      toast.success(`Uploaded ${data.length} assets from ${file.name}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to parse CSV");
      setUploadedFile(null);
      setUploadedData(null);
    }
  };

  const handleModeChange = (mode: "combined" | "uploadOnly") => {
    setDataMode(mode);
    if (uploadedData) {
      onDataChange(uploadedData, mode);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setUploadedData(null);
    onDataChange(null, "combined");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Uploaded data cleared. Using default dataset.");
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quasar_sample_template.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sample template downloaded");
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Upload Section */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadTemplate}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Sample Template
            </Button>
          </div>

          {/* File Status */}
          {uploadedFile && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">{uploadedFile.name}</span>
              <span className="text-xs text-muted-foreground">({uploadedData?.length} assets)</span>
              <Button variant="ghost" size="sm" onClick={handleClear} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Data Mode Selection */}
          {uploadedData && (
            <RadioGroup
              value={dataMode}
              onValueChange={(v) => handleModeChange(v as "combined" | "uploadOnly")}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="combined" id="combined" />
                <Label htmlFor="combined" className="text-sm">Existing + Uploaded</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uploadOnly" id="uploadOnly" />
                <Label htmlFor="uploadOnly" className="text-sm">Uploaded Only</Label>
              </div>
            </RadioGroup>
          )}

          {/* Instructions */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Info className="h-3 w-3" />
            <span>Session-only data. Refreshing resets upload.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CSVUpload };
