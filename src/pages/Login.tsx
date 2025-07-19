import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
   const loginMutation = useLogin()

   const handleLogin = (values: { username: string; password: string }) => {
    loginMutation.mutate(values)
   }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl shadow-primary/20 backdrop-blur-sm bg-card/95 animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 animate-scale-in">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Sign in to continue to your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
             handleLogin(values)
            }}
          >
            <Form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                    <Field
                      name="username"
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      className="pl-10 pr-12 w-full rounded-lg h-12 border-2 focus:border-primary/50 transition-all duration-200 hover:border-primary/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                    <Field
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 w-full rounded-lg h-12 border-2 focus:border-primary/50 transition-all duration-200 hover:border-primary/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <Button className="w-full h-12 mt-6 bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] font-medium">
            Sign In
          </Button>

                </Form>
          </Formik>
          {/*           
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-2 border-primary/30" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div> */}

        
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Create one now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
