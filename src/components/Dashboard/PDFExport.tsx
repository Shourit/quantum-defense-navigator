import { useState, lazy, Suspense } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PDFExportProps {
  targetId: string;
  disabled?: boolean;
}

const PDFExport = ({ targetId, disabled = false }: PDFExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      toast.error("Unable to find content to export");
      return;
    }

    setIsExporting(true);
    toast.info("Generating PDF report...");

    try {
      // Dynamically import to avoid stack overflow
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);
      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#0f172a",
        logging: false,
        windowHeight: element.scrollHeight,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageHeight = 210; // A4 landscape height in mm
      let heightLeft = imgHeight;
      let position = 0;
      let page = 0;

      // Add pages for full content
      while (heightLeft > 0) {
        if (page > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        page++;
      }

      pdf.save(`QUASAR_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF report exported successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
      className="gap-2"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileDown className="h-4 w-4" />
      )}
      Export PDF
    </Button>
  );
};

export { PDFExport };
