import { CheckCircle2, Scan, Calendar, Pill, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsScreenProps {
  onScanAnother: () => void;
  imagePreview: string;
}

const ResultsScreen = ({ onScanAnother, imagePreview }: ResultsScreenProps) => {
  const mockPrescription = {
    patientName: "John Smith",
    prescriptionDate: "March 15, 2024",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
        instructions: "Take with food",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        duration: "14 days",
        instructions: "For pain relief",
      },
    ],
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

        <Card className="p-6 shadow-[var(--card-shadow)]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-semibold text-foreground">{mockPrescription.patientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Prescription Date</p>
                <p className="font-semibold text-foreground">{mockPrescription.prescriptionDate}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Medications</h3>
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {mockPrescription.medications.length} items
            </Badge>
          </div>

          {mockPrescription.medications.map((med, index) => (
            <Card key={index} className="p-6 shadow-[var(--card-shadow)] hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">{med.name}</h4>
                    <p className="text-lg text-primary font-semibold">{med.dosage}</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {med.duration}
                  </Badge>
                </div>

                <div className="grid gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Frequency:</span>
                    <span className="text-sm text-foreground">{med.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Instructions:</span>
                    <span className="text-sm text-foreground">{med.instructions}</span>
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
