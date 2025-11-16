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
    
    // TODO: Replace with actual edge function call to submitQueryAdapter
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
    <Card className="quantum-glow w-full max-w-[380px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Example Queries - Compact */}
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Examples:</p>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_QUERIES.slice(0, 4).map((example, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors text-xs max-w-[180px] truncate"
                onClick={() => handleExampleClick(example)}
              >
                {example.length > 35 ? example.substring(0, 35) + "..." : example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Query Input - Compact */}
        <Input
          placeholder="Ask about risks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="text-sm h-9"
        />

        {/* Controls - Side by Side */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={verbosity} onValueChange={setVerbosity}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="non-technical">Non-Tech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button - Compact */}
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !query.trim()}
          className="w-full h-8 text-xs"
          size="sm"
        >
          {isLoading ? "Processing..." : "Submit"}
        </Button>

        {/* Response Area - Compact */}
        {response ? (
          <div className="space-y-2 pt-2 border-t">
            <div className="p-2 bg-muted rounded-md max-h-32 overflow-y-auto">
              <p className="text-xs">{response}</p>
            </div>
            
            {/* Quick Actions - Compact */}
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("summarize")}
                className="flex items-center gap-1 h-7 text-xs flex-1"
              >
                <FileText className="h-3 w-3" />
                Sum
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("extract")}
                className="flex items-center gap-1 h-7 text-xs flex-1"
              >
                <ListChecks className="h-3 w-3" />
                Act
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("export")}
                className="flex items-center gap-1 h-7 text-xs flex-1"
              >
                <Download className="h-3 w-3" />
                JSON
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-2">AI response will appear here.</p>
        )}
      </CardContent>
    </Card>
  );
};
