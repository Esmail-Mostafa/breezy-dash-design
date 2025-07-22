import { useRef, useState } from "react";
import { Check, User, Package, CreditCard, FileCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import Stepthree from "./stepthree";
import StepFour from "./stepFour";
import { FormikProps } from "formik";
import { useToast } from "@/hooks/use-toast";
const steps = [
  {
    id: 1,
    title: "Customer Info",
    icon: User,
    description: "Basic customer details",
  },
  {
    id: 2,
    title: "Product Details",
    icon: Package,
    description: "Select products and quantities",
  },
  {
    id: 3,
    title: "Payment & Delivery",
    icon: CreditCard,
    description: "Payment and shipping info",
  },
  {
    id: 4,
    title: "Review & Submit",
    icon: FileCheck,
    description: "Review and confirm order",
  },
];

const OrderStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef<FormikProps<any>>(null);
  const { toast } = useToast();

  const nextStep = () => {
    if (currentStep <= 3) {
      formRef.current?.submitForm();
      setCurrentStep(currentStep + 1);
      return;
    }
    if (currentStep === 4) {
      toast({
        title: "Order Submitted!",
        description: "Your order has been submitted successfully.",
        variant: "default",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formRef={formRef} />;
      case 2:
        return <StepTwo formRef={formRef} />;
      case 3:
        return <Stepthree formRef={formRef} />;
      case 4:
        return <StepFour />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "border-primary text-primary bg-primary/10"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-200",
                  currentStep > step.id
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default OrderStepper;
