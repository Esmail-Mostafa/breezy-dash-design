import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User, UserPlus, Shield } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl shadow-secondary/20 backdrop-blur-sm bg-card/95 animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/30 animate-scale-in">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Join us and start your journey today
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 h-12 border-2 focus:border-secondary/50 transition-all duration-200 hover:border-secondary/30"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-2 focus:border-secondary/50 transition-all duration-200 hover:border-secondary/30"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-10 pr-12 h-12 border-2 focus:border-secondary/50 transition-all duration-200 hover:border-secondary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-12 h-12 border-2 focus:border-secondary/50 transition-all duration-200 hover:border-secondary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <input type="checkbox" className="rounded border-2 border-secondary/30 mt-1" />
            <span className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link to="/terms" className="text-secondary hover:underline font-medium">
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-secondary hover:underline font-medium">
                Privacy Policy
              </Link>
            </span>
          </div>
          
          <Button className="w-full h-12 bg-gradient-secondary hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] font-medium">
            Create Account
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 hover:bg-muted/50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 hover:bg-muted/50 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary hover:underline font-medium">
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;