import { Check, ChevronRight } from "lucide-react";
import React from "react";

interface ProgressStepProps {
  steps: string[];
  currentStep: number;
}

const ProgressStep = ({ steps, currentStep }: ProgressStepProps) => {
  return (
    <div className="py-8 border-b border-border mb-8">
      <div className="flex items-center justify-center gap-4">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
                  i < currentStep
                    ? "bg-accent text-white"
                    : i === currentStep
                    ? "bg-white text-black"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  i === currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-muted-foreground mx-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStep;
