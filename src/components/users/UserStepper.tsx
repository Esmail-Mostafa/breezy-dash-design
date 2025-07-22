import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, ChevronLeft, User, Shield, Settings, FileText } from "lucide-react";

interface UserFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Step 2: Account Settings  
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
  
  // Step 3: Permissions & Access
  permissions: string[];
  accessLevel: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  // Step 4: Additional Information
  bio: string;
  location: string;
  timezone: string;
  profilePicture: string;
}

const initialFormData: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
  department: "",
  permissions: [],
  accessLevel: "",
  notifications: {
    email: false,
    sms: false,
    push: false,
  },
  bio: "",
  location: "",
  timezone: "",
  profilePicture: "",
};

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

const roles = ["Admin", "Manager", "Employee", "Contractor", "Intern"];
const departments = ["IT", "HR", "Finance", "Marketing", "Sales", "Operations"];
const permissionsList = [
  "View Users", "Create Users", "Edit Users", "Delete Users",
  "View Reports", "Create Reports", "View Analytics", "Manage Settings"
];
const accessLevels = ["Basic", "Standard", "Premium", "Full Access"];
const timezones = ["UTC-8", "UTC-5", "UTC+0", "UTC+1", "UTC+5:30", "UTC+8"];

export const UserStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const updateFormData = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const updateNotification = (type: keyof UserFormData['notifications'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UserFormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        break;
      case 2:
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.role) newErrors.role = "Role is required";
        break;
      case 3:
        if (!formData.accessLevel) newErrors.accessLevel = "Access level is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("User data submitted:", formData);
      alert("User created successfully!");
      // Reset form
      setFormData(initialFormData);
      setCurrentStep(1);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData('username', e.target.value)}
                className={errors.username ? "border-destructive" : ""}
              />
              {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select value={formData.role} onValueChange={(value) => updateFormData('role', value)}>
                  <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={formData.department} onValueChange={(value) => updateFormData('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Access Level *</Label>
              <Select value={formData.accessLevel} onValueChange={(value) => updateFormData('accessLevel', value)}>
                <SelectTrigger className={errors.accessLevel ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.accessLevel && <p className="text-sm text-destructive">{errors.accessLevel}</p>}
            </div>

            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {permissionsList.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={() => togglePermission(permission)}
                    />
                    <Label htmlFor={permission} className="text-sm">{permission}</Label>
                  </div>
                ))}
              </div>
              {formData.permissions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary">{permission}</Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-notifications"
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => updateNotification('email', checked as boolean)}
                  />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms-notifications"
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => updateNotification('sms', checked as boolean)}
                  />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push-notifications"
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => updateNotification('push', checked as boolean)}
                  />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Description</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Tell us about this user..."
                className="h-24"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                value={formData.profilePicture}
                onChange={(e) => updateFormData('profilePicture', e.target.value)}
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            <Separator />
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Review User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Username:</strong> {formData.username}</p>
                  <p><strong>Role:</strong> {formData.role}</p>
                </div>
                <div>
                  <p><strong>Department:</strong> {formData.department}</p>
                  <p><strong>Access Level:</strong> {formData.accessLevel}</p>
                  <p><strong>Permissions:</strong> {formData.permissions.length} selected</p>
                  <p><strong>Location:</strong> {formData.location || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        );

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
        <p className="text-muted-foreground">Follow the steps below to create a new user account</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep} of {steps.length}</span>
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
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${isCompleted 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : isCurrent 
                    ? 'border-primary text-primary bg-background'
                    : 'border-muted-foreground text-muted-foreground bg-background'
                }
              `}>
                {isCompleted ? <Check className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
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
            {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getStepContent()}
        </CardContent>
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