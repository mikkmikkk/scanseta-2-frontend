import { CheckCircle2, Scan, Pill, FileText, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { PrescriptionResponse } from "@/lib/prescription-api";

interface ResultsScreenProps {
  onScanAnother: () => void;
  imagePreview: string;
  scanResults: PrescriptionResponse;
}

const ResultsScreen = ({ onScanAnother, imagePreview, scanResults }: ResultsScreenProps) => {
  const [isRawTextOpen, setIsRawTextOpen] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500/10 text-green-700 border-green-500/20";
    if (confidence >= 0.6) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    return "bg-red-500/10 text-red-700 border-red-500/20";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.6) return "Medium";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mb-2">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Prescription Analyzed Successfully
          </h2>
          <p className="text-muted-foreground">
            Here's what we found in your prescription
          </p>
        </div>

        {imagePreview && (
          <Card className="p-4 shadow-[var(--card-shadow)]">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Original Image</span>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <img 
                src={imagePreview} 
                alt="Original prescription" 
                className="w-full h-64 object-cover"
              />
            </div>
          </Card>
        )}

        <Card className="p-4 shadow-[var(--card-shadow)]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Processing time: {scanResults.processing_time.toFixed(2)}s
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Detected Medications</h3>
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {scanResults.medications.length} {scanResults.medications.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>

          {scanResults.medications.length === 0 ? (
            <Card className="p-8 shadow-[var(--card-shadow)] text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No medications detected in the prescription.</p>
            </Card>
          ) : (
            scanResults.medications.map((med, index) => (
              <Card key={index} className="p-6 shadow-[var(--card-shadow)] hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-foreground mb-2">{med.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {med.dosage && (
                          <Badge variant="secondary" className="text-sm">
                            Dosage: {med.dosage}
                          </Badge>
                        )}
                        {med.frequency && (
                          <Badge variant="secondary" className="text-sm">
                            Frequency: {med.frequency}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge className={`text-sm border ${getConfidenceColor(med.confidence)}`}>
                      {getConfidenceLabel(med.confidence)} ({(med.confidence * 100).toFixed(0)}%)
                    </Badge>
                  </div>

                  {med.confidence < 0.8 && (
                    <div className="flex gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-700 mb-1">Low Confidence Warning</p>
                        <p className="text-sm text-yellow-700/90">
                          This medication was detected with lower confidence. Please verify with the original prescription.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {scanResults.raw_text && (
          <Card className="p-4 shadow-[var(--card-shadow)]">
            <Collapsible open={isRawTextOpen} onOpenChange={setIsRawTextOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Raw Extracted Text</span>
                </div>
                <Button variant="ghost" size="sm">
                  {isRawTextOpen ? "Hide" : "Show"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {scanResults.raw_text}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            size="lg"
            onClick={onScanAnother}
            className="flex-1 h-14 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all shadow-lg"
          >
            <Scan className="mr-2 h-5 w-5" />
            Scan Another Prescription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
