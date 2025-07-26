import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Shield,
  Settings,
  FileText,
} from "lucide-react";
import { UserPage2 } from "./userPage2";
import { UserPage4 } from "./userPage4";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import React from "react";
import { UserPage3 } from "./userPage3";
import { UserPage1 } from "./userPage1";

const steps = [
  {
    id: 1,
    title: "Personal Info",
    description: "Basic personal information",
    icon: User,
  },
  {
    id: 2,
    title: "Account Setup",
    description: "Username and credentials",
    icon: Settings,
  },
  {
    id: 3,
    title: "Permissions",
    description: "Access and permissions",
    icon: Shield,
  },
  {
    id: 4,
    title: "Final Details",
    description: "Additional information",
    icon: FileText,
  },
];

export const UserStepper = () => {
  const formRef = useRef<FormikProps<any>>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    formRef.current?.submitForm();
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    alert("User created successfully!");
    setCurrentStep(1);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserPage1 ref={formRef} />;

      case 2:
        return <UserPage2 ref={formRef} />;

      case 3:
        return <UserPage3 ref={formRef} />;

      case 4:
        return <UserPage4 ref={formRef} />;

      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Add New User</h2>
        <p className="text-muted-foreground">
          Follow the steps below to create a new user account
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const IconComponent = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary bg-background"
                    : "border-muted-foreground text-muted-foreground bg-background"
                }
              `}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <IconComponent className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-4 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "h-5 w-5",
            })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>{getStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="h-4 w-4 mr-2" />
            Create User
          </Button>
        )}
      </div>
    </div>
  );
};
