import { CheckCircle2, Scan, Pill, FileText, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsScreenProps {
  onScanAnother: () => void;
  imagePreview: string;
}

const ResultsScreen = ({ onScanAnother, imagePreview }: ResultsScreenProps) => {
  const medications = [
    {
      name: "Amoxicillin",
      drugClass: "Penicillin Antibiotic",
      usage: "Treats bacterial infections including respiratory tract infections, urinary tract infections, and skin infections",
      commonSideEffects: "Nausea, diarrhea, rash",
      warnings: "Inform your doctor if you have penicillin allergies",
    },
    {
      name: "Ibuprofen",
      drugClass: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
      usage: "Reduces pain, fever, and inflammation. Used for headaches, muscle pain, arthritis, and menstrual cramps",
      commonSideEffects: "Stomach upset, heartburn, dizziness",
      warnings: "Take with food to reduce stomach irritation",
    },
  ];

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


        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Detected Medications</h3>
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {medications.length} items
            </Badge>
          </div>

          {medications.map((med, index) => (
            <Card key={index} className="p-6 shadow-[var(--card-shadow)] hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">{med.name}</h4>
                  <Badge variant="secondary" className="text-sm">
                    {med.drugClass}
                  </Badge>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Usage</p>
                      <p className="text-sm text-muted-foreground">{med.usage}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Common Side Effects</p>
                      <p className="text-sm text-muted-foreground">{med.commonSideEffects}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-accent/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-accent mb-1">Important</p>
                      <p className="text-sm text-accent/90">{med.warnings}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
