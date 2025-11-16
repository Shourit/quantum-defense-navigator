import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, ListChecks, Download } from "lucide-react";
import { toast } from "sonner";

interface UserInteractionProps {
  onSubmit: (query: string, verbosity: string, tone: string) => void;
  isLoading?: boolean;
}

const EXAMPLE_QUERIES = [
  "What are the top quantum risks in my infrastructure?",
  "Which assets need urgent migration to post-quantum cryptography?",
  "Show me performance impact of PQC migration",
  "What is my current compliance score?",
  "List expired certificates that need renewal",
  "Recommend migration priorities for RSA-2048 assets"
];

export const UserInteraction = ({ onSubmit, isLoading }: UserInteractionProps) => {
  const [query, setQuery] = useState("");
  const [verbosity, setVerbosity] = useState("medium");
  const [tone, setTone] = useState("technical");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }
    
    let enhancedQuery = query;
    
    // Add verbosity instruction
    if (verbosity === "short") {
      enhancedQuery += " Answer in 1–2 short sentences.";
    } else if (verbosity === "medium") {
      enhancedQuery += " Answer in 4–6 sentences.";
    } else {
      enhancedQuery += " Answer in 8–12 sentences.";
    }
    
    // Add tone instruction
    if (tone === "technical") {
      enhancedQuery += " Use a technical tone.";
    } else {
      enhancedQuery += " Use a management-friendly non-technical tone.";
    }
    
    onSubmit(enhancedQuery, verbosity, tone);
    // Mock response for demo
    setResponse("This is a mock AI response. Connect to Lovable AI to get real responses based on your QUASAR data.");
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const handleQuickAction = (action: string) => {
    if (!response) {
      toast.error("No response to process");
      return;
    }

    let actionQuery = "";
    if (action === "summarize") {
      actionQuery = "Summarize the previous response in bullet points.";
    } else if (action === "extract") {
      actionQuery = "Extract actionable items from the previous response.";
    } else if (action === "export") {
      // Export as JSON
      const jsonData = {
        query,
        response,
        verbosity,
        tone,
        timestamp: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quasar-response-${Date.now()}.json`;
      a.click();
      toast.success("Response exported as JSON");
      return;
    }

    onSubmit(actionQuery, "short", tone);
  };

  return (
    <Card className="quantum-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Query Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Example Queries */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((example, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleExampleClick(example)}
              >
                {example.length > 50 ? example.substring(0, 50) + "..." : example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="space-y-2">
          <Input
            placeholder="Ask about quantum risks, migration priorities, or compliance..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Verbosity</label>
            <Select value={verbosity} onValueChange={setVerbosity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="non-technical">Non-Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !query.trim()}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Submit Query"}
        </Button>

        {/* Response Area */}
        {response && (
          <div className="space-y-3 pt-4 border-t">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">{response}</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("summarize")}
                className="flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                Summarize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("extract")}
                className="flex items-center gap-1"
              >
                <ListChecks className="h-3 w-3" />
                Extract Actions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("export")}
                className="flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                Export JSON
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
