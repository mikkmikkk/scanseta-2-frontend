import { useState } from "react";
import { Camera, Upload, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultsScreen from "@/components/ResultsScreen";

type AppState = "upload" | "processing" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("upload");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAppState("processing");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanAnother = () => {
    setAppState("upload");
    setImagePreview("");
  };

  if (appState === "processing") {
    return <ProcessingScreen onComplete={() => setAppState("results")} imagePreview={imagePreview} />;
  }

  if (appState === "results") {
    return <ResultsScreen onScanAnother={handleScanAnother} imagePreview={imagePreview} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-[var(--card-shadow)]">
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
            <Scan className="w-12 h-12 text-primary" />
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Prescription Scanner
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload or capture your medical prescription to extract medication information instantly
            </p>
          </div>

          <div className="grid gap-4 pt-8">
            <label htmlFor="file-upload" className="cursor-pointer">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                size="lg" 
                className="w-full h-14 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all shadow-lg"
                asChild
              >
                <span>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Prescription Image
                </span>
              </Button>
            </label>

            <label htmlFor="camera-capture" className="cursor-pointer">
              <input
                id="camera-capture"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-14 text-base transition-all"
                asChild
              >
                <span>
                  <Camera className="mr-2 h-5 w-5" />
                  Capture with Camera
                </span>
              </Button>
            </label>
          </div>

          <div className="pt-6 border-t border-border mt-8">
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG, HEIC • Maximum file size: 10MB
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
