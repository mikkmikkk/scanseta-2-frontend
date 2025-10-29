import { useEffect, useState } from "react";
import { Loader2, FileText, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingScreenProps {
  onComplete: () => void;
  imagePreview: string;
}

const ProcessingScreen = ({ onComplete, imagePreview }: ProcessingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Analyzing image quality", duration: 800 },
    { label: "Detecting text regions", duration: 1000 },
    { label: "Extracting medication names", duration: 1200 },
    { label: "Validating prescription data", duration: 900 },
  ];

  useEffect(() => {
    let currentProgress = 0;
    let stepIndex = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const interval = 50;

    const timer = setInterval(() => {
      currentProgress += (interval / totalDuration) * 100;
      
      if (currentProgress >= 100) {
        setProgress(100);
        setTimeout(onComplete, 500);
        clearInterval(timer);
        return;
      }

      setProgress(currentProgress);

      // Update step based on progress
      const stepThreshold = ((stepIndex + 1) / steps.length) * 100;
      if (currentProgress >= stepThreshold && stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-[var(--card-shadow)]">
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Processing Prescription
            </h2>
            <p className="text-muted-foreground">
              Analyzing your prescription image...
            </p>
          </div>

          {imagePreview && (
            <div className="relative rounded-lg overflow-hidden border-2 border-border">
              <img 
                src={imagePreview} 
                alt="Prescription preview" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          )}

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="text-center">
              <span className="text-2xl font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index < currentStep
                    ? "bg-accent/10 text-accent"
                    : index === currentStep
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : index === currentStep ? (
                  <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProcessingScreen;
