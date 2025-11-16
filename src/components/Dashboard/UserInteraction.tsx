import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, ListChecks, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { streamDemoResponse } from "@/lib/demoClient";

interface UserInteractionProps {
  onSubmit: (query: string, verbosity: string, tone: string) => void;
  isLoading?: boolean;
}

// Updated concise examples (3-7 words each)
const EXAMPLE_QUERIES = [
  "Top quantum risks?",
  "Which assets need migration?",
  "Show PQC performance impact",
  "Current compliance score?",
  "List critical vulnerabilities",
  "Recommend migration priorities"
];

export const UserInteraction = ({ onSubmit, isLoading }: UserInteractionProps) => {
  const [query, setQuery] = useState("");
  const [verbosity, setVerbosity] = useState<"short" | "medium" | "long">("medium");
  const [tone, setTone] = useState<"technical" | "non-technical">("technical");
  const [response, setResponse] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);

  // DEMO MODE - Stream simulated responses
  const handleSubmit = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }
    
    setIsStreaming(true);
    setResponse(""); // Clear previous response
    
    try {
      // DEMO MODE - Use simulated streaming
      await streamDemoResponse({
        question: query,
        verbosity,
        tone,
        onChunk: (chunk, done) => {
          if (!done) {
            setResponse(prev => prev + chunk);
          } else {
            setIsStreaming(false);
          }
        }
      });
      
      // Call the original onSubmit for compatibility
      onSubmit(query, verbosity, tone);
    } catch (error) {
      console.error("Demo stream error:", error);
      toast.error("Failed to get response");
      setIsStreaming(false);
    }
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
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Assistant
          </CardTitle>
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-muted/50">
            demo mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {/* Example Queries - Improved wrapping, no truncation */}
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Examples:</p>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_QUERIES.map((example, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors text-xs whitespace-normal break-words px-2 py-1"
                onClick={() => handleExampleClick(example)}
              >
                {example}
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
          <Select value={verbosity} onValueChange={(v) => setVerbosity(v as "short" | "medium" | "long")}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tone} onValueChange={(t) => setTone(t as "technical" | "non-technical")}>
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
          disabled={isStreaming || !query.trim()}
          className="w-full h-8 text-xs"
          size="sm"
        >
          {isStreaming ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Streaming...
            </>
          ) : "Submit"}
        </Button>

        {/* Response Area - Compact */}
        {response || isStreaming ? (
          <div className="space-y-2 pt-2 border-t">
            <div className="p-2 bg-muted rounded-md max-h-32 overflow-y-auto">
              <p className="text-xs leading-relaxed">
                {response}
                {isStreaming && <span className="inline-block w-1 h-3 bg-primary animate-pulse ml-0.5" />}
              </p>
            </div>
            
            {/* Quick Actions - Show only after streaming completes */}
            {!isStreaming && response && (
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
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-2">AI response will appear here.</p>
        )}
      </CardContent>
    </Card>
  );
};
