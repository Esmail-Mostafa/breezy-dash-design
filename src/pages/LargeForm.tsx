import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Upload, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function LargeForm() {
  const [date, setDate] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(33);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar name="Large Form" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Large Form Demo
              </h1>
              <p className="text-lg text-muted-foreground">
                A comprehensive form showcasing all available input types
              </p>
            </div>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Complete Form</CardTitle>
                <CardDescription>
                  Fill out this form with various input types for demonstration purposes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">1. First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">2. Email Address</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">3. Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter password" 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Number Input */}
                <div className="space-y-2">
                  <Label htmlFor="age">4. Age</Label>
                  <Input id="age" type="number" placeholder="25" min="0" max="120" />
                </div>

                {/* Tel Input */}
                <div className="space-y-2">
                  <Label htmlFor="phone">5. Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="website">6. Website</Label>
                  <Input id="website" type="url" placeholder="https://example.com" />
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                  <Label htmlFor="birthdate">7. Date of Birth</Label>
                  <Input id="birthdate" type="date" />
                </div>

                {/* Time Input */}
                <div className="space-y-2">
                  <Label htmlFor="time">8. Preferred Time</Label>
                  <Input id="time" type="time" />
                </div>

                {/* Color Input */}
                <div className="space-y-2">
                  <Label htmlFor="color">9. Favorite Color</Label>
                  <Input id="color" type="color" className="h-12 w-20" />
                </div>

                {/* Range Input */}
                <div className="space-y-2">
                  <Label>10. Experience Level: {sliderValue[0]}%</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* File Input */}
                <div className="space-y-2">
                  <Label htmlFor="file">11. Upload Resume</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="file" type="file" accept=".pdf,.doc,.docx" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="bio">12. Biography</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..." 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Select Dropdown */}
                <div className="space-y-2">
                  <Label>13. Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Radio Group */}
                <div className="space-y-3">
                  <Label>14. Gender</Label>
                  <RadioGroup defaultValue="prefer-not-to-say">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <Label>15. Interests (Multiple Selection)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tech" />
                      <Label htmlFor="tech">Technology</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sports" />
                      <Label htmlFor="sports">Sports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="music" />
                      <Label htmlFor="music">Music</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="travel" />
                      <Label htmlFor="travel">Travel</Label>
                    </div>
                  </div>
                </div>

                {/* Switch */}
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">16. Enable Email Notifications</Label>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>17. Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Label>18. Profile Completion: {progressValue}%</Label>
                  <Progress value={progressValue} className="w-full" />
                </div>

                {/* Avatar/Image Upload */}
                <div className="space-y-2">
                  <Label>19. Profile Picture</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </div>
                </div>

                {/* Tags/Badges */}
                <div className="space-y-2">
                  <Label>20. Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="outline">+ Add Skill</Badge>
                  </div>
                </div>

                {/* Dynamic Array - Work Experience */}
                <div className="space-y-4">
                  <Label>21. Work Experience</Label>
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Company name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" placeholder="Job title" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your role..." />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">+ Add Work Experience</Button>
                </div>

                {/* Dynamic Array - Education */}
                <div className="space-y-4">
                  <Label>22. Education</Label>
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">School/University</Label>
                        <Input id="school" placeholder="Institution name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input id="degree" placeholder="Degree type" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input id="fieldOfStudy" placeholder="Major/Subject" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input id="graduationYear" type="number" placeholder="2023" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">+ Add Education</Button>
                </div>

                {/* Dynamic Array - Languages */}
                <div className="space-y-4">
                  <Label>23. Languages</Label>
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" placeholder="Language name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Proficiency Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="native">Native</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">+ Add Language</Button>
                </div>

                {/* Dynamic Array - Certifications */}
                <div className="space-y-4">
                  <Label>24. Certifications</Label>
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="certName">Certification Name</Label>
                        <Input id="certName" placeholder="Certification title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="issuer">Issuing Organization</Label>
                        <Input id="issuer" placeholder="Organization name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="issueDate">Issue Date</Label>
                        <Input id="issueDate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="credentialId">Credential ID</Label>
                      <Input id="credentialId" placeholder="Certificate ID" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">+ Add Certification</Button>
                </div>

                {/* Dynamic Array - Projects */}
                <div className="space-y-4">
                  <Label>25. Projects</Label>
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input id="projectName" placeholder="Project title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Description</Label>
                      <Textarea id="projectDescription" placeholder="Describe the project..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectUrl">Project URL</Label>
                        <Input id="projectUrl" type="url" placeholder="https://project.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectRepo">Repository URL</Label>
                        <Input id="projectRepo" type="url" placeholder="https://github.com/user/repo" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies Used</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="outline">+ Add Tech</Badge>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">+ Add Project</Button>
                </div>

                <Separator className="my-6" />

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="gradient">Save Form</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}